import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginState } from '../redux/reducers/login_slice';
import {
  MDBNavbar,
  MDBContainer,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBNavbarBrand,
  MDBCollapse,
  MDBBtn
} from 'mdb-react-ui-kit';
import menu from '../images/menu.svg';

export default function App() {
  const dispatch = useDispatch();
  const [openNavColor, setOpenNavColor] = useState(false);

  const handleClick = () => {
    dispatch(loginState(false));
  }

  return (
    <>
      <MDBNavbar className='fixed-top' expand='lg' dark bgColor='primary'>
        <MDBContainer fluid>
          <MDBNavbarBrand href='#'>Lojiper Finance</MDBNavbarBrand>
          <MDBNavbarToggler
            type='button'
            data-target='#navbarColor02'
            aria-controls='navbarColor02'
            aria-expanded='false'
            aria-label='Toggle navigation'
            onClick={() => setOpenNavColor(!openNavColor)}
          >
            <img src={menu} alt="menuIcon" />
          </MDBNavbarToggler>
          <MDBCollapse open={openNavColor} navbar className='collapseNavbar'>
            <MDBNavbarNav className='me-auto mb-2 mb-lg-0 ' >
              <MDBNavbarItem className='active'>
                <MDBNavbarLink aria-current='page' href='/dashboard'>
                  Home
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href='/debts'>Debt List</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href='/add-debt'>Add Debt</MDBNavbarLink>
              </MDBNavbarItem>

            </MDBNavbarNav>
            <MDBBtn className='mx-2 text-nowrap' color='secondary' onClick={handleClick}>
              Log out
            </MDBBtn>
          </MDBCollapse>

        </MDBContainer>
      </MDBNavbar>
    </>
  );
}