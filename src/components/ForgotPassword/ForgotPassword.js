import  {
  React,
  useState
} from 'react';
import {useDispatch} from 'react-redux';
import { Link } from 'react-router-dom';
import {Button, Form, Container} from 'react-bootstrap';

import { forgotPassword } from '../../reducers/user';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ForgotPassword.css';


function ForgotPassword() {
  const dispatch = useDispatch();
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [email, setEmail] = useState('');
  const [showSuccMsg, setShowSuccMsg] = useState(false);
  
  const validateEmail = (inputMail) => {
    const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;

    return emailRegex.test(inputMail);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEmailValid) {
      dispatch(forgotPassword({email}));
      setShowSuccMsg(true);
    }
  };

  const handleEmailChange = (e) => {
    const inputMail = e.target.value;
    setEmail(inputMail);

    const isValidEmail = validateEmail(inputMail);
    setIsEmailValid(isValidEmail);
  };

  //Return JSX
  return (

    <div className='centered-container'>
      <div>
        { showSuccMsg ?
          <Container className='text-center w-100'>
            <h2 className='FormHeading'>Check Mail</h2>
          </Container>
          : <>
            <Container className='text-center w-100'>
              <h2 className='FormHeading'>Forgot Password</h2>
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

                <Button className='w-100 mb-4' variant='primary' type='submit' >
                Reset Password
                </Button>

                <Container className='text-center w-100 text-muted'>
                  <p className='ForgotPassword' >
              No, I remember my password. <Link to='/login'>Login</Link>
                  </p>
                </Container>

              </Form>
            </Container>
          </>
        }
      </div>
    </div>
  );
}

export default ForgotPassword;