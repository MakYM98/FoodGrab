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
import { Button } from 'react-bootstrap';

function OtherProfile(props) {
    // States for Other User's Profile
    const [latestListing, setLatestListing] = useState([])
    const [latestReview, setLatestReview] = useState([])
    const routerLoc = useLocation()
    const [accountDetails, setAccountDetails] = useState({
        username:'',
        rating:0,
        type:''
    })
    const[account, setAccount] = useState(
                                    JSON.parse(localStorage.getItem("account")))
    const [following, setFollowing] = useState(false)
    const navigate = useNavigate()
    
    // Initial Render
    useEffect(()=>{
        // If user_id same as logged in user, go back to user profile
        if(routerLoc.state.user_id == account.user_id){
            navigate('/profile')
        }
        // Initial Data Fetching
        checkFollowing()
        fetchUserDetails()
        fetchReviews()
        fetchListings()
    },[])

    // Fetch latest User's Listings
    const fetchListings = async () => {
        // GET Query Parameters
        var params = new URLSearchParams();
        params.append('user', routerLoc.state.user_id)
        var queryString = "http://127.0.0.1:8000/api/user_listing"
        axios
            .get(queryString,{
              params:params
            })
            .then(response => {
              // Update state with latest Listings
              setLatestListing(response.data)
            })
            .catch(error => console.error(`Error retrieving Login Info: ${error}`))
    }
    // Check if Logged in User is following this User
    const checkFollowing = async () => {
        // GET Query Parameters
        var params = new URLSearchParams();
        params.append('follower', account.user_id)
        params.append('followee', routerLoc.state.user_id)
        var queryString = "http://127.0.0.1:8000/api/check_follow"
        axios
            .get(queryString,{
              params:params
            })
            .then(response => {
                // If response returns empty array, means not following
                if(response.data == 0) {
                    setFollowing(false)
                }else{
                    setFollowing(true)
                }
            })
            .catch(error => console.error(`Error retrieving Login Info: ${error}`))
    }
    // Fetch latest User's Reviews
    const fetchReviews = async () => {
        // GET Query Parameters
        var params = new URLSearchParams();
        params.append('user', routerLoc.state.user_id)
        var queryString = "http://127.0.0.1:8000/api/review"
        axios
            .get(queryString,{
              params:params
            })
            .then(response => {
              // Update State with latest reviews
              setLatestReview(response.data)
            })
            .catch(error => console.error(`Error retrieving Login Info: ${error}`))
    }
    // Fetch User's Information
    const fetchUserDetails = async () => {
        // GET Query Parameters
        var params = new URLSearchParams();
        params.append('user', routerLoc.state.user_id)
        var queryString = "http://127.0.0.1:8000/api/profile"
        axios
            .get(queryString,{
              params:params
            })
            .then(response => {
              // Update State with User Details
              setAccountDetails(response.data)
            })
            .catch(error => console.error(`Error retrieving Login Info: ${error}`))
    }
    // Function to Follow this user
    const postFollow = (follow) => {
        var queryString = "http://127.0.0.1:8000/api/follow"
        axios
            .post(queryString,{
                follower: account.user_id,
                followee:routerLoc.state.user_id,
                follow: follow
            })
            .then(response => {
            //   Update State to show that Logged In User is following this User
              setFollowing(follow)
            })
            .catch(error => console.error(`Error retrieving Login Info: ${error}`))
    }


    return (
       <div style={{marginTop:'2%',marginBottom:'2%'}}>
            <Container style={{maxWidth:'none'}}>
                <Row>
                    <Col xs={3} style={{marginTop:'3%'}}>
                    {/* Check if User has a profile Image */}
                    <img 
                        src={
                            accountDetails['img'] === null |
                            accountDetails['img'] === undefined | 
                            account.img=='/media/undefined'? 
                            Avatar
                            :
                            `http://127.0.0.1:8000${accountDetails['img']}`
                        }
                        id="userProfImg"
                        />
                    {/* User's Username */}
                    <h1 id="usernameText">
                        {accountDetails.username}
                    </h1>
                    {/* User's Rating */}
                    <div>
                        <Rating rating={accountDetails.rating}/>
                    </div>
                    {/* User's Account Type */}
                    <h5 id="typeText">
                        {accountDetails.type.name}
                    </h5>
                    {/* Check if Logged in User is Following this User*/}
                    {  
                        // Depending on situation, give different Buttons.
                        following==true?
                            <Button onClick={()=>{postFollow(false)}}>
                                Following
                            </Button>
                        :
                            <Button onClick={()=>{postFollow(true)}}>
                                Follow
                            </Button>
                        }
                    
                    </Col>
                    <Col xs={9} style={{padding:0}}>
                    {/* User's Recent Listings */}
                    <div>
                        <h1 style={{textAlign:"left"}}>Recent Listings</h1>
                        <div style={{display:'flex', justifyContent:'start'}}>
                        {/* Check if user has listed anything */}
                        {
                                // Depending on situation, show listing/text
                                latestListing.length == 0? 
                                <h5>User has not posted any listing yet</h5>
                                :
                                latestListing.map(listing => 
                                    <div style={{paddingRight:'10px'}}>
                                        <ListingCard 
                                            user_id={listing["seller"]['user_id']} 
                                            name={listing["seller"]['username']} 
                                            title={listing["title"]} 
                                            description={listing["description"]}
                                            price={listing["price"]} 
                                            location={listing["location"]} 
                                            image={listing["image"]} 
                                            id={listing["listing_id"]}/>
                                    </div>
                            )}
                        </div>
                    </div>
                    </Col>
                </Row>
                {/* User's Received Reviews */}
                <Row>
                    <Col xs={3} style={{marginTop:'3%'}}>
                    </Col>
                    <Col xs={9}>
                    <div style={{marginTop:'3%'}}>
                        <h1 style={{textAlign:"left"}}>User Reviews</h1>
                        <div style={{display:'flex', justifyContent:'start'}}>
                            {/* Check if User has received any reviews */}
                            {latestReview.length == 0? 
                                <h5>User has not receive any reviews yet</h5>
                                :
                                latestReview.map(listing => 
                                    <div style={{paddingRight:'10px'}}>
                                        <ReviewCard
                                            user={listing['reviewer_id']['username']}
                                            rating={listing['rating']}
                                            comment={listing['comment']}
                                        />
                                    </div>
                                    
                            )}
                        </div>
                    </div>
                    </Col>
                </Row>
            </Container>
       </div>
    );
  }
  
  export default OtherProfile;