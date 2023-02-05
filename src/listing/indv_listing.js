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
import { useLocation } from "react-router-dom";
import { MdOutlineReviews } from 'react-icons/md'
import Rating from '../global/rating_system';

function IndvListing() {
    const routerLoc = useLocation()

    return (
      <div style={{display:'flex', justifyContent:'center', marginTop:'3%', height:'600px'}}>
        <div style={{width:'80%'}}>
        <Container>
            <Row>
                <Col>
                    <img
                        className="d-block w-100"
                        src={ListingImage}
                        alt="First slide"
                        width='1500px'
                        height='500px'
                        />
                </Col>
                
                <Col>
                    <h3 style={{textAlign:'left'}}>
                        {routerLoc.state.title}
                    </h3>
                    <div>
                        <h4 style={{textAlign:'left'}}>Description</h4>
                        <p style={{textAlign:'left'}}>
                            {routerLoc.state.description}
                        </p>
                    </div>
                    <div>
                        <h4 style={{textAlign:'left'}}>Seller</h4>
                        <div>
                            <p style={{textAlign:'left'}}>
                                <BiUser size={28}/>User: {routerLoc.state.user_name}  
                                <SiGooglemybusiness size={28} style={{marginLeft:'5%'}}/>
                                Type: {routerLoc.state.user_type}
                                </p>
                            <p style={{textAlign:'left'}}><ImLocation size={28}/>
                                Location: {routerLoc.state.location}
                                {/* <MdOutlineReviews size={28} style={{marginLeft:'5%'}}/>
                                <Rating rating={routerLoc.state.user_rating}/> */}
                            </p>
                            <a href="/" class="btn btn-primary" style={{width:500}}>Chat Now</a>
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
