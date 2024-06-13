import React, { useEffect } from 'react';
import { MDBBtn, MDBInput, MDBValidation, MDBValidationItem, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { updateFormData, updatePaymentPlan } from '../redux/reducers/debt_slice';
import { PaymentPlan, FormData } from '../utils/type';

interface DebtFormProps {
  onSubmit: (data: FormData) => void;
  error: string;
  buttonText: string;
}

const DebtForm: React.FC<DebtFormProps> = ({ onSubmit, error, buttonText }) => {
  const dispatch = useDispatch();
  const formData = useSelector((state: RootState) => state.form.formData);

  const calculateTotalAmount = (debtAmount: number, interestRate: number) => {
    const total = debtAmount + (debtAmount * (interestRate / 100));
    return total;
  };

  const generatePaymentPlan = (amount: number, installment: number, paymentStart: string): PaymentPlan[] => {
    if (!paymentStart) return [];
    const paymentAmount = amount / installment;
    const paymentPlans: PaymentPlan[] = [];
    const currentDate = new Date(paymentStart);

    for (let i = 0; i < installment; i++) {
      if (!(currentDate.getTime())) return [];
      const paymentDate = currentDate.toISOString().split('T')[0];
      paymentPlans.push({
        paymentDate,
        paymentAmount,
      });
      currentDate.setMonth(currentDate.getMonth() + 1);
    }

    return paymentPlans;
  };

  useEffect(() => {
    const debtAmount = parseFloat(formData.debtAmount.toString());
    const interestRate = parseFloat(formData.interestRate.toString());
    const installment = parseFloat(formData.installment.toString());
    const totalAmount = calculateTotalAmount(debtAmount, interestRate);
    dispatch(updateFormData({ name: 'amount', value: totalAmount.toString() }));
    const paymentPlan = generatePaymentPlan(totalAmount, installment, formData.paymentStart);
    dispatch(updatePaymentPlan(paymentPlan));
  }, [formData.debtAmount, formData.interestRate, formData.installment, formData.paymentStart]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    dispatch(updateFormData({ name, value }));

    if (name === 'debtAmount' || name === 'interestRate') {
      const debtAmount = name === 'debtAmount' ? parseFloat(value) : parseFloat(formData.debtAmount.toString());
      const interestRate = name === 'interestRate' ? parseFloat(value) : parseFloat(formData.interestRate.toString());
      if (!isNaN(debtAmount) && !isNaN(interestRate)) {
        const amount = calculateTotalAmount(debtAmount, interestRate);
        dispatch(updateFormData({ name: 'amount', value: amount.toString() }));
      }
    }

    if (name === 'debtAmount' || name === 'installment') {
      const debtAmount = name === 'debtAmount' ? parseFloat(value) : parseFloat(formData.debtAmount.toString());
      const installment = name === 'installment' ? parseFloat(value) : parseFloat(formData.installment.toString());
      if (!isNaN(debtAmount) && !isNaN(installment)) {
        const paymentPlan = generatePaymentPlan(debtAmount, installment, formData.paymentStart);
        dispatch(updatePaymentPlan(paymentPlan));
      }
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (parseInt(value) === 0) {
      dispatch(updateFormData({ name, value: '' }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (!value) {
      dispatch(updateFormData({ name, value: '0' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formDataWithNumbers = {
      ...formData,
      debtAmount: parseFloat(formData.debtAmount.toString()),
      interestRate: parseFloat(formData.interestRate.toString()),
      amount: parseFloat(formData.amount.toString()),
      installment: parseFloat(formData.installment.toString()),
    };
    onSubmit(formDataWithNumbers);
  };

  return (
    <MDBValidation onSubmit={handleSubmit}>
      {error && <div className='error-message'>{error}</div>}
      <MDBRow className='mb-2'>
        <MDBCol>
          <MDBValidationItem feedback='Please enter the debt name' invalid className='form-item'>
            <span>Debt Name</span>
            <MDBInput wrapperClass='mb-4' required name='debtName' type='text' value={formData.debtName} onChange={handleChange} />
          </MDBValidationItem>
        </MDBCol>
        <MDBCol>
          <MDBValidationItem feedback='Please enter the lender' invalid className='form-item'>
            <span>Lender</span>
            <MDBInput wrapperClass='mb-4' required name='lenderName' type='text' value={formData.lenderName} onChange={handleChange} />
          </MDBValidationItem>
        </MDBCol>
      </MDBRow>

      <MDBRow className='mb-2'>
        <MDBCol>
          <MDBValidationItem feedback='Please enter the amount' invalid className='form-item'>
            <span>Amount</span>
            <MDBInput
              wrapperClass='mb-4'
              required
              name='debtAmount'
              type='number'
              value={formData.debtAmount}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </MDBValidationItem>
        </MDBCol>
        <MDBCol>
          <MDBValidationItem feedback='Please enter the interest rate' invalid className='form-item'>
            <span>Interest Rate (%)</span>
            <MDBInput
              wrapperClass='mb-4'
              required
              name='interestRate'
              type='number'
              value={formData.interestRate}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={handleChange}
            />
          </MDBValidationItem>
        </MDBCol>
      </MDBRow>

      <MDBRow className='mb-2'>
        <MDBCol>
          <MDBValidationItem feedback='' invalid className='form-item'>
            <span>Total</span>
            <MDBInput
              wrapperClass='mb-4'
              required
              name='amount'
              type='number'
              value={formData.amount}
              disabled
            />
          </MDBValidationItem>
        </MDBCol>
        <MDBCol>
          <MDBValidationItem feedback='Please enter the starting date' invalid className='form-item'>
            <span>Starting Date</span>
            <MDBInput
              wrapperClass='mb-4'
              required
              name='paymentStart'
              type='date'
              value={formData.paymentStart && (formData.paymentStart).toString().split('T')[0]}
              onChange={handleChange}
            />
          </MDBValidationItem>
        </MDBCol>
      </MDBRow>

      <MDBRow className='mb-2'>
        <MDBCol>
          <MDBValidationItem feedback='Please enter the installment' invalid className='form-item'>
            <span>Installment</span>
            <MDBInput
              wrapperClass='mb-4'
              required
              name='installment'
              type='number'
              value={formData.installment}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </MDBValidationItem>
        </MDBCol>
        <MDBCol>
          <MDBValidationItem feedback='Please enter the description' invalid className='form-item'>
            <span>Description</span>
            <MDBInput wrapperClass='mb-4' required name='description' type='text' value={formData.description} onChange={handleChange} />
          </MDBValidationItem>
        </MDBCol>
      </MDBRow>

      <MDBBtn type="submit" className="mb-4 w-100">{buttonText}</MDBBtn>
    </MDBValidation>
  );
};

export default DebtForm;
