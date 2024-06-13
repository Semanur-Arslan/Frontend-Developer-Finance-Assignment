import axiosInstance from "../utils/axios";
import { useEffect, useState } from "react";
import {
  MDBTabsContent,
} from 'mdb-react-ui-kit';
import Header from '../components/header';
import { useParams } from 'react-router-dom';
import DebtForm from "../components/debt_form";
import { useDispatch } from "react-redux";
import { setFormData } from "../redux/reducers/debt_slice";
import PaymentPlanList from "../components/payment_plan_list";
import { updatePaymentPlan } from "../redux/reducers/payment_plan_slice";
import { PaymentPlanData, PaymentPlan, FormData } from "../utils/type";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setPaymentPlans } from "../redux/reducers/payment_plan_slice";


function AddPaymentPlanPage() {

  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const paymentPlans = useSelector((state: RootState) => state.paymentPlans.paymentPlans);
  const [error, setError] = useState<string>('');

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get(`/finance/debt/${id}`);
      if (response.data.status === 'success') {
        dispatch(setFormData(response.data.data));
        dispatch(setPaymentPlans(response.data.data.paymentPlan))
      } else if (response.data.status === 'error') {
        setError(response.data.data);
      }
    } catch (error:any) {
      setError(error.response.data.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (formData: FormData) => {

    try {
      const response = await axiosInstance.put(`/finance/debt/${id}`, formData);
      if (response.data.status === 'success') {
        const id = response.data.data.id
        fetchData()
      } else if (response.data.status === 'error') {
        setError(response.data.data)
      }
    } catch (error:any) {
      setError(error.response.data.data);
    }
  };

  const handleUpdate = async (planId: string, updatedData: Partial<PaymentPlanData>) => {
    try {
      const response = await axiosInstance.put(`/finance/payment-plans/${planId}`, updatedData);
      if (response.data.status === 'success') {
        dispatch(updatePaymentPlan(response.data.data));
        fetchData();
      } else if (response.data.status === 'error') {
        setError(response.data.data)
      }
    } catch (error:any) {
      setError(error.response.data.data);
    }
  };


  return (
    <div className="bg-light pages">
      <Header />
      <div className='px-2 py-4 pagesTitle'>Edit Payment Plan </div>
      {error && <div className='error-message'>{error}</div>}
      <div className="containerForm">
        <DebtForm onSubmit={handleSubmit} error={error} buttonText="Update Payment Plan" />
        <MDBTabsContent>

          <MDBTabsContent className='p-5'>
            {paymentPlans.map((plan, index) => (
              <PaymentPlanList index={index} key={plan.id} plan={plan} onUpdate={(updatedData) => handleUpdate(plan.id, updatedData)} />
            ))}
          </MDBTabsContent>
        </MDBTabsContent>


      </div>
    </div>
  );
}

export default AddPaymentPlanPage;

