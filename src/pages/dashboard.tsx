import Header from '../components/header';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { DebtData } from '../utils/type';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBBadge, MDBListGroup, MDBListGroupItem } from 'mdb-react-ui-kit';
import dashboard1 from '../images/dashboard1.svg';
import dashboard2 from '../images/dashboard2.svg';
import dashboard3 from '../images/dasboard3.svg';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const navigate = useNavigate();
  const { debtData } = useSelector((state: RootState) => state.debtList);

  const currencyFormatter = new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
  });

  const totalDebtAmount = debtData.reduce((total, debt) => total + debt.debtAmount, 0);
  const averageInstallment = debtData.length > 0 ? debtData.reduce((total, debt) => total + debt.installment, 0) / debtData.length : 0;
  const averageInterestRate = debtData.length > 0 ? debtData.reduce((total, debt) => total + debt.interestRate, 0) / debtData.length : 0;

  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  const upcomingPayments = debtData.filter(debt => {
    const paymentStartDate = new Date(debt.paymentStart);
    return paymentStartDate >= firstDayOfMonth && paymentStartDate <= lastDayOfMonth;
  });

  const calculatePaymentAmount = (debt: DebtData): number => {
    return debt.debtAmount / debt.installment;
  };

  return (
    <div className="bg-light pages">
      <Header />
      <div className='px-2 py-4 pagesTitle'>DashboardPage</div>
      <MDBContainer fluid>
        <MDBRow className='justify-content-center'>
          <MDBCol md='4' className='mb-md-0 my-2'>
            <MDBCard>
              <MDBCardBody>
                <div className='d-flex align-items-center'>
                  <div className='flex-shrink-0'>
                    <div className='p-3 bg-primary rounded-4 shadow-2-strong'>
                      <img src={dashboard1} alt='' />
                    </div>
                  </div>
                  <div className='flex-grow-1 ms-4'>
                    <p className='text-muted mb-1'>Total debt</p>
                    <h2 className='mb-0'>{currencyFormatter.format(totalDebtAmount)}</h2>
                  </div>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>

          <MDBCol md='4' className='mb-md-0 my-2'>
            <MDBCard>
              <MDBCardBody>
                <div className='d-flex align-items-center'>
                  <div className='flex-shrink-0'>
                    <div className='p-3 bg-primary rounded-4 shadow-2-strong'>
                      <img src={dashboard2} alt='' />
                    </div>
                  </div>
                  <div className='flex-grow-1 ms-4'>
                    <p className='text-muted mb-1'>Average Installment</p>
                    <h2 className='mb-0'>{averageInstallment}</h2>
                  </div>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>

          <MDBCol md='4' className='mb-md-0 my-2'>
            <MDBCard>
              <MDBCardBody>
                <div className='d-flex align-items-center'>
                  <div className='flex-shrink-0'>
                    <div className='p-3 bg-primary rounded-4 shadow-2-strong'>
                      <img src={dashboard3} alt='' />
                    </div>
                  </div>
                  <div className='flex-grow-1 ms-4'>
                    <p className='text-muted mb-1'>Average Interest Rate</p>
                    <h2 className='mb-0'>{averageInterestRate.toFixed(2)}%</h2>
                  </div>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>

        <MDBRow className='mt-5'>
          <MDBCol md='6' className='mb-md-0 my-2'>
            <h4>Debts with upcoming payments</h4>
            <MDBListGroup light style={{ minWidth: '22rem' }}>

              {upcomingPayments.map((debt: DebtData) => (
                <MDBListGroupItem key={debt.id} className='d-flex justify-content-between align-items-start p-2' onClick={() => { navigate(`/payment-plan/${debt.id}`) }}>

                  <strong>{debt.debtName}</strong>

                  <MDBBadge pill light>
                    {currencyFormatter.format(calculatePaymentAmount(debt))}
                  </MDBBadge>
                </MDBListGroupItem>
              ))}


            </MDBListGroup>
          </MDBCol>
        </MDBRow>
      </MDBContainer >
    </div>
  );
};

export default DashboardPage;
