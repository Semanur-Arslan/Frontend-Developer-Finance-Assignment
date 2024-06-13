export interface RegisterFormData {
    name: string;
    email: string;
    password: string;
    passwordAgain: string;
}

export interface LoginFormData {
    email: string;
    password: string;
}

export interface AuthState {
    token: string | null;
}

export interface LoginState {
    isAuthenticated: boolean;
}


export interface DebtData {
    id: string;
    debtName: string;
    lenderName: string;
    debtAmount: number;
    interestRate: number;
    installment: number;
    paymentStart: string;
    description: string;
    amount: number;
    createdAt: string;
   updatedAt: string
}

export interface RootState {
    paymentPlans: {
        paymentPlans: PaymentPlanData[];
        error: string | null;
    };
}

export interface DebtResponseData {
    status: string;
    data: DebtData[];
}

export interface PaymentPlanData {
    id: string;
    paymentAmount: number;
    paymentDate: string;
    isPaid: boolean;
}

export interface PaymentPlanItemProps {
    plan: PaymentPlanData;
    onUpdate: (plan: PaymentPlanData) => void;
}

export interface PaymentPlan {
    paymentDate: string;
    paymentAmount: number;
};

export interface PaymentPlanState {
    paymentPlans: PaymentPlanData[];
    error: string | null;
}


export interface FormData {
    debtName: string;
    lenderName: string;
    debtAmount: number;
    interestRate: number;
    amount: number;
    paymentStart: string;
    installment: number;
    description: string;
    paymentPlan: PaymentPlan[];
};

export interface FormState {
    formData: FormData;
}





