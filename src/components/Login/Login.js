import React, {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {Button, Form, Container, Spinner} from 'react-bootstrap';

import { loginUser} from '../../reducers/user';
import close from '../../assets/close_red.svg';

import './Login.css';

function Login() {

  const dispatch = useDispatch();
  const User = useSelector(state => state.user);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState (false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [checkErr, setCheckErr] = useState(false);
 
  useEffect(()=>{
    if (User){
      if (localStorage.getItem('token') ) {
        if ( User.type === 'user' ) {
          navigate('/');
        } else if ( User.type === 'admin' ) {
          navigate('/admindashboard');
        }

      } else if (checkErr && User.rejected) {
        setIsOpen(true);
        setCheckErr(false);
      }
    }
  },[User.token,User.renderError]);

  const validateEmail = (inputMail) => {
    const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;

    return emailRegex.test(inputMail);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEmailValid && password.length > 0) {
      dispatch(loginUser({
        email: email,
        password: password
      }));
    }
    setCheckErr(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleEmailChange = (e) => {
    const inputMail = e.target.value;
    setEmail(inputMail);

    const isValidEmail = validateEmail(inputMail);
    setIsEmailValid(isValidEmail);
  };

  const handleCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    setRememberMe(isChecked);
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  return (

    <div className='centered-container'>
      <div>

        <div className='LoginAlertContainer'>
          { (User.error && isOpen) &&
          <Container className='LoginAlert'>
            <div className='text-danger'>{User.error}</div>
            <img className='btn_close' src={close} onClick={handleClose}/>
          </Container>
          }
        </div>

        <Container className='text-center w-100'>
          <h2 className='FormHeading'>Login</h2>
        </Container>

        <Container className='FormContainer px-4 py-3 mt-5'>
          <Form onSubmit={handleSubmit}>

            <Form.Group className='mb-4' controlId='formBasicEmail'>
              <Form.Label>Email address</Form.Label>
              <Form.Control 
                type='email' 
                placeholder='Enter email' 
                value={email} 
                onChange={handleEmailChange}
                isInvalid={!isEmailValid && email.length > 0} 
                required = {true}
              />
              <Form.Control.Feedback type='invalid'>
                Enter a valid email address.
              </Form.Control.Feedback>
              
            </Form.Group>

            <Form.Group className='mb-2' controlId='formBasicPassword'>
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' placeholder='Password' onChange={handlePasswordChange} required = {true}/>
            </Form.Group>

            <Form.Group className='mb-4' controlId='formBasicCheckbox'>
              <Form.Check
                type='checkbox'
                label='Remember Me'
                checked={rememberMe}
                onChange={handleCheckboxChange}
              />
            </Form.Group>

            <Button className='w-100 mb-4' variant='primary' type='submit' >
              Login
              {User.loading && <Spinner
                as='span'
                animation='border'
                size='sm'
                role='status'
                aria-hidden='true'
                className='LoginSpinner'
              />}
            </Button>

            <Container className='text-center w-100 text-muted'>
              <p className='ForgotPassword'>
                Forgot Password! <Link to='/forgotpassword'>Reset</Link>
              </p>
              <p className='ForgotPassword'>
                {'Don\'t have an account? '}<Link to='/signup'>SignUp</Link>
              </p>
            </Container>

          </Form>
        </Container>
 
        

      </div>

    </div>
    
  );
}

export default Login;