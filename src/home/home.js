import HomeCarousel from "./home_carousel";
import Nearby from "./home_nearby";
import ListingCard from "../global/listing_card";
import Slider from "react-slick";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { CardGroup } from "react-bootstrap";

function Home() {

    const slideLeft = () => {
        var slider = document.getElementById('slider');
        slider.scrollLeft = slider.scrollLeft - 500;
    }

    var settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4,
      initialSlide: 0,
    };

    return (
      <div style={{marginTop:'1%'}}>
        <Container>
          <Row>
            <Col>
              <HomeCarousel/>
            </Col>
          </Row>
          <Row style={{marginTop:'3%'}}>
            <Col>
            <h5 style={{textAlign:'left'}}>Discounted Food Near You</h5>
              <Slider {...settings}>
                <ListingCard/>
                <ListingCard/>
                <ListingCard/>
                <ListingCard/>
                <ListingCard/>
              </Slider>
            </Col>
          </Row>
        </Container>
        {/* <Nearby/> */}
      </div>
    );
  }
  
  export default Home;