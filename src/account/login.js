import './account.css'
import {useRef, useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
import Dropzone from 'react-dropzone-uploader'
import 'react-dropzone-uploader/dist/styles.css'

function Login(props) {
  // States for Login Page
  const ref = useRef(null);
  const [accountError, setAccountError] = useState(false)
  const [loginDetails, setLoginDetails] = useState({'regType':'Individual'})
  const [positionLeft, setPositionLeft] = useState(true)
  const [status, setStatus] = useState('login')
  // Register Validation
  const [userNameError, setUserNameError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [confPasswordError, setConfPasswordError] = useState(false)
  const [typeError, setTypeError] = useState(false)
  const [regSuccess, setRegSuccess] = useState(false)
  const [imgFile, setImgFile] = useState()
  const navigate = useNavigate()
  const routerDetails = useLocation()

  // For Uploading Files
  const fileParams = ({ meta }) => {
    return { url: 'https://httpbin.org/post' }
  }
  // For detecting new image upload
  const onFileChange = ({ meta, file }, status) => { 
      if (FileReader) {
          var fr = new FileReader();
          fr.readAsDataURL(file);
      }
      setImgFile(file)
  }

  // For detecting input changes in login form
  const onFormChange = (e, updatedAt) => {
    const name = e.target.name;
    const value = e.target.value;
    setLoginDetails({ ...loginDetails, [name]: value });
  };

  // Function to login
  const fetchLogin = async (e) => {
    // Prevent page from refreshing
    e.preventDefault();
    // Post Login Details
    var queryString = "http://127.0.0.1:8000/api/login"
    axios
        .post(queryString,{
          email:loginDetails.loginEmail,
          pw:loginDetails.loginPw
        })
        .then(response => {
          // Check if User provided details matches database
          if(response.status == 200){
            // If Successful, update Local Storage of Browser
            props.loginFunc(true, response.data)
            var redirect_url = "/profile/" + response.data.username
            localStorage.setItem('account', JSON.stringify({
              user_id:response.data.user_id,
              username:response.data.username,
              img:response.data.img
            }));
            // Trigger Window Event update
            window.dispatchEvent(new Event("storage"));
            // Navigate to user profile page
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

  // Check Registration Form 
  const pwFormCheck = () => {
    var formPassed = true
    // Check if password given is at least 8 length
    if(loginDetails.regPw.length < 8){
      setPasswordError(true)
    }else{
      setPasswordError(false)
    }
    // Check if Confirm password matches Password
    if(loginDetails.regPw != loginDetails.regConfPw){
      setConfPasswordError(true)
      formPassed = false
    }else{
      setConfPasswordError(false)
    }
    // Check if Type was left blank
    if(loginDetails.regType === undefined){
      setTypeError(true)
      formPassed = false
    }else{
      setTypeError(false)
    }

    return formPassed
  }

  // Validate Registration Form
  const regFormValidation = async () => {
    // Call Registration Form check first.
    var formPassed = pwFormCheck()
    // For GET query parameters
    var params = new URLSearchParams();
    params.append('username',loginDetails.regUser)
    params.append('email', loginDetails.regEmail)
    // Check if username/email exists
    var userQuery = "http://127.0.0.1:8000/api/form_validation"
    axios
        .get(userQuery, {params:params})
        .then(response => {
          // Check if username taken
          const checkUsername = response.data.find(
            (e) => e.username == loginDetails.regUser
          )
          // Check if email taken
          const checkEmail = response.data.find(
            (e) => e.email == loginDetails.regEmail
          )
          // If username taken, set username error true
          if(checkUsername){
            setUserNameError(true)
            formPassed = false
          }else{
            setUserNameError(false)
          }
          // If email taken, set email error true.
          if(checkEmail){
            setEmailError(true)
            formPassed = false
          }else{
            setEmailError(false)
          }
          // If no errors, post the data
          if(formPassed){
            // Use Form Data as POST parameters
            let form_data = new FormData();
            form_data.append('image', imgFile);
            form_data.append('username',loginDetails.regUser);
            form_data.append('email',loginDetails.regEmail);
            form_data.append('password',loginDetails.regPw);
            form_data.append('type',loginDetails.regType);
            // Post User details to register
            var queryString = "http://127.0.0.1:8000/api/register"
            axios
              .post(queryString, form_data)
              .then(response => {
                // If Successful, redirect them to login page
                if(response.status == 200){
                  setRegSuccess(true)
                  setStatus('login')
                  console.log(loginDetails)
                }
              })
              .catch(error => console.error(`Error retrieving 
                                              Registering: ${error}`))
          }
        })
        .catch(error => console.error(`Error retrieving Registering: ${error}`))
  }
  // Register Account Function
  const registerAcc = async (e) => {
    e.preventDefault();
    regFormValidation()
  }

  // Intial Render, check if user is trying to login or register
  useEffect(()=>{
    if(routerDetails.state.type == 'login'){
      setStatus('login')
      setPositionLeft(true)
    }else{
      setStatus('register')
      setPositionLeft(false)
    }
  },[])

  return (
      // Container for Login/Register
      <Container style={{maxWidth:'none', padding:0, height:'100vh'}}>
        <Row className="h-100" style={{padding:0,margin:0}}>
          <Col style={{display:'flex', justifyContent:'left', 
                        alignItems:'center',backgroundColor:'#d5ecd5'}}>
          {/* Left Side Display */}
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
          {/* Register/Login Form on The Right */}
          <Col style={{display:'flex', justifyContent:'center', 
                        alignItems:'center'}}>
          <div style={{width:'100%'}}>
          {
            // Check if User is trying to Login or Register
            status == 'login'?
              <Form onSubmit={fetchLogin}>  
                <Container>
                  {/* Login Form */}
                  <Row>
                  <h1 style={{padding:0}}>Login</h1>
                  {/* Check whether to display Registered Text */}
                    {
                      regSuccess? <h5 style={{paddingTop:'1%', 
                                                paddigBottom:'1%'}}>
                        Registered Successfully. You may now log into your
                        account
                      </h5>:
                      <div></div>
                    }
                    {/* Email Form */}
                    <Col style={{display:'flex', justifyContent:'center',
                                  padding:0}}>
                      <Form.Group className="mb-4" controlId="loginEmail" 
                                  style={{width:'80%', textAlign:'left'}}>
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
                        {/* Email Error Message */}
                        <Form.Control.Feedback type="invalid">
                          Invalid Email/Password
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  {/* Password Form */}
                  <Row style={{width:'100%'}}>
                    <Col style={{display:'flex', justifyContent:'center'}}>
                      <Form.Group className="mb-3" controlId="loginPassword" 
                                  style={{width:'80%', textAlign:'left'}}>
                        <Form.Label>Password</Form.Label>
                        <Form.Control name="loginPw" type="password" 
                                      placeholder="Enter Password" 
                                      onChange={onFormChange} required 
                                      isInvalid={accountError}/>
                        {/* Password Error Message */}
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
                    Don't have an account? <span 
                    className='logRegText'
                    onClick={
                      ()=>{setStatus('register')}
                    }>
                      Register Now
                    </span>
                  </h5>
              </Form>   
            :
            // Register Form
            <Form onSubmit={registerAcc}>
              <Container>
                  {/* Username Form */}
                  <Row>
                    <h1 style={{marginBottom:'5%'}}>Create Account</h1>    
                    <Col style={{display:'flex', justifyContent:'center'}} 
                          ref={ref}>
                      <Form.Group className="mb-3" controlId="regUser" 
                                  style={{width:'80%', textAlign:'left'}}>
                        <Form.Label style={{display:'flex'}}>
                          Username
                        </Form.Label>
                        <Form.Control 
                          name="regUser" 
                          type="text" 
                          placeholder="Enter username" 
                          onChange={onFormChange} 
                          required
                          isInvalid={userNameError}/>
                        {/* Username Form Error */}
                        <Form.Control.Feedback type="invalid">
                          Username Taken
                      </Form.Control.Feedback>  
                      </Form.Group>
                    </Col>
                  </Row>
                  {/* Email Form */}
                  <Row>
                    <Col style={{display:'flex', justifyContent:'center'}} 
                          ref={ref}>
                      <Form.Group className="mb-3" controlId="regEmail" 
                                  style={{width:'80%', textAlign:'left'}}>
                        <Form.Label style={{display:'flex'}}>
                          Email address
                        </Form.Label>
                        <Form.Control 
                          name="regEmail" 
                          type="email" 
                          placeholder="Enter email" 
                          onChange={onFormChange} 
                          required
                          isInvalid={emailError}/>
                        {/* Email Form Error */}
                        <Form.Control.Feedback type="invalid">
                          Email Taken
                      </Form.Control.Feedback> 
                      </Form.Group>
                    </Col>
                  </Row>
                  {/* Password Form */}
                  <Row>
                    <Col style={{display:'flex', justifyContent:'center'}}>
                      <Form.Group className="mb-3" controlId="regPassword" 
                                  style={{width:'80%'}}>
                        <Form.Label style={{display:'flex'}}>Password</Form.Label>
                        <Form.Control 
                          name="regPw" 
                          type="password" 
                          placeholder="Password" 
                          onChange={onFormChange} 
                          required
                          isInvalid={passwordError}/>
                        {/* Password Form Error */}
                        <Form.Control.Feedback type="invalid">
                          Password must be at least length 8
                        </Form.Control.Feedback> 
                      </Form.Group>
                    </Col>
                  </Row>
                  {/* Confirm Password Form */}
                  <Row>
                    <Col style={{display:'flex', justifyContent:'center'}}>
                      <Form.Group className="mb-3" controlId="regConfPassword" 
                                  style={{width:'80%'}}>
                        <Form.Label style={{display:'flex'}}>
                          Confirm Password
                        </Form.Label>
                        <Form.Control 
                          name="regConfPw" 
                          type="password" 
                          placeholder="Password" 
                          onChange={onFormChange} 
                          required
                          isInvalid={confPasswordError}/>
                      {/* Confirm Password Error */}
                      <Form.Control.Feedback type="invalid">
                          Passwords does not match
                      </Form.Control.Feedback> 
                      </Form.Group>
                      
                    </Col>
                  </Row>
                  {/* Type of Account */}
                  <Row>
                    <Col style={{display:'flex', justifyContent:'center'}}>
                      <Form.Group className="mb-3" controlId="regType" 
                                    style={{width:'80%'}}>
                        <Form.Label style={{display:'flex'}}>Type</Form.Label>
                        <Form.Select 
                          name="regType" 
                          onChange={onFormChange} 
                          placeholder="Account Type" 
                          required
                          isInvalid={typeError}
                          >
                          <option value="Individual">Individual</option>
                          <option value="Business">Business</option>
                        </Form.Select>
                        {/* Type of Account Error */}
                        <Form.Control.Feedback type="invalid">
                          Please select an account type
                      </Form.Control.Feedback> 
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    {/* Dropzone for Image Dropdown */}
                    <Col style={{display:'flex', justifyContent:'center'}}>
                      <Dropzone
                            getUploadParams={fileParams}
                            onChangeStatus={onFileChange}
                            accept="image/*"
                            maxFiles={1}
                            inputContent="Drop a file for your Profile Picture"
                            styles={{
                                dropzone: { width: '80%', height: 100, 
                                            marginTop:'1%' },
                                dropzoneActive: { borderColor: 'green' },
                            }}            
                        />
                    </Col>
                  </Row>
                  <Button variant="primary" type="submit" 
                          style={{marginTop:'3%'}}>
                    Submit
                  </Button>
                  {/* Area for user to submit */}
                  <h5 style={{paddingTop:'5%'}}>
                    Have an account already? <span 
                    className='logRegText'
                    onClick={()=>{
                      setStatus('login')
                    }}>
                      Login Now
                    </span>
                  </h5>
              </Container>
            </Form>
          }
          </div>
          </Col>
        </Row>
      </Container>
  );
}
  
export default Login;