import './account.css'
import {useLayoutEffect, useRef, useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useLocation} from 'react-router-dom';

function Login(props) {
  const ref = useRef(null);
  const[columnWidth, setColumnWidth] = useState(0)
  const [positionLeft, setPositionLeft] = useState(true)

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
                
              </div>
              <Container>
                {/* Email Form */}
                <Row>
                  <h1 style={{marginBottom:'5%'}}>Create Account</h1>
                    <Col style={{display:'flex', justifyContent:'center'}} ref={ref}>
                      <Form.Group className="mb-3" controlId="formBasicEmail" style={{width:'80%'}}>
                        <Form.Label style={{display:'flex'}}>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                      </Form.Group>
                    </Col>
                  </Row>
                  {/* Password Form */}
                  <Row>
                    <Col style={{display:'flex', justifyContent:'center'}}>
                      <Form.Group className="mb-3" controlId="formBasicPassword" style={{width:'80%'}}>
                        <Form.Label style={{display:'flex'}}>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col style={{display:'flex', justifyContent:'center'}}>
                      <Form.Group className="mb-3" controlId="formBasicPassword" style={{width:'80%'}}>
                        <Form.Label style={{display:'flex'}}>Confirm Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
              </Container>
            </Col>
            {/* Login Form */}
            <Col className='align-items-center' style={{backgroundColor:'', paddingRight:0, paddingLeft:0, display:'grid'}} xs={6}>
              <Form>  
                <Container>
                  {/* Email Form */}
                  <Row>
                  <h1 style={{padding:0}}>Login</h1>
                    <Col style={{display:'flex', justifyContent:'center',padding:0}}>
                      <Form.Group className="mb-4" controlId="formBasicEmail" style={{width:'80%'}}>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                        <Form.Text className="text-muted">
                          We'll never share your email with anyone else.
                        </Form.Text>
                      </Form.Group>
                    </Col>
                  </Row>
                  {/* Password Form */}
                  <Row style={{width:'100%'}}>
                    <Col style={{display:'flex', justifyContent:'center'}}>
                      <Form.Group className="mb-3" controlId="formBasicPassword" style={{width:'80%'}}>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
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