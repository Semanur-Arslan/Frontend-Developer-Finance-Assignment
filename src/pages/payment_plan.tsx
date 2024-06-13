import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axiosInstance from "../utils/axios";
import {
    MDBTabsContent,
} from 'mdb-react-ui-kit';
import Header from '../components/header';
import PaymentPlanList from '../components/payment_plan_list';
import { useParams } from 'react-router-dom';
import { setPaymentPlans, updatePaymentPlan } from '../redux/reducers/payment_plan_slice';
import { PaymentPlanData, RootState } from '../utils/type';


function PaymentPlanPage() {
    const dispatch = useDispatch();
    const paymentPlans = useSelector((state: RootState) => state.paymentPlans.paymentPlans);
    const { id } = useParams<{ id: string }>();
    const [error, setError] = useState<string>('');

    const fetchPaymentPlans = async () => {
        try {
            const response = await axiosInstance.get(`/finance/payment-plans/${id}`);
            if (response.data.status === 'success') {
                dispatch(setPaymentPlans(response.data.data));
            } else if (response.data.status === 'error') {
                setError(response.data.data)
            }
        }catch (error:any) {
            setError(error.response.data.data);
          }
    };

    useEffect(() => {
        fetchPaymentPlans();
    }, []);


    const handleUpdate = async (planId: string, updatedData: Partial<PaymentPlanData>) => {
        try {
            const response = await axiosInstance.put(`/finance/payment-plans/${planId}`, updatedData);
            if (response.data.status === 'success') {
                dispatch(updatePaymentPlan(response.data));
                fetchPaymentPlans();
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
            <div className='px-2 py-4 pagesTitle'>Payment Plan</div>
            {error && <div className='error-message'>{error}</div>}
            <MDBTabsContent className='px-5 py-2'>
                {paymentPlans.map((plan, index) => (
                    <PaymentPlanList index={index} key={plan.id} plan={plan} onUpdate={(updatedData) => handleUpdate(plan.id, updatedData)} />
                ))}
            </MDBTabsContent>
        </div>
    );
}

export default PaymentPlanPage;
