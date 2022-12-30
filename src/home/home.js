import HomeCarousel from "./home_carousel";
import Nearby from "./home_nearby";
import ListingCard from "../global/listing_card";
import Slider from "react-slick";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { CardGroup } from "react-bootstrap";

var listingData = require('../data/test_listing.json')['listings']
var first6Listings = listingData.slice(0, 7);

function Home() {

    var settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4,
      initialSlide: 0,
    };

    return (
      <div style={{marginTop:'1%', marginBottom:'5%'}}>
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
                {
                  first6Listings.map(listing => 
                      <ListingCard name={listing["name"]} title={listing["title"]} description={listing["description"]}
                                  price={listing["price"]} location={listing["location"]} id={listing["id"]}/>
                  )
                }
              </Slider>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
  
  export default Home;