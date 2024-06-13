import React from 'react';
import {
    MDBListGroup,
    MDBListGroupItem,
    MDBCheckbox,
    MDBRow,
    MDBCol
} from 'mdb-react-ui-kit';
import { PaymentPlanData } from '../utils/type';

interface PaymentPlanItemProps {
    plan: PaymentPlanData;
    onUpdate: (plan: PaymentPlanData) => void;
    index: number;

}

const PaymentPlanList: React.FC<PaymentPlanItemProps> = ({ plan, onUpdate, index }) => {
    const handleCheckboxChange = () => {
        const updatedPlan = { ...plan, isPaid: !plan.isPaid };
        onUpdate(updatedPlan);
    };

    return (
        <div className='border' key={plan.id}>
            <MDBListGroup style={{ minWidth: '22rem' }} light>
                <MDBListGroupItem tag='label'>
                    <MDBRow>
                        <MDBCol>
                            <p className='text-bg-warning p-1 text-light'>{index + 1}. Installment</p>
                            <p><span className="fw-bold">Payment Amount:</span> {plan.paymentAmount}</p>
                            <p><span className="fw-bold">Payment Date:</span> {new Date(plan.paymentDate).toISOString().split('T')[0]}</p>
                        </MDBCol>
                        <MDBCol className="d-flex justify-content-center align-items-center">
                            <MDBCheckbox label={plan.isPaid ? 'Paid' : 'Not Paid'} checked={plan.isPaid} onClick={handleCheckboxChange} />
                        </MDBCol>
                    </MDBRow>
                </MDBListGroupItem>
            </MDBListGroup>
        </div>
    );
};

export default PaymentPlanList;
