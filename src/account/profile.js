import {useLayoutEffect, useRef, useState, useEffect} from 'react';
import './account.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import ListingCard from "../global/listing_card";
import ReviewCard from "../global/review_card";
import Avatar from '../img/img_avatar.png'
import { useLocation } from "react-router-dom";
import Rating from '../global/rating_system';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Dropzone from 'react-dropzone-uploader'
import 'react-dropzone-uploader/dist/styles.css'
import EditProfileModal from './edit_profile_modal'

function Profile(props) {
    // State for Logged In Users
    const ref = useRef(null);
    const [latestListing, setLatestListing] = useState([])
    const [latestReview, setLatestReview] = useState([])
    const [account, setAccount] = useState(JSON.parse(localStorage.getItem("account")))
    const [accountDetails, setAccountDetails] = useState({
        username:'',
        rating:0,
        type:''
    })
    const [editVisible, setEditVisible] = useState(false)

    // Initial Render, Query for User's Details/Reviews/Listings
    useEffect(()=>{
        fetchUserDetails()
        fetchReviews()
        fetchListings()
    },[])

    // Detect if User's Details have changed
    useEffect(()=>{
        // Update Local Storage 
        localStorage.setItem('account', JSON.stringify({
            user_id:accountDetails.user_id,
            username:accountDetails.username,
            img:accountDetails.img
        }));
        // Trigger Window Event
        window.dispatchEvent(new Event("storage"));
    },[accountDetails])

    // Control whether Edit Modal visible
    const openEdit = (visible) => {
        setEditVisible(visible)
    }

    // Query for User's Listings
    const fetchListings = async () => {
        // Get Query Parameters
        var params = new URLSearchParams();
        params.append('user', account.user_id)
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

    // Query for User's Reviews
    const fetchReviews = async () => {
        // Get Query Parameters
        var params = new URLSearchParams();
        params.append('user', account.user_id)
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

    // Query for User's Details
    const fetchUserDetails = async () => {
        // Get Query Parameters
        var params = new URLSearchParams();
        params.append('user', account.user_id)
        var queryString = "http://127.0.0.1:8000/api/profile"
        axios
            .get(queryString,{
              params:params
            })
            .then(response => {
              setAccountDetails(response.data)
            })
            .catch(error => console.error(`Error retrieving Login Info: ${error}`))
    }

    return (
       <div style={{marginTop:'2%',marginBottom:'2%'}}>
            <Container style={{maxWidth:'none'}}>
                <Row>
                    <Col xs={3} style={{marginTop:'3%'}}>
                        {/* User Profile Image */}
                        <img 
                            src={
                                // Check if User has Profile Image
                                accountDetails['img'] === null | 
                                accountDetails['img'] === undefined | 
                                account.img=='/media/undefined'?
                                Avatar
                                :
                                `http://127.0.0.1:8000${accountDetails['img']}`
                            } 
                            id="userProfImg"
                        />
                        <h1 id="usernameText">
                            {accountDetails.username}
                        </h1>
                        <div style={{marginTop:'1%'}}>
                            <Rating rating={accountDetails.rating}/>
                        </div>
                        <h5 id="typeText">
                            {accountDetails.type.name}
                        </h5>
                        {/* Button to open Edit Modal */}
                        <Button onClick={()=>{setEditVisible(true)}}>
                            Edit Profile
                        </Button>
                    </Col>
                    <Col xs={9} style={{padding:0}}>
                    <div>
                        <h1 style={{textAlign:"left"}}>Recent Listings</h1>
                        <div style={{display:'flex', justifyContent:'start'}}>
                        {/* Check if User has listed anything */}
                        {
                                // Depending on situation, show listings/text
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

                <Row>
                    <Col xs={3} style={{marginTop:'3%'}}></Col>
                    <Col xs={9} style={{padding:0}}>
                    <div style={{marginTop:'3%'}}>
                        
                        <h1 style={{textAlign:"left"}}>User Reviews</h1>
                        <div style={{display:'flex', justifyContent:'start'}}>
                            {/* Check if User has received any reviews */}
                            {latestReview.length == 0? 
                                // Depending on situation, show reviews/text
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
            <EditProfileModal 
                visible={editVisible} 
                openFunc={openEdit}
                fetchUser={fetchUserDetails}
                username={accountDetails.username}
                type={accountDetails.type.name}
                id={account.user_id}
            />
       </div>
    );
  }
  
  export default Profile;