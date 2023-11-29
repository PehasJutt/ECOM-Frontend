import React, {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {Button, Form, Container, Spinner} from 'react-bootstrap';

import { SignupUser} from '../../reducers/user';
import close from '../../assets/close_red.svg';

function SignUp() {

  const dispatch = useDispatch();
  const User = useSelector(state => state.user);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState (false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [checkErr, setCheckErr] = useState(false);
 
  useEffect(()=>{
   
    if (checkErr) {
      if (User.error) {
        setIsOpen(true);
        setCheckErr(false);
      } else {
        navigate('/login');
      }
    }
      
  },[checkErr]);

  const validateEmail = (inputMail) => {
    const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;

    return emailRegex.test(inputMail);
  };

  const validatePassword = (password) => {
    if (password.length < 8) {
      return false;
    }
  
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);

    return hasUppercase && hasLowercase && hasNumber;
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEmailValid && isPasswordValid) {
      await dispatch(SignupUser({
        name: name,
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

  const handleNameChange = (e) => {
    const name = e.target.value;
    setName(name);
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setPassword(password);
    const isValidPassword = validatePassword(password);
    setIsPasswordValid(isValidPassword);
  };

  return (

    <div className='centered-container'>
      <div>

        <div className='LoginAlertContainer'>
          { isOpen &&
          <Container className='LoginAlert'>
            <div className='text-danger'>{User.error}</div>
            <img className='btn_close' src={close} onClick={handleClose}/>
          </Container>
          }
        </div>

        <Container className='text-center w-100'>
          <h2 className='FormHeading'>SignUp</h2>
        </Container>

        <Container className='FormContainer px-4 py-3 mt-5'>
          <Form onSubmit={handleSubmit}>

            <Form.Group className='mb-4' controlId='formBasicEmail'>
              <Form.Label>Full name</Form.Label>
              <Form.Control 
                type='input' 
                placeholder='Your name' 
                value={name} 
                onChange={handleNameChange}
                isInvalid={ name.length > 0 && name.length < 2 } 
                required = {true}
              />
              <Form.Control.Feedback type='invalid'>
                Enter a valid name.
              </Form.Control.Feedback>
            </Form.Group>

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
              <Form.Control
                type='password'
                placeholder='Password'
                onChange={handlePasswordChange} 
                required = {true}
                isInvalid={!isPasswordValid && password.length > 0} 
              />
              <Form.Control.Feedback type='invalid'>
                Capital letter and mix of letter and numbers required.
              </Form.Control.Feedback>
            </Form.Group>

            <Button className='w-100 mb-4 mt-4' variant='primary' type='submit' >
              SignUp
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
                {'Already have an account? '}<Link to='/login'>Login</Link>
              </p>
            </Container>

          </Form>
        </Container>
 
        

      </div>

    </div>
    
  );
}

export default SignUp;