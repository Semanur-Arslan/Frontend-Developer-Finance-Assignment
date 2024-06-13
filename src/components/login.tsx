import {
    MDBTabsContent,
    MDBBtn,
    MDBInput,
    MDBValidation,
    MDBValidationItem,

}
    from 'mdb-react-ui-kit';
import axios from 'axios';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setToken } from '../redux/reducers/auth_slice';
import { loginState } from '../redux/reducers/login_slice';
import { LoginFormData } from '../utils/type';

interface LoginProps {
    onRegisterClick: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}

function Login({ onRegisterClick }: LoginProps) {

    const dispatch = useDispatch();

    const [error, setError] = useState('')
    const [formData, setFormData] = useState<LoginFormData>({
        email: '',
        password: '',
    })


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const response = await axios.post('https://study.logiper.com/auth/login', formData);
            if (response.data.status === 'success') {
                const token = response.data.data;
                dispatch(setToken(token));
                dispatch(loginState(true));
            } else if (response.data.status === 'error') {
                setError(response.data.data)
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                setError(error.response.data.data);
            } else {
                setError('An unknown error occurred');
            }
        }
    };

    return (

        <>
            {error && <div className='error-message'>{error}</div>}
            <MDBTabsContent >
                <MDBValidation onSubmit={handleSubmit} className='px-4'>
                    <MDBValidationItem feedback='Please enter email' invalid className='form-item'>
                        <MDBInput wrapperClass='mb-4' required label='Email' name='email' type='email' value={formData.email} onChange={handleChange} />
                    </MDBValidationItem>
                    <MDBValidationItem feedback='Please enter  password' invalid className='form-item'>
                        <MDBInput wrapperClass='mb-4' required label='Password' name='password' type='password' value={formData.password} onChange={handleChange} />
                    </MDBValidationItem >
                    <MDBBtn className="mb-4 w-100">Sign in</MDBBtn>
                    <p className="text-center">Not a member? <a onClick={onRegisterClick}>Register</a></p>
                </MDBValidation>
            </MDBTabsContent>
        </>
    );
}

export default Login;