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

function Profile(props) {
    const ref = useRef(null);
    const [latestListing, setLatestListing] = useState([])
    const [latestReview, setLatestReview] = useState([])
    const [account, setAccount] = useState(JSON.parse(localStorage.getItem("account")))
    const [accountDetails, setAccountDetails] = useState({
        username:'',
        rating:0,
        type:''
    })
    const [editProf, setEditProf] = useState(false)
    const [newAccDetails, setNewAccDetails] = useState({})
    const [imgFile, setImgFile] = useState()
    const [userNameError, setUserNameError] = useState(false)
    const [typeError, setTypeError] = useState(false)

    // Initial Render, Query for User's Details/Reviews/Listings
    useEffect(()=>{
        fetchUserDetails()
        fetchReviews()
        fetchListings()
    },[])

    const fileParams = ({ meta }) => {
        return { url: 'https://httpbin.org/post' }
    }

    const onFileChange = ({ meta, file }, status) => { 
        if (FileReader) {
            var fr = new FileReader();
            fr.readAsDataURL(file);
        }
        console.log(file)
        setImgFile(file)
    }

    const onFormChange = (e, updatedAt) => {
        const name = e.target.name;
        const value = e.target.value;
        setNewAccDetails({ ...newAccDetails, [name]: value });
    };

    // Query for User's Listings
    const fetchListings = async () => {
        var params = new URLSearchParams();
        params.append('user', account.user_id)
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

    // Query for User's Reviews
    const fetchReviews = async () => {
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
        var params = new URLSearchParams();
        params.append('user', account.user_id)
        var queryString = "http://127.0.0.1:8000/api/profile"
        axios
            .get(queryString,{
              params:params
            })
            .then(response => {
                console.log(response.data)
              setAccountDetails(response.data)
              
            })
            .catch(error => console.error(`Error retrieving Login Info: ${error}`))
    }

    const updateFormValidation = async () => {
        var formPassed = true
        var params = new URLSearchParams();
        params.append('username',newAccDetails.newUser)
        var userQuery = "http://127.0.0.1:8000/api/edit_profile"
        axios
            .get(userQuery, {params:params})
            .then(response => {
              const checkUsername = response.data.find((e) => e.username == newAccDetails.newUser)
    
              if(checkUsername){
                setUserNameError(true)
                formPassed = false
              }else{
                setUserNameError(false)
              }
    
              if(formPassed){
                var newUsername = newAccDetails.newUser===undefined? account.username: newAccDetails.newUser
                var newType = newAccDetails.newType===undefined? accountDetails['type']['name']: newAccDetails.newType
                let form_data = new FormData();
                form_data.append('image', imgFile);
                form_data.append('username',newUsername);
                form_data.append('user_id',account.user_id);
                form_data.append('type',newType);
                var queryString = "http://127.0.0.1:8000/api/update_profile"
                console.log(imgFile)
                axios
                  .post(queryString,form_data)
                  .then(response => {
                    console.log(response)
                    if(response.status == 200){
                      setEditProf(false)
                        var updatedAcc = {
                            user_id:account.user_id,
                            username:newUsername,
                        }
                        fetchUserDetails()
                        localStorage.setItem('account', JSON.stringify(updatedAcc));
                        window.dispatchEvent(new Event("storage"));
                    }
                  })
                  .catch(error => console.error(`Error retrieving Registering: ${error}`))
              }
            })
            .catch(error => console.error(`Error retrieving Registering: ${error}`))
      }

    const updateAcc = async (e) => {
        e.preventDefault();
        updateFormValidation()
    }


    return (
       <div style={{marginTop:'2%',marginBottom:'2%'}}>
            {
                editProf? 
                <Container style={{maxWidth:'none'}}>
                <Row>
                    <Col xs={3} style={{marginTop:'3%'}}>
                        <img 
                        src={
                            accountDetails['img'] === null? Avatar:`http://127.0.0.1:8000${accountDetails['img']}`
                        } 
                        style={{borderRadius:"50%", height:'70%',width:'70%'}}
                        />
                        <h1 style={{display:'block', margin:'auto', textAlign:'center'}}>
                            {accountDetails.username}
                        </h1>
                        <div>
                            <Rating rating={accountDetails.rating}/>
                        </div>
                        <h5 style={{display:'block', margin:'auto', textAlign:'center'}}>
                            {accountDetails.type.name}
                        </h5>
                        <h5 onClick={()=>{setEditProf(true)}}>
                            Edit Profile
                        </h5>
                    </Col>
                    <Col xs={9} style={{padding:0}}>
                <Form onSubmit={updateAcc}>
                <Container>
                    {/* Username Form */}
                    <Row>
                      <h1 style={{marginBottom:'5%'}}>Edit Profile</h1>    
                      <Col style={{display:'flex', justifyContent:'center'}} ref={ref}>
                        <Form.Group className="mb-3" controlId="newUser" style={{width:'80%', textAlign:'left'}}>
                          <Form.Label style={{display:'flex'}}>Username</Form.Label>
                          <Form.Control 
                            name="newUser" 
                            type="text" 
                            placeholder="Enter username" 
                            defaultValue={accountDetails.username}
                            onChange={onFormChange} 
                            required
                            isInvalid={userNameError}/>
                          <Form.Control.Feedback type="invalid">
                            Username Taken
                        </Form.Control.Feedback>  
                        </Form.Group>
                      </Col>
                    </Row>
                    {/* Type of Account */}
                    <Row>
                      <Col style={{display:'flex', justifyContent:'center'}}>
                        <Form.Group className="mb-3" controlId="newType" style={{width:'80%'}}>
                          <Form.Label style={{display:'flex'}}>Type</Form.Label>
                          <Form.Control 
                            as="select" 
                            name="newType" 
                            onChange={onFormChange} 
                            defaultValue={accountDetails.type.name}
                            placeholder="Account Type" 
                            required
                            isInvalid={typeError}
                            >
                            <option key='blankChoice' hidden value />
                            <option value="individual">Individual</option>
                            <option value="business">Business</option>
                          </Form.Control>
                          <Form.Control.Feedback type="invalid">
                            Please select an account type
                        </Form.Control.Feedback> 
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                        <Col>
                        <Dropzone
                            getUploadParams={fileParams}
                            onChangeStatus={onFileChange}
                            accept="image/*"
                            maxFiles={1}
                            inputContent="Drop A File"
                            styles={{
                                dropzone: { width: '100%', height: 200, marginTop:'1%' },
                                dropzoneActive: { borderColor: 'green' },
                            }}            
                        />
                        </Col>
                    </Row>
                    <Button variant="primary" type="submit">
                      Submit
                    </Button>
                </Container>
              </Form>
                    </Col>
                </Row>
            </Container>
                :
                <Container style={{maxWidth:'none'}}>
                <Row>
                    <Col xs={3} style={{marginTop:'3%'}}>
                        <img 
                            src={
                                accountDetails['img'] === null? Avatar:`http://127.0.0.1:8000${accountDetails['img']}`
                            } 
                            style={{borderRadius:"50%", height:'300px',width:'300px'}}
                        />
                        <h1 style={{display:'block', margin:'auto', textAlign:'center'}}>
                            {accountDetails.username}
                        </h1>
                        <div>
                            <Rating rating={accountDetails.rating}/>
                        </div>
                        <h5 style={{display:'block', margin:'auto', textAlign:'center'}}>
                            {accountDetails.type.name}
                        </h5>
                        <h5 onClick={()=>{setEditProf(true)}}>
                            Edit Profile
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
            }
       </div>
    );
  }
  
  export default Profile;