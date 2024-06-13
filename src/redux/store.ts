import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import loginReducer from './reducers/login_slice';
import authReducer from './reducers/auth_slice';
import formReducer from './reducers/debt_slice';
import paymentPlanListReducer from '../redux/reducers/payment_plan_slice';
import debtListReducer from './reducers/debt_list_slice';


const rootReducer = combineReducers({ 
  login: loginReducer,
  auth: authReducer,
  form: formReducer,
  paymentPlans: paymentPlanListReducer,
  debtList: debtListReducer,

});

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
