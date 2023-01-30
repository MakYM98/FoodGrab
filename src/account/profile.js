import './account.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListingCard from "../global/listing_card";
import ReviewCard from "../global/review_card";
import Avatar from '../img/img_avatar.png'

var listingData = require('../data/test_listing.json')['listings']
var first4Listings = listingData.slice(0, 3);


function Profile(props) {

    return (
       <div style={{marginTop:'2%',marginBottom:'2%'}}>
            <Container>
                <Row>
                    <Col xs={3} style={{marginTop:'3%'}}>
                    <img src={Avatar} style={{borderRadius:"50%", height:'50%',width:'70%'}}/>
                    <h1 style={{display:'block', margin:'auto', textAlign:'center'}}>User's Name</h1>
                        <h5 style={{display:'block', margin:'auto', textAlign:'center'}}>User's Rating</h5>
                        <h5 style={{display:'block', margin:'auto', textAlign:'center'}}>User's Details</h5>
                    </Col>
                    <Col xs={9}>
                    <div>
                        <h1 style={{textAlign:"left"}}>Recent Listings</h1>
                        <Container>
                            <Row>
                            {
                                first4Listings.map(listing => 
                                    <Col xs={3} style={{marginRight:'7%'}}>
                                        <ListingCard name={listing["name"]} title={listing["title"]} description={listing["description"]}
                                                price={listing["price"]} location={listing["location"]} id={listing["id"]}/>
                                    </Col>
                                    
                            )}
                            </Row>
                        </Container>
                    </div>
                    </Col>
                </Row>

                <Row>
                    <Col xs={3} style={{marginTop:'3%'}}>
                    </Col>
                    <Col xs={9}>
                    <div style={{marginTop:'3%'}}>
                        <h1 style={{textAlign:"left"}}>User Reviews</h1>
                        <Container>
                            <Row>
                            {
                                first4Listings.map(listing => 
                                    <Col xs={3} style={{marginRight:'7%'}}>
                                        <ReviewCard/>
                                    </Col>
                                    
                            )}
                            </Row>
                        </Container>
                    </div>
                    </Col>
                </Row>
            </Container>
       </div>
    );
  }
  
  export default Profile;