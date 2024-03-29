import React, {useState} from 'react';
import Table from 'react-bootstrap/Table';
import ListingCard from '../global/listing_card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListingImage from '../img/login.jpg'
import {BiUser} from 'react-icons/bi';
import {ImLocation} from 'react-icons/im';
import {SiGooglemybusiness} from 'react-icons/si';
import { useLocation, useNavigate } from "react-router-dom";
import { BsStarFill} from 'react-icons/bs';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { Button } from 'react-bootstrap';
import DeleteModal from "./confirm_delete.js";

function IndvListing() {
    // States for Individual Listings
    const [account, setAccount] = useState(JSON.parse(localStorage.getItem("account")))
    const [deleteVisible, setDeleteVisible] = useState(false)
    // Get details from previous page
    const routerLoc = useLocation()
    // Create Navigation Object
    const navigate = useNavigate()

    // Navigate to Chat Page and Create Chat
    const chatFunc = () => {
        if(localStorage.getItem('account') !== null){
            navigate('/chats', {
                state:{
                  seller_id:routerLoc.state.user_id,
                  user_id: account.user_id,
                  listing_id:routerLoc.state.listing_id,
                }
              });
        }
    }
    // Navigate to Seller's Profile Page
    const profileFunc = () => {
        navigate(`/profile/${routerLoc.state.user_name}`, {
            state:{
                username:routerLoc.state.user_name,
                user_id: routerLoc.state.user_id,
                type: routerLoc.state.user_type,
                rating:routerLoc.state.user_rating,
            }
            });
        
    }

    // Open Delete Modal
    const openDelete = (visible) => {
        setDeleteVisible(visible)
    }

    return (
      <div style={{display:'flex', justifyContent:'center', marginTop:'1%', height:'800px'}}>
        <div style={{width:'100%'}}>
        <Container style={{maxWidth:'none'}}>
            <h4 id="backButton"onClick={()=>{navigate('/listings')}}>
                <AiOutlineArrowLeft/>Back
            </h4>
            <Row>
                {/* Listing Image */}
                <Col style={{borderRight:"1px solid #eae8e4"}}>
                    <img
                        className="d-block w-100"
                        src={`http://127.0.0.1:8000${routerLoc.state.image}`}
                        alt="First slide"
                        height='750px'
                        />
                </Col>
                {/* Listing Details */}
                <Col>
                    {/* Listing Title */}
                    <h3 style={{textAlign:'left', borderBottom:'1px solid #eae8e4'}}>
                        {routerLoc.state.title}
                    </h3>
                    {/* Listing Description */}
                    <div>
                        <h4 style={{textAlign:'left'}}>Description</h4>
                        <p style={{textAlign:'left', marginBottom:'25%'}}>
                            {routerLoc.state.description}
                        </p>
                    </div>
                    {/* Listing Seller Details */}
                    <div style={{border:'1px solid #eae8e4'}}>
                        <div style={{padding:'1%'}}>
                            <h4 style={{textAlign:'left'}}>Seller</h4>
                            <div >
                                <div >
                                    <p style={{textAlign:'left'}} >
                                        {/* User Profile */}
                                        <span onClick={profileFunc} 
                                                style={{cursor:'pointer'}}>
                                            <BiUser size={28}/>
                                            User: {routerLoc.state.user_name}
                                            ({routerLoc.state.user_rating}
                                                <BsStarFill size={14}
                                                style={{marginBottom:'1%'}}/>)
                                        </span>
                                        {/* Location to collect */}
                                        <span style={{marginLeft:'5%'}}>
                                            <ImLocation size={28}/>
                                            Location: {routerLoc.state.location}
                                        </span>
                                        {/* Listing Price */}
                                        <span style={{marginLeft:'5%'}}>
                                            Price: ${routerLoc.state.price}
                                        </span>
                                    </p>
                                    <p style={{textAlign:'left'}}>
                                </p>
                                </div>
                                {/* Check if seller is logged in user */}
                                {
                                    routerLoc.state.user_id == account.user_id?
                                    <Button onClick={()=>{openDelete(true)}} variant="danger">
                                        Delete Listing
                                    </Button>
                                    :
                                    <Button onClick={chatFunc}>
                                        Chat Now
                                    </Button>
                                }
                                
                            </div>
                        </div>
                        
                    </div>
                </Col>
            </Row>
        </Container>
        
        {/* Delete Modal */}
        {
            routerLoc.state.user_id == account.user_id?
            <DeleteModal 
                visible={deleteVisible} 
                listing={routerLoc.state.listing_id}
                openFunc={openDelete}/>
            :
            <div></div>
        }
            
            
        </div>
      </div>
    )
  }

  export default IndvListing
