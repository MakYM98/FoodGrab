import './account.css'
import {useLayoutEffect, useRef, useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useLocation} from 'react-router-dom';
import axios from 'axios';


function Login(props) {
  const ref = useRef(null);
  const [columnWidth, setColumnWidth] = useState(0)
  const [loginDetails, setLoginDetails] = useState({})
  const [positionLeft, setPositionLeft] = useState(true)


  const onFormChange = (e, updatedAt) => {
    const name = e.target.name;
    const value = e.target.value;
    setLoginDetails({ ...loginDetails, [name]: value });
  };

  const fetchLogin = async (e) => {
    e.preventDefault();
    var queryString = "http://localhost:4001/foodgrab/login"
          console.log(loginDetails)
    axios
        .post(queryString,{email:loginDetails.loginEmail, password:loginDetails.loginPw})
        .then(response => {
          if('status' in response.data){

          }else{
            //   window.location.href=`/account?id=${props.id}`          
          }
        })
        .catch(error => console.error(`Error retrieving Login Info: ${error}`))
  }

  const registerAcc = async (e) => {
    e.preventDefault();
    var queryString = "http://localhost:4001/foodgrab/register"
    axios
        .post(queryString,{username:loginDetails.regUser, 
                            email:loginDetails.regEmail, 
                            password:loginDetails.regPw,
                            type:loginDetails.regType})
        .then(response => {
            console.log(response)
        })
        .catch(error => console.error(`Error retrieving Registering: ${error}`))
  }

  useEffect(()=>{
    if(props.cover == 'login'){
      setPositionLeft(false)
    }else{
      setPositionLeft(true)
    }
  },[])

  function myMove() {
    setPositionLeft(!positionLeft)
  }

    return (
        <Container className="vh-100 d-flex flex-column" fluid style={{margin:0, padding:0, alignContent:'center'}}>
          <Row className="h-100" style={{padding:0,margin:0}}>
            {/* Area that Slides */}
            <Col className='align-items-center' xs={6} style={{padding:0, display:'grid'}}> 
              <div id="columnCover" className={positionLeft?'null':'right'} onClick={myMove}>
                {
                  positionLeft == true ?
                  <div style={{display:"table",height:'100%',width:'100%'}}>
                    <div style={{display:"table-cell",verticalAlign:'middle'}}>
                      <h1>Don't have an account?</h1>
                      <p>Click the button below to register for one now!</p>
                      <button className="btn btn-primary" onClick={myMove}>Register Now!</button>
                    </div>
                  </div>
                  :
                  <div style={{display:"table",height:'100%',width:'100%'}}>
                    <div style={{display:"table-cell",verticalAlign:'middle'}}>
                      <h1>Have an account already?</h1>
                      <p>Click the button below to login now!</p>
                      <button className="btn btn-primary" onClick={myMove}>Login</button>
                    </div>
                    
                  </div>
                }
              </div>
              <Form onSubmit={registerAcc}>
                <Container>
                    {/* Username Form */}
                    <Row>
                      <h1 style={{marginBottom:'5%'}}>Create Account</h1>
                      <Col style={{display:'flex', justifyContent:'center'}} ref={ref}>
                        <Form.Group className="mb-3" controlId="regUser" style={{width:'80%'}}>
                          <Form.Label style={{display:'flex'}}>Username</Form.Label>
                          <Form.Control name="regUser" type="text" placeholder="Enter username" onChange={onFormChange}/>
                        </Form.Group>
                      </Col>
                    </Row>
                    {/* Email Form */}
                    <Row>
                      <Col style={{display:'flex', justifyContent:'center'}} ref={ref}>
                        <Form.Group className="mb-3" controlId="regEmail" style={{width:'80%'}}>
                          <Form.Label style={{display:'flex'}}>Email address</Form.Label>
                          <Form.Control name="regEmail" type="email" placeholder="Enter email" onChange={onFormChange}/>
                        </Form.Group>
                      </Col>
                    </Row>
                    {/* Password Form */}
                    <Row>
                      <Col style={{display:'flex', justifyContent:'center'}}>
                        <Form.Group className="mb-3" controlId="regPassword" style={{width:'80%'}}>
                          <Form.Label style={{display:'flex'}}>Password</Form.Label>
                          <Form.Control name="regPw" type="password" placeholder="Password" onChange={onFormChange}/>
                        </Form.Group>
                      </Col>
                    </Row>
                    {/* Confirm Password Form */}
                    <Row>
                      <Col style={{display:'flex', justifyContent:'center'}}>
                        <Form.Group className="mb-3" controlId="regConfPassword" style={{width:'80%'}}>
                          <Form.Label style={{display:'flex'}}>Confirm Password</Form.Label>
                          <Form.Control name="regConfPw" type="password" placeholder="Password" onChange={onFormChange}/>
                        </Form.Group>
                      </Col>
                    </Row>
                    {/* Type of Account */}
                    <Row>
                      <Col style={{display:'flex', justifyContent:'center'}}>
                        <Form.Group className="mb-3" controlId="regType" style={{width:'80%'}}>
                          <Form.Label style={{display:'flex'}}>Type</Form.Label>
                          <Form.Control as="select" name="regType" onChange={onFormChange} placeholder="Account Type">
                            <option key='blankChoice' hidden value />
                            <option value="User">User</option>
                            <option value="Business">Business</option>
                          </Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Button variant="primary" type="submit">
                      Submit
                    </Button>
                </Container>
              </Form>
            </Col>
            {/* Login Form */}
            <Col className='align-items-center' style={{backgroundColor:'', paddingRight:0, paddingLeft:0, display:'grid'}} xs={6}>
              <Form onSubmit={fetchLogin}>  
                <Container>
                  {/* Email Form */}
                  <Row>
                  <h1 style={{padding:0}}>Login</h1>
                    <Col style={{display:'flex', justifyContent:'center',padding:0}}>
                      <Form.Group className="mb-4" controlId="loginEmail" style={{width:'80%'}}>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control name="loginEmail" type="email" placeholder="Enter email" onChange={onFormChange}/>
                        <Form.Text className="text-muted">
                          We'll never share your email with anyone else.
                        </Form.Text>
                      </Form.Group>
                    </Col>
                  </Row>
                  {/* Password Form */}
                  <Row style={{width:'100%'}}>
                    <Col style={{display:'flex', justifyContent:'center'}}>
                      <Form.Group className="mb-3" controlId="loginPassword" style={{width:'80%'}}>
                        <Form.Label>Password</Form.Label>
                        <Form.Control name="loginPw" type="password" placeholder="Password" onChange={onFormChange}/>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </Container>
              </Form>      
            </Col>
          </Row>
        </Container>
    );
  }
  
  export default Login;