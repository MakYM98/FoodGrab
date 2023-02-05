import {useLayoutEffect, useRef, useState, useEffect} from 'react';
import './account.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListingCard from "../global/listing_card";
import ReviewCard from "../global/review_card";
import Avatar from '../img/img_avatar.png'
import { useLocation } from "react-router-dom";
import Rating from '../global/rating_system';
import axios from 'axios';

var listingData = require('../data/test_listing.json')['listings']
var first4Listings = listingData.slice(0, 3);


function Profile(props) {
    const [latestListing, setLatestListing] = useState([])
    const [latestReview, setLatestReview] = useState([])
    const routerLoc = useLocation()

    useEffect(()=>{
        fetchReviews()
        fetchListings()
    },[])

    const fetchListings = async () => {
        var params = new URLSearchParams();
        params.append('user', routerLoc.state.user_id)
        var queryString = "http://127.0.0.1:8000/api/user_listing"
        axios
            .get(queryString,{
              params:params
            })
            .then(response => {
              setLatestListing(response.data)
            })
            .catch(error => console.error(`Error retrieving Login Info: ${error}`))
    }

    const fetchReviews = async () => {
        var params = new URLSearchParams();
        params.append('user', routerLoc.state.user_id)
        var queryString = "http://127.0.0.1:8000/api/review"
        axios
            .get(queryString,{
              params:params
            })
            .then(response => {
              setLatestReview(response.data)
            })
            .catch(error => console.error(`Error retrieving Login Info: ${error}`))
    }


    return (
       <div style={{marginTop:'2%',marginBottom:'2%'}}>
            <Container>
                <Row>
                    <Col xs={3} style={{marginTop:'3%'}}>
                    <img src={Avatar} style={{borderRadius:"50%", height:'50%',width:'70%'}}/>
                    <h1 style={{display:'block', margin:'auto', textAlign:'center'}}>
                        {routerLoc.state.username}
                    </h1>
                    <div>
                        <Rating rating={routerLoc.state.rating}/>
                    </div>
                        <h5 style={{display:'block', margin:'auto', textAlign:'center'}}>User's Details</h5>
                    </Col>
                    <Col xs={9}>
                    <div>
                        <h1 style={{textAlign:"left"}}>Recent Listings</h1>
                        <Container>
                            <Row>
                            {
                                latestListing.map(listing => 
                                    <Col xs={3} style={{marginRight:'7%'}}>
                                        <ListingCard 
                                            name={listing["seller"]['username']} 
                                            title={listing["title"]} 
                                            description={listing["description"]}
                                            price={'$' + String(listing["price"])} 
                                            location={listing["location"]} 
                                            id={listing["listing_id"]}/>
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
                                latestReview.map(listing => 
                                    <Col xs={3} style={{marginRight:'7%'}}>
                                        <ReviewCard
                                            user={listing['reviewer_id']['username']}
                                            rating={listing['rating']}
                                            comment={listing['comment']}
                                        />
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