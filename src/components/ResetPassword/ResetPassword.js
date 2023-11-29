import {
  React,
  useState,
  useEffect
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {Button, Form, Container} from 'react-bootstrap';

import { ResetPass } from '../../reducers/user';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ResetPassword.css';

function ResetPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector( state => state.user);
  const [token, setToken] = useState(null);
  const [windup, setWindup] = useState(false);

  useEffect(() => {
    const url = window.location.href;
    const token = url.split('token=')[1];
    setToken(token);
  },[]);

  useEffect( () => {
    if (windup && !user.rejected) {
      navigate('/login');
    }
  }, [windup]);

  const [isPassValid, setIsPassValid] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const validatePassword = (password) => {
    if (password.length < 8) {
      return false;
    }
    const hasCapitalLetter = /[A-Z]/.test(password);
    const hasSmallLetter = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);

    return hasCapitalLetter && hasSmallLetter && hasNumber;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ( isPassValid && (password === confirmPassword)){
      dispatch(ResetPass({password, token}));
      setWindup(true);
    }
  };

  const handleConfirmPassword = (e) => {
    const confirmPassword = e.target.value;
    setConfirmPassword(confirmPassword);
  };

  const handlePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
    setIsPassValid(validatePassword(e.target.value));
  };

  
  return (

    <div className='centered-container'>
      {token ?
        <div>

          <Container className='text-center w-100'>
            <h2 className='FormHeading'>Reset Password</h2>
          </Container>

          <Container className='FormContainer px-4 py-3 mt-5'>
            <Form onSubmit={handleSubmit}>

              <Form.Group className='mb-4' controlId='NewPassword'>

                <Form.Label>New Password</Form.Label>
                <Form.Control 
                  type='password' 
                  placeholder='Enter New Password' 
                  onChange={handlePassword}
                  isInvalid={!isPassValid && password.length > 0} 
                  required = {true}
                />
                <Form.Control.Feedback type='invalid'>
                Password must contain capital, small letter and number.
                </Form.Control.Feedback>
              
              </Form.Group>

              <Form.Group className='mb-4' controlId='ConfirmPassword'>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control 
                  type='password' 
                  placeholder='Confirm Password' 
                  onChange={handleConfirmPassword}
                  isInvalid={!(password === confirmPassword) && confirmPassword.length > 0} 
                  required = {true}
                />
                <Form.Control.Feedback type='invalid'>
                Password should must match.
                </Form.Control.Feedback>
              
              </Form.Group>

              <Button className='w-100 mb-4' variant='primary' type='submit' >
                Reset
              </Button>

            </Form>
          </Container>
 
        

        </div>
        :  <Container className='text-center w-100'>
          <h2 className='FormHeading'>Access Denied</h2>
        </Container> 
      }
    </div>
    
  );
}

export default ResetPassword;