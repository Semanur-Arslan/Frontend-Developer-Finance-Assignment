import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PaymentPlanData, PaymentPlanState } from '../../utils/type';


const initialState: PaymentPlanState = {
  paymentPlans: [],
  error: null,
};

const paymentPlansSlice = createSlice({
  name: 'paymentPlans',
  initialState,
  reducers: {
    setPaymentPlans(state, action: PayloadAction<PaymentPlanData[]>) {
      state.paymentPlans = action.payload;
      state.error = null;
    },
    updatePaymentPlan(state, action: PayloadAction<PaymentPlanData>) {
      const index = state.paymentPlans.findIndex(plan => plan.id === action.payload.id);
      if (index !== -1) {
        state.paymentPlans[index] = action.payload;
      }
    },
  },
});

export const { setPaymentPlans, updatePaymentPlan } = paymentPlansSlice.actions;

export default paymentPlansSlice.reducer;
