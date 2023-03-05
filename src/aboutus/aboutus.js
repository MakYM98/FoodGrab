import React from 'react';
import AboutUsOne from '../img/aboutus1.jpg'
import './aboutus.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import HomeImg from '../img/home.png'
import HomeImg1 from '../img/home1.png'

function AboutUs() {
    return (
      <div style={{height:'100%',backgroundColor:'#d5ecd5'}}>
      <Container style={{maxWidth:'none', height:'100%'}}>
        <Row style={{backgroundColor:'white'}}>
        <Col style={{display:'flex', justifyContent:'start'}}>
            <div style={{width:'85%'}}>
              <img
                className="d-block w-100"
                src={HomeImg1}
                alt="First slide"
                style={{width:'533px', height:'800px'}}
              />
            </div>
            
          </Col>
          <Col xs={5} style={{display:'flex', justifyContent:'left', alignItems:'center',marginLeft:'5%'}}>
            {/* <HomeCarousel/> */}
            <div>
              <div style={{textAlign:'right', marginRight:'5%'}}>
                <h1 style={{textAlign:'right', fontSize:50}}>Food Wastage Problem</h1>
                <h5 id="homeSubtitle">
                  Food wastage has been a huge issue in many countries and 
                  with the rising cost of living, many people are unable to 
                  afford nutritious food. According to the National 
                  Environment Agency in Singapore, more than 816,000 tons of 
                  food waste were generated. On a global scale, 1.3 billion 
                  tons of food were wasted in a year and it accounted for a 
                  third of the world's food every year.</h5>
              </div>
            </div>
          </Col>
        </Row>

        <Row>
        <Col xs={5} style={{display:'flex', justifyContent:'left', alignItems:'center',marginLeft:'5%'}}>
            {/* <HomeCarousel/> */}
            <div>
              <div style={{textAlign:'left', marginRight:'5%'}}>
                <h1 style={{textAlign:'left', fontSize:50}}>Our Approach</h1>
                <h5 id="homeSubtitle">
                  The idea of this web application was to provide individuals
                  and local businesses a platform where they are able to 
                  sell surplus food and ingredients with a peace of mind and
                  with ease. We provide the users with the flexibility to 
                  decide on the location to collect and price of the product,
                  so there is no pressure of having to go to a certain place
                  and users are able to gain access to nutritious food at an
                  affordable price.
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
          <Col style={{display:'flex', justifyContent:'end'}}>
            {/* <HomeCarousel/> */}
            <div style={{width:'85%'}}>
              <img
                className="d-block w-100"
                src={HomeImg}
                alt="First slide"
                style={{width:'533px', height:'800px'}}
              />
            </div>
            
          </Col>
        </Row>

        <Row style={{backgroundColor:'white'}}>
        <Col style={{display:'flex', justifyContent:'start'}}>
            <div style={{width:'85%'}}>
              <img
                className="d-block w-100"
                src={HomeImg1}
                alt="First slide"
                style={{width:'533px', height:'800px'}}
              />
            </div>
            
          </Col>
          <Col xs={5} style={{display:'flex', justifyContent:'left', alignItems:'center',marginLeft:'5%'}}>
            {/* <HomeCarousel/> */}
            <div>
              <div style={{textAlign:'right', marginRight:'5%'}}>
                <h1 style={{textAlign:'right', fontSize:50}}>
                  How does it benefit you?
                </h1>
                <h5 id="homeSubtitle">
                  Our application is non-profitable and users do not have to
                  worry about incurring additional costs when they are
                  uploading their leftovers onto our application.
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
