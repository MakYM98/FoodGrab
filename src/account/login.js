import './account.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Login() {




    return (
        <Container className="vh-100 d-flex flex-column" fluid style={{margin:0, padding:0, alignContent:'center'}}>
          <Row className="h-100" style={{padding:0,margin:0}}>
            {/* Area that Slides */}
            <Col className='align-items-center' id="imageCol" xs={6} style={{padding:0, display:'grid'}}> 
              <Container>
                {/* Email Form */}
                <Row>
                  <h1 style={{marginBottom:'5%'}}>Create Account</h1>
                    <Col style={{display:'flex', justifyContent:'center'}}>
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
                  <h1>Login</h1>
                    <Col style={{display:'flex', justifyContent:'center'}}>
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
                  <Row>
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