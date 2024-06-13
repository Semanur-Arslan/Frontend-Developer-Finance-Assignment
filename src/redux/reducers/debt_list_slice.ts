import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DebtData } from '../../utils/type';

interface DebtState {
  debtData: DebtData[];
  error: string | null;
}

const initialState: DebtState = {
  debtData: [],
  error: null,
};

const debtSlice = createSlice({
  name: 'debt',
  initialState,
  reducers: {
    setDebtData(state, action: PayloadAction<DebtData[]>) {
      state.debtData = action.payload;
    },
    removeDebt(state, action: PayloadAction<string>) {
      state.debtData = state.debtData.filter(debt => debt.id !== action.payload);
    }
  },
});

export const { setDebtData, removeDebt } = debtSlice.actions;

export default debtSlice.reducer;
