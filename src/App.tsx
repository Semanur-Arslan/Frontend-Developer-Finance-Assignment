import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';
import LoginPage from './pages/login_register';
import DashboardPage from './pages/dashboard';
import PaymentPlanPage from './pages/payment_plan';
import DebtsPage from './pages/debts';
import './style/style.css';
import AddDebts from './pages/add_debt';
import AddPaymentPlanPage from './pages/edit_payment_plan';


const AppRoutes: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.login.isAuthenticated);

  return (
    <Router>
      <Routes>
        {!isAuthenticated && <Route path="/login" element={<LoginPage />} />}
        {isAuthenticated && <Route path="/dashboard" element={<DashboardPage />} />}
        {isAuthenticated && <Route path="/add-payment-plan/:id" element={<AddPaymentPlanPage />} />}
        {isAuthenticated && <Route path="/payment-plan/:id"  element={<PaymentPlanPage />} />}
        {isAuthenticated && <Route path="/debts" element={<DebtsPage />} />}
        {isAuthenticated && <Route path="/add-debt" element={<AddDebts />} />}


        {!isAuthenticated && <Route path="*" element={<Navigate to="/login" />} />}
        {isAuthenticated && <Route path="*" element={<Navigate to="/dashboard" />} />}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
