import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PaymentPlan, FormData, FormState } from '../../utils/type';

const initialState: FormState = {
  formData: {
    debtName: '',
    lenderName: '',
    debtAmount: 0,
    interestRate: 0,
    amount: 0,
    paymentStart: '',
    installment: 0,
    description: '',
    paymentPlan: [],
  },
};

const debtSlice = createSlice({
  name: 'debt',
  initialState,
  reducers: {
    setFormData(state, action: PayloadAction<FormData>) {
      state.formData = action.payload;
    },
    updateFormData(state, action: PayloadAction<{ name: string; value: string }>) {
      const { name, value } = action.payload;
      const updatedFormData = { ...state.formData, [name]: value };
      return { ...state, formData: updatedFormData };
    },
    updatePaymentPlan(state, action: PayloadAction<PaymentPlan[]>) {
      state.formData.paymentPlan = action.payload;
    },
    resetFormData(state) {
      return initialState;
    },
  },
});

export const { setFormData, updateFormData, updatePaymentPlan, resetFormData } = debtSlice.actions;

export default debtSlice.reducer;
