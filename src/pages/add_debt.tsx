import { useState, useEffect } from "react";
import axiosInstance from "../utils/axios";
import { useNavigate } from "react-router-dom";
import Header from '../components/header';
import DebtForm from '../components/debt_form';
import { PaymentPlan, FormData } from "../utils/type";
import { useDispatch } from "react-redux";
import { resetFormData } from "../redux/reducers/debt_slice";

function AddDebts() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState<string>('');

  useEffect(() => {
    dispatch(resetFormData());
  }, [dispatch]);

  const handleSubmit = async (formData: FormData) => {
    try {
      const response = await axiosInstance.post('/finance/debt', formData);
      if (response.data.status === 'success') {
        const id = response.data.data.id;
        navigate(`/payment-plan/${id}`);
      } else if (response.data.status === 'error') {
        setError(response.data.data);
      }
    } catch (error:any) {
      setError(error.response.data.data);
    }
  };

  return (
    <div className="bg-light pages">
      <Header />
      <div className='px-2 py-4 pagesTitle'>Create Payment Plan</div>
      <div className="containerForm">
        <DebtForm onSubmit={handleSubmit} error={error} buttonText="Create Payment Plan" />
      </div>
    </div>
  );
}

export default AddDebts;
