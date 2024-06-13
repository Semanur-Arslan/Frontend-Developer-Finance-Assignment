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
import { RegisterFormData } from '../utils/type';

function Register() {

    const dispatch = useDispatch();

    const [error, setError] = useState('')
    const [formData, setFormData] = useState<RegisterFormData>({
        name: '',
        email: '',
        password: '',
        passwordAgain: '',
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
        setError('');
        if (!(formData.password === formData.passwordAgain)) {
            setError('Passwords do not match !');
            setFormData(prevState => ({
                ...prevState,
                password: '',
                passwordAgain: ''
            }));
            return;
        }

        const { passwordAgain, ...submitData } = formData;

        try {

            const response = await axios.post('https://study.logiper.com/auth/register', submitData);
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
                    <MDBValidationItem feedback='Please enter name surname' invalid className='form-item'>
                        <MDBInput wrapperClass='mb-4' required label='Name Surname' name='name' type='text' value={formData.name} onChange={handleChange} />
                    </MDBValidationItem>
                    <MDBValidationItem feedback='Please enter email' invalid className='form-item'>
                        <MDBInput wrapperClass='mb-4' required label='Email' name='email' type='email' value={formData.email} onChange={handleChange} />
                    </MDBValidationItem>
                    <MDBValidationItem feedback='Please enter  password' invalid className='form-item'>
                        <MDBInput wrapperClass='mb-4' required label='Password' name='password' type='password' value={formData.password} onChange={handleChange} />
                    </MDBValidationItem >
                    <MDBValidationItem feedback='Please re-enter the password' invalid className='form-item'>
                        <MDBInput wrapperClass='mb-4' required label='Password Again' name='passwordAgain' value={formData.passwordAgain} onChange={handleChange} type='password' />
                    </MDBValidationItem>
                    <MDBBtn type="submit" className="mb-4 w-100">Sign up</MDBBtn>
                </MDBValidation>
            </MDBTabsContent>
        </>

    );
}

export default Register;