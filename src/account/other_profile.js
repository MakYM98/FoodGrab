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
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function OtherProfile(props) {
    const [latestListing, setLatestListing] = useState([])
    const [latestReview, setLatestReview] = useState([])
    const routerLoc = useLocation()
    const [accountDetails, setAccountDetails] = useState({
        username:'',
        rating:0,
        type:''
    })
    const navigate = useNavigate()

    useEffect(()=>{
        var account = JSON.parse(localStorage.getItem("account"))
        if(routerLoc.state.user_id == account.user_id){
            navigate('/profile')
        }
        console.log(routerLoc.state)
        fetchUserDetails()
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
                console.log(response.data)
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

    const fetchUserDetails = async () => {
        var params = new URLSearchParams();
        params.append('user', routerLoc.state.user_id)
        var queryString = "http://127.0.0.1:8000/api/profile"
        axios
            .get(queryString,{
              params:params
            })
            .then(response => {
              setAccountDetails(response.data)
              console.log(response.data)
            })
            .catch(error => console.error(`Error retrieving Login Info: ${error}`))
    }


    return (
       <div style={{marginTop:'2%',marginBottom:'2%'}}>
            <Container style={{maxWidth:'none'}}>
                <Row>
                    <Col xs={3} style={{marginTop:'3%'}}>
                    <img src={Avatar} style={{borderRadius:"50%", height:'70%',width:'70%'}}/>
                    <h1 style={{display:'block', margin:'auto', textAlign:'center'}}>
                        {accountDetails.username}
                    </h1>
                    <div>
                        <Rating rating={accountDetails.rating}/>
                    </div>
                        <h5 style={{display:'block', margin:'auto', textAlign:'center'}}>
                        {accountDetails.type.name}
                        </h5>
                    </Col>
                    <Col xs={9} style={{padding:0}}>
                    <div>
                        <h1 style={{textAlign:"left"}}>Recent Listings</h1>
                        <Container style={{paddingLeft:0}}>
                            <Row>
                            {
                                latestListing.length == 0? 
                                <h5>User has not posted any listing yet</h5>
                                :
                                latestListing.map(listing => 
                                    <Col xs={3} style={{marginRight:'1%'}}>
                                        <ListingCard 
                                            user_id={listing["seller"]['user_id']} 
                                            name={listing["seller"]['username']} 
                                            title={listing["title"]} 
                                            description={listing["description"]}
                                            price={listing["price"]} 
                                            location={listing["location"]} 
                                            image={listing["image"]} 
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
                            {latestReview.length == 0? 
                                <h5>User has not receive any reviews yet</h5>
                                :
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
  
  export default OtherProfile;