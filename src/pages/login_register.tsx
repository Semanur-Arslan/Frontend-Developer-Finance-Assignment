import { useState } from 'react';
import {
    MDBContainer,
    MDBCol,
    MDBRow,
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
}
    from 'mdb-react-ui-kit';
import Login from '../components/login';
import Register from '../components/register';
import financeImage from '../images/Finance.svg';


function LoginRegisterPage() {

    const [justifyActive, setJustifyActive] = useState('tab1');;

    const handleJustifyClick = (value: string) => {
        setJustifyActive(value);
    };

    return (
        <MDBContainer fluid className="p-3 my-5 h-custom">

            <MDBRow>

                <MDBCol col='10' md='6'>
                    <img src={financeImage} className="img-fluid" alt="Sample image" />
                </MDBCol>

                <MDBCol col='4' md='6' className='p-5'>

                    <MDBTabs pills justify className='mb-3 d-flex flex-row justify-content-between'>
                        <MDBTabsItem>
                            <MDBTabsLink onClick={() => handleJustifyClick('tab1')} active={justifyActive === 'tab1'}>
                                Login
                            </MDBTabsLink>
                        </MDBTabsItem>
                        <MDBTabsItem>
                            <MDBTabsLink onClick={() => handleJustifyClick('tab2')} active={justifyActive === 'tab2'}>
                                Register
                            </MDBTabsLink>
                        </MDBTabsItem>
                    </MDBTabs>
                    {justifyActive === 'tab1' ? <Login onRegisterClick={() => handleJustifyClick('tab2')} /> : <Register />}
                </MDBCol>

            </MDBRow>

        </MDBContainer>
    );
}

export default LoginRegisterPage;