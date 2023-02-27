import React, { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './chat.css'
import ChatCard from "./chat_card";
import ListingImgOne from '../img/listing_1.jpg';
import MessageBubble from "./message_bubble";
import Form from 'react-bootstrap/Form';
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import moment from 'moment';
import { Button } from 'react-bootstrap';
import ReviewModal from "./review_modal";
import ReserveModal from "./reserve_modal";
import ChatBox from "./chatbox";


function ReviewButton(props){
    var account = JSON.parse(localStorage.getItem("account"));


    if(account.user_id == props.seller){
        if(props.status=='completed' && props.interested=='reviewed'){
            return(
                <Button style={{float:'left'}} disabled={true}>
                    Sold
                </Button>
            )
        }else if(props.status=='available' && props.interested=='True'){
            return(
                <Button style={{float:'left'}} onClick={()=>props.openAccept(true)}>
                    Accept
                </Button>
            )                                       
        }else if(props.status=='available'){
            return(
                <div></div>
            )
        }else if(props.status=='accepted'){
            return(
                <Button style={{float:'left'}} onClick={()=>props.openComplete(true)}>
                    Complete
                </Button>
            )
        }else if(props.status=='completed'){
            return(
                <Button style={{float:'left'}} onClick={()=>props.openReview(true)}>
                    Review
                </Button>
            )
        }
    }else if(account.user_id == props.buyer){
        if(props.status=='completed' && props.interested=='reviewed'){
            return(
                <Button style={{float:'left'}} disabled={true}>
                    Sold
                </Button>
            )
        }else if(props.status=='available' && props.interested=='True'){
            return(
                <Button style={{float:'left'}} disabled={true}>
                    Expressed Interest
                </Button>
            )                                       
        }else if(props.status=='available'){
            return(
                <Button style={{float:'left'}} onClick={()=>props.openReserve(true)}>
                    Express Interest
                </Button>
            )                                       
        }else if(props.status=='accepted'){
            return(
                <Button style={{float:'left'}} disabled={true}>
                    Accepted
                </Button>
            )
        }else if(props.status=='completed'){
            return(
                <Button style={{float:'left'}} onClick={()=>props.openReview(true)}>
                    Review
                </Button>
            )
        }
    }
};

export default ReviewButton;
