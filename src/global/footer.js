import React, {useState} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { AiFillFacebook, AiFillInstagram, AiFillTwitterCircle,AiFillYoutube,AiFillLinkedin } from 'react-icons/ai';

function Footer(props) {

    return (
      <div style={{display:'flex', width:'100%', paddingLeft:'5%', paddingTop:'1%',backgroundColor:'#D3D3D3', paddingBottom:'2%'}}>
        <Container >
            <Row >
                <Col xs={6}>
                    {/* Company Name */}
                    <Row>
                        <Col style={{display:'flex', justifyContent:'start'}}>
                            <h1>FoodGrab</h1>
                        </Col>
                    </Row>
                    {/* Company Message */}
                    <Row>
                        <Col style={{display:'flex', justifyContent:'start', marginBottom:'5%'}}>
                            <h4>Reduce Food Waste, Earn A Dollar</h4>
                        </Col>
                    </Row>
                    {/* Social Media Area */}
                    <Row>
                        <Col style={{display:'flex', justifyContent:'start'}}>
                            <AiFillFacebook size={28}/>
                            <AiFillInstagram size={28}/>
                            <AiFillTwitterCircle size={28}/>
                            <AiFillYoutube size={28}/>
                            <AiFillLinkedin size={28}/>
                        </Col>
                    </Row>
                </Col>
                <Col style={{textAlign:'left'}} xs={3}>
                    <h5>More FoodGrab</h5>
                    <h6>About Us</h6>
                    <h6>Community Fridges</h6>
                    <h6>Food Listings</h6>
                </Col>
                <Col style={{textAlign:'left'}} xs={3}>
                    <h5>About FoodGrab</h5>
                    <h6>Terms of Use</h6>
                    <h6>Privacy Policy</h6>
                </Col>
            </Row>
            <Row style={{borderTop:'1px black solid', marginTop:'2%'}}>
                <Col style={{paddingTop:'2%'}}>
                    This is a Final Year Project create by Yeong Meng.
                </Col>
            </Row>
        </Container>
      </div>
    );
  }
  
  export default Footer;