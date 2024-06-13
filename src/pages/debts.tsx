import Header from '../components/header';
import { MDBBtn, MDBTable, MDBTableHead, MDBTableBody, MDBTooltip } from 'mdb-react-ui-kit';
import axiosInstance from "../utils/axios";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { setDebtData, removeDebt } from '../redux/reducers/debt_list_slice';
import { DebtData } from '../utils/type';

function DebtsPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { debtData } = useSelector((state: RootState) => state.debtList);
  const [error, setError] = useState<string>('');

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get('/finance/debt');
      if (response.data.status === 'success') {
        dispatch(setDebtData(response.data.data));
      } else {
        setError('An error occurred while retrieving data.');
      }
    } catch (error:any) {
      setError(error.response.data.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: string, name: string) => {
    const isConfirmed = window.confirm(`Are you sure you want to delete the debt record named ${name}?`);
    if (isConfirmed) {
      try {
        const response = await axiosInstance.delete(`/finance/debt/${id}`);
        if (response.data.status === 'success') {
          dispatch(removeDebt(id));
        } else {
          setError(response.data.data);
        }
      } catch (error:any) {
        setError(error.response.data.data);
      }
    }
  };

  const handleSeePaymentPlan = (id: string) => {
    navigate(`/payment-plan/${id}`);
  };

  const handleEdit = (id: string) => {
    navigate(`/add-payment-plan/${id}`);
  };

  return (
    <div className="bg-light pages">
      <Header />
      <div className='px-2 py-4 pagesTitle'>Debt List</div>
      <div className='p-3'>
        {error && <div className='error-message'>{error}</div>}
        <MDBTable align='middle' striped responsive>
          <MDBTableHead>
            <tr className='text-nowrap'>
              <th scope='col'>Debt Name</th>
              <th scope='col'>Lender Name</th>
              <th scope='col'>Debt Amount</th>
              <th scope='col'>Interest Rate</th>
              <th scope='col'>Installment</th>
              <th scope='col'>Total Amount</th>
              <th scope='col'>Create Date</th>
              <th scope='col'>Payment Start</th>
              <th scope='col'>Update Date</th>
              <th scope='col'>Description</th>
              <th scope='col'>Actions</th>
              <th></th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {debtData.map((debt) => (
              <tr key={debt.id}>
                <td>{debt.debtName}</td>
                <td>{debt.lenderName}</td>
                <td>{debt.debtAmount}</td>
                <td>%{debt.interestRate}</td>
                <td>{debt.installment}</td>
                <td>{debt.amount}</td>
                <td>{new Date(debt.createdAt).toISOString().split('T')[0]}</td>
                <td>{new Date(debt.paymentStart).toISOString().split('T')[0]}</td>
                <td>{new Date(debt.updatedAt).toISOString().split('T')[0]}</td>
                <td>
                  {debt.description.length > 18 ? (
                    <MDBTooltip tag='span' placement='top' title={debt.description}>
                      <span>{debt.description.substring(0, 18)}...</span>
                    </MDBTooltip>
                  ) : (
                    <span>{debt.description}</span>
                  )}
                </td>
                <td className='d-flex flex-column'>
                  <MDBBtn className='text-nowrap my-1' color='warning' size='sm' onClick={() => handleEdit(debt.id)}>
                    Edit
                  </MDBBtn>
                  <MDBBtn className=' text-nowrap my-1' color='info' size='sm' onClick={() => handleSeePaymentPlan(debt.id)}>
                    See Plan
                  </MDBBtn>
                  <MDBBtn className=' text-nowrap my-1' color='danger' size='sm' onClick={() => handleDelete(debt.id, debt.debtName)}>
                    Delete
                  </MDBBtn>
                </td>
              </tr>
            ))}
          </MDBTableBody>
        </MDBTable>
      </div>
    </div>
  );
}

export default DebtsPage;
