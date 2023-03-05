import './account.css'
import {useLayoutEffect, useRef, useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';

function Login(props) {
  const ref = useRef(null);
  const [accountError, setAccountError] = useState(false)
  const [loginDetails, setLoginDetails] = useState({})
  const [positionLeft, setPositionLeft] = useState(true)

  const [status, setStatus] = useState('login')

  // Register Validation
  const [userNameError, setUserNameError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [confPasswordError, setConfPasswordError] = useState(false)
  const [typeError, setTypeError] = useState(false)
  const [regSuccess, setRegSuccess] = useState(false)
  const navigate = useNavigate()
  const routerDetails = useLocation()

  const onFormChange = (e, updatedAt) => {
    const name = e.target.name;
    const value = e.target.value;
    setLoginDetails({ ...loginDetails, [name]: value });
  };

  const fetchLogin = async (e) => {
    e.preventDefault();
    var queryString = "http://127.0.0.1:8000/api/login"
    axios
        .post(queryString,{
          email:loginDetails.loginEmail,
          pw:loginDetails.loginPw
        })
        .then(response => {
          if(response.status == 200){
            props.loginFunc(true, response.data)
            var redirect_url = "/profile/" + response.data.username
            localStorage.setItem('account', JSON.stringify({
              user_id:response.data.user_id,
              username:response.data.username,
            }));
            window.dispatchEvent(new Event("storage"));

            navigate(redirect_url, {
              state:{
                user_id:response.data.user_id,
                username:response.data.username,
                rating:response.data.rating,
                type:response.data.type.name,
              }
            });
          }
        })
        .catch((error) => {
          setAccountError(true)
          console.error(`Error retrieving Login Info: ${error}`)
        })
  }

  const pwFormCheck = () => {
    var formPassed = true

    if(loginDetails.regPw.length < 8){
      setPasswordError(true)
    }else{
      setPasswordError(false)
    }

    if(loginDetails.regPw != loginDetails.regConfPw){
      setConfPasswordError(true)
      formPassed = false
    }else{
      setConfPasswordError(false)
    }

    if(loginDetails.regType === undefined){
      setTypeError(true)
      formPassed = false
    }else{
      setTypeError(false)
    }

    return formPassed
  }

  const regFormValidation = async () => {
    var formPassed = pwFormCheck()

    var params = new URLSearchParams();
    params.append('username',loginDetails.regUser)
    params.append('email', loginDetails.regEmail)

    var userQuery = "http://127.0.0.1:8000/api/form_validation"
    axios
        .get(userQuery, {params:params})
        .then(response => {
          const checkUsername = response.data.find((e) => e.username == loginDetails.regUser)
          const checkEmail = response.data.find((e) => e.email == loginDetails.regEmail)

          if(checkUsername){
            setUserNameError(true)
            formPassed = false
          }else{
            setUserNameError(false)
          }

          if(checkEmail){
            setEmailError(true)
            formPassed = false
          }else{
            setEmailError(false)
          }

          if(formPassed){
            console.log(loginDetails.regType)
            var queryString = "http://127.0.0.1:8000/api/register"
            axios
              .post(queryString, {
                username:loginDetails.regUser,
                email:loginDetails.regEmail,
                password:loginDetails.regPw,
                type:loginDetails.regType
              })
              .then(response => {
                if(response.status == 200){
                  setRegSuccess(true)
                  setStatus('login')
                }
              })
              .catch(error => console.error(`Error retrieving Registering: ${error}`))
          }
        })
        .catch(error => console.error(`Error retrieving Registering: ${error}`))
  }

  const registerAcc = async (e) => {
    e.preventDefault();
    regFormValidation()
  }

  useEffect(()=>{
    console.log(routerDetails.state.type)
    if(routerDetails.state.type == 'login'){
      setStatus('login')
      setPositionLeft(true)
    }else{
      setStatus('register')
      setPositionLeft(false)
    }
  },[])

  function myMove() {
    setPositionLeft(!positionLeft)
  }

    return (
        <Container style={{maxWidth:'none', padding:0, height:'100vh'}}>
          <Row className="h-100" style={{padding:0,margin:0}}>
            <Col style={{display:'flex', justifyContent:'left', alignItems:'center',backgroundColor:'#d5ecd5'}}>
            <div style={{paddingLeft:'5%'}}>
                <div style={{textAlign:'left'}}>
                  <h1 id="homeTitle">Reduce Food Waste.</h1>
                  <h1 id="homeTitle">Donate or Sell your surplus.</h1>
                  <h5 id="homeSubtitle">
                  Sign up today to make an impact in fighting against Food Wastage!
                  </h5>
                </div>
              </div>
            </Col>

            <Col style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
            <div style={{width:'100%'}}>
            {
              status == 'login'?
                <Form onSubmit={fetchLogin}>  
                  <Container>
                    {/* Email Form */}
                    <Row>
                    <h1 style={{padding:0}}>Login</h1>
                      {
                        regSuccess? <h5 style={{paddingTop:'1%', paddigBottom:'1%'}}>
                          Registered Successfully. You may now log into your
                          account
                        </h5>:
                        <div></div>
                      }

                      <Col style={{display:'flex', justifyContent:'center',padding:0}}>
                        <Form.Group className="mb-4" controlId="loginEmail" style={{width:'80%', textAlign:'left'}}>
                          <Form.Label>Email address</Form.Label>
                          <Form.Control 
                            name="loginEmail" 
                            type="email" 
                            placeholder="Enter email" 
                            onChange={onFormChange} 
                            required
                            isInvalid={accountError}/>
                          <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                          </Form.Text>
                          <Form.Control.Feedback type="invalid">
                            Invalid Email/Password
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>
                    {/* Password Form */}
                    <Row style={{width:'100%'}}>
                      <Col style={{display:'flex', justifyContent:'center'}}>
                        <Form.Group className="mb-3" controlId="loginPassword" style={{width:'80%', textAlign:'left'}}>
                          <Form.Label>Password</Form.Label>
                          <Form.Control name="loginPw" type="password" placeholder="Password" onChange={onFormChange} required isInvalid={accountError}/>
                          <Form.Control.Feedback type="invalid">
                            Invalid Email/Password
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Button variant="primary" type="submit">
                      Submit
                    </Button>
                  </Container>
                  <h5 style={{paddingTop:'5%'}}>
                      Don't have an account? <span onClick={()=>{setStatus('register')}}>
                        Register Now
                      </span>
                    </h5>
                </Form>   
              :
              <Form onSubmit={registerAcc}>
                <Container>
                    {/* Username Form */}
                    <Row>
                      <h1 style={{marginBottom:'5%'}}>Create Account</h1>    
                      <Col style={{display:'flex', justifyContent:'center'}} ref={ref}>
                        <Form.Group className="mb-3" controlId="regUser" style={{width:'80%', textAlign:'left'}}>
                          <Form.Label style={{display:'flex'}}>Username</Form.Label>
                          <Form.Control 
                            name="regUser" 
                            type="text" 
                            placeholder="Enter username" 
                            onChange={onFormChange} 
                            required
                            isInvalid={userNameError}/>
                          <Form.Control.Feedback type="invalid">
                            Username Taken
                        </Form.Control.Feedback>  
                        </Form.Group>
                      </Col>
                    </Row>
                    {/* Email Form */}
                    <Row>
                      <Col style={{display:'flex', justifyContent:'center'}} ref={ref}>
                        <Form.Group className="mb-3" controlId="regEmail" style={{width:'80%', textAlign:'left'}}>
                          <Form.Label style={{display:'flex'}}>Email address</Form.Label>
                          <Form.Control 
                            name="regEmail" 
                            type="email" 
                            placeholder="Enter email" 
                            onChange={onFormChange} 
                            required
                            isInvalid={emailError}/>
                          <Form.Control.Feedback type="invalid">
                            Email Taken
                        </Form.Control.Feedback> 
                        </Form.Group>
                      </Col>
                    </Row>
                    {/* Password Form */}
                    <Row>
                      <Col style={{display:'flex', justifyContent:'center'}}>
                        <Form.Group className="mb-3" controlId="regPassword" style={{width:'80%'}}>
                          <Form.Label style={{display:'flex'}}>Password</Form.Label>
                          <Form.Control 
                            name="regPw" 
                            type="password" 
                            placeholder="Password" 
                            onChange={onFormChange} 
                            required
                            isInvalid={passwordError}/>
                            
                          <Form.Control.Feedback type="invalid">
                            Password must be at least length 8
                          </Form.Control.Feedback> 
                        </Form.Group>
                        
                      </Col>
                    </Row>
                    {/* Confirm Password Form */}
                    <Row>
                      <Col style={{display:'flex', justifyContent:'center'}}>
                        <Form.Group className="mb-3" controlId="regConfPassword" style={{width:'80%'}}>
                          <Form.Label style={{display:'flex'}}>Confirm Password</Form.Label>
                          <Form.Control 
                            name="regConfPw" 
                            type="password" 
                            placeholder="Password" 
                            onChange={onFormChange} 
                            required
                            isInvalid={confPasswordError}/>
                        <Form.Control.Feedback type="invalid">
                            Passwords does not match
                        </Form.Control.Feedback> 
                        </Form.Group>
                        
                      </Col>
                    </Row>
                    {/* Type of Account */}
                    <Row>
                      <Col style={{display:'flex', justifyContent:'center'}}>
                        <Form.Group className="mb-3" controlId="regType" style={{width:'80%'}}>
                          <Form.Label style={{display:'flex'}}>Type</Form.Label>
                          <Form.Control 
                            as="select" 
                            name="regType" 
                            onChange={onFormChange} 
                            placeholder="Account Type" 
                            required
                            isInvalid={typeError}
                            >
                            <option key='blankChoice' hidden value />
                            <option value="individual">Individual</option>
                            <option value="business">Business</option>
                          </Form.Control>
                          <Form.Control.Feedback type="invalid">
                            Please select an account type
                        </Form.Control.Feedback> 
                        </Form.Group>
                      </Col>
                    </Row>
                    <Button variant="primary" type="submit">
                      Submit
                    </Button>
                    <h5 style={{paddingTop:'5%'}}>
                      Have an account already? <span onClick={()=>{setStatus('login')}}>
                        Login Now
                      </span>
                    </h5>
                </Container>
              </Form>
            }
            </div>
            
              <div>

              </div>
            </Col>
            </Row>
        </Container>
    );
  }
  
  export default Login;