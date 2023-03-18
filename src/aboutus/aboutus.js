import React from 'react';
import './aboutus.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AboutUs1 from '../img/aboutus1.png'
import AboutUs2 from '../img/aboutus2.png'
import AboutUs3 from '../img/test.png'
import AboutUs4 from '../img/aboutus4.png'
import { useNavigate } from "react-router-dom";

function AboutUs() {
  // Create useNavigation Object
  const navigate = useNavigate()
  // Redirect Users to Login Page
  function redirect(){
    navigate('/login', {
      state:{
        type:'register'
      }
    });
  }

  return (
    <div style={{height:'100%',backgroundColor:'#d5ecd5'}}>
    <Container style={{maxWidth:'none', height:'100%'}}>
      {/* First Row */}
      <Row >
      {/* Left Column that contains Description (1) */}
      <Col xs={5} style={{display:'flex', justifyContent:'left', 
                          alignItems:'center',marginLeft:'5%'}}>
          <div>
            <div style={{textAlign:'left', marginRight:'5%'}}>
            <p>About Us</p>
              <h1 style={{textAlign:'left', fontSize: 40}}>
                Giving individuals and businesses a platform to donate or sell
                their leftovers.
              </h1>
              <h5 id="homeSubtitle">
                FoodGrab is a web application that aims to provide individuals
                and businesses a platform where they are able to donate or 
                sell their leftover ingredients or food. Through this
                platform, we hope to help fight against Food Wastage problems
                that is prevalent in many countries today. We believe that
                every food matter and that every individual's effort will 
                have a major impact on the food wastage issue.
                
                {/*  */}
                </h5>
            </div>
          </div>
        </Col>
        {/* Right Column that contains row image (1) */}
        <Col style={{display:'flex', justifyContent:'end'}}>
          <div className='aboutUsImgColDiv'>
            <img
              className="d-block w-100"
              src={AboutUs3}
              alt="First slide"
            />
          </div>
        </Col>
      </Row>
      {/* Second Row */}
      <Row style={{backgroundColor:'white'}} >
      {/* Left Column that contains row image (2) */}
      <Col style={{display:'flex', justifyContent:'start'}}>
          <div className='aboutUsImgColDiv'>
            <img
              className="d-block w-100"
              src={AboutUs4}
              alt="First slide"
            />
          </div>
        </Col>
      {/* Right Column that contains Description (2) */}
      <Col xs={5} style={{display:'flex', justifyContent:'left', 
                            alignItems:'center',marginLeft:'5%'}}>
          <div>
            <div style={{textAlign:'right', marginRight:'5%'}}>
              <h1 style={{textAlign:'right', fontSize:50}}>Food Wastage</h1>
              
              <h5 id="homeSubtitle">
                Food wastage has been a huge issue in many countries for 
                many years and with the rising cost of living, many people 
                are unable to afford nutritious food. According to the 
                National Environment Agency in Singapore, more than 816,000 
                tons of food waste were generated. On a global scale, 
                1.3 billion tons of food were wasted in a year and it 
                accounted for a third of the world's food every year.
              </h5>
            </div>
          </div>
        </Col>
        
      </Row>
      {/* Third Row */}
      <Row>
        {/* Left Column that contains Description (3) */}
        <Col xs={5} style={{display:'flex', justifyContent:'left', 
                          alignItems:'center',marginLeft:'5%'}}>
          <div>
            <div style={{textAlign:'left', marginRight:'5%'}}>
              <h1 style={{textAlign:'left', fontSize:50}}>Our Approach</h1>
              
              <h5 id="homeSubtitle">
                The idea of this web application was to provide individuals
                and local businesses a platform where they are able to 
                sell surplus food and ingredients with a peace of mind and
                with ease. We provide the users with the flexibility to 
                decide on the location to collect and price of the product.
                This helps to eliminate the inconvenience of having to go to a
                specific location for collection and users will have access to
                nutritious food at an affordable price.
              </h5>
              <br/>
              <h5 id="homeSubtitle">
                Through flexibility and convenience of the application,
                we believe that users are more likely to sell or donate
                their leftovers and in turn, help to reduce food wastage 
                around the world. 
              </h5>
            </div>
          </div>
        </Col>
        {/* Right Column that contains row image (3) */}
        <Col style={{display:'flex', justifyContent:'end'}}>
          <div className='aboutUsImgColDiv'>
            <img
              className="d-block w-100"
              src={AboutUs2}
              alt="First slide"
            />
          </div>
        </Col>
      </Row>
      {/* Fourth Row */}
      <Row style={{backgroundColor:'white'}}>
      {/* Left Column that contains row image (4) */}
      <Col style={{display:'flex', justifyContent:'start'}}>
          <div className='aboutUsImgColDiv'>
            <img
              className="d-block w-100"
              src={AboutUs1}
              alt="First slide"
              style={{width:'100%'}}
            />
          </div>
          
        </Col>
        {/* Right Column that contains Description (4) */}
        <Col xs={5} style={{display:'flex', justifyContent:'left', 
                      alignItems:'center',marginLeft:'5%'}}>
          <div>
            <div style={{textAlign:'right', marginRight:'5%'}}>
              <h1 style={{textAlign:'right', fontSize:50}}>
                How does it benefit you?
              </h1>
              <h5 id="homeSubtitle">
                Our non-profitable application is completely free for all
                individuals and businesses to upload their leftover 
                ingredients and food, without any hidden fees and charges. By
                using this platform, users are able to recoup some of their 
                expenses by selling surplus food, while keeping prices low for
                other users. This will create a win-win situation for users as
                sellers are able to benefit from a cost-effective way to sell
                their surplus food and other users can enjoy nutritious food
                at an affordable price.
              </h5>
              {/* Span to that user can click to redirect. */}
              <h5 id="homeSubtitle">
                Click <span id="homeHere"
                  onClick={()=>{redirect()}}>
                    here
                  </span> to join us now!
              </h5>
            </div>
          </div>
        </Col>
      </Row>

    </Container>
  </div>
  )
}

export default AboutUs
