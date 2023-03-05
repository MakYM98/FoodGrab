import React from 'react';
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

function IndvListing() {
    const routerLoc = useLocation()
    const navigate = useNavigate()

    const chatFunc = () => {
        var account = JSON.parse(localStorage.getItem("account"));
        console.log(routerLoc.state)
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

    const profileFunc = () => {
        console.log(routerLoc.state)
        navigate(`/profile/${routerLoc.state.user_name}`, {
            state:{
                username:routerLoc.state.user_name,
                type: routerLoc.state.user_type,
                rating:routerLoc.state.user_rating,
            }
            });
        
    }

    return (
      <div style={{display:'flex', justifyContent:'center', marginTop:'1%', height:'800px'}}>
        <div style={{width:'100%'}}>
        <Container style={{maxWidth:'none'}}>
        <h4 id="backButton"onClick={()=>{navigate('/listings')}}><AiOutlineArrowLeft/>Back</h4>
            <Row>
                
                <Col style={{borderRight:"1px solid #eae8e4"}}>
                    <img
                        className="d-block w-100"
                        src={`http://127.0.0.1:8000${routerLoc.state.image}`}
                        alt="First slide"
                        height='750px'
                        />
                </Col>
                
                <Col>
                    <h3 style={{textAlign:'left', borderBottom:'1px solid #eae8e4'}}>
                        {routerLoc.state.title}
                    </h3>
                    <div>
                        <h4 style={{textAlign:'left'}}>Description</h4>
                        <p style={{textAlign:'left', marginBottom:'25%'}}>
                            {routerLoc.state.description}
                        </p>
                    </div>
                    <div style={{border:'1px solid #eae8e4'}}>
                        <div style={{padding:'1%'}}>
                            <h4 style={{textAlign:'left'}}>Seller</h4>
                            <div >
                                <div >
                                    <p style={{textAlign:'left'}} >
                                        {/* User Profile */}
                                        <span onClick={profileFunc} style={{cursor:'pointer'}}>
                                            <BiUser size={28}/>
                                            User: {routerLoc.state.user_name}
                                            ({routerLoc.state.user_rating}
                                                <BsStarFill size={14}
                                                style={{marginBottom:'1%'}}/>)
                                        </span>
                                        {/* Account Type */}
                                        <span style={{marginLeft:'5%'}}>
                                            <SiGooglemybusiness size={28} />
                                            Type: {routerLoc.state.user_type}
                                        </span>
                                        <span style={{marginLeft:'5%'}}>
                                            <ImLocation size={28}/>
                                            Location: {routerLoc.state.location}
                                        </span>
                                        <span style={{marginLeft:'5%'}}>
                                            Price: ${routerLoc.state.price}
                                        </span>
                                    </p>
                                    <p style={{textAlign:'left'}}>
                                </p>
                                </div>
                                
                                
                                <a onClick={chatFunc}>Chat Now</a>
                            </div>
                        </div>
                        
                    </div>
                </Col>
            </Row>
        </Container>
        </div>
      </div>
    )
  }

  export default IndvListing
