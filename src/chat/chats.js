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
import ReviewButton from "./reviewButton";
import AcceptModal from "./accept_modal";
import CompleteModal from "./complete_modal";


function Chats(props){
    const [chats, setChats] = useState([])
    const [newChat, setNewChat] = useState(false)
    const [selectedChat, setSelectedChat] = useState()
    const [selectedDetails, setSelectedDetails] = useState()
    const [message, setMessage] = useState('')
    const [allMessages, setAllMessages] = useState([])
    const [reviewVisible, setReviewVisible] = useState(false)
    const [reserveVisible, setReserveVisible] = useState(false)
    const [acceptVisible, setAcceptVisible] = useState(false)
    const [completeVisible, setCompleteVisible] = useState(false)
    const [chatDetails, setChatDetails] = useState()

    const routerLoc = useLocation()

    
    useEffect(()=>{
        const found = chats.find(element => element.chat_id == selectedChat);
        setChatDetails(found)
    },[selectedChat])

    const chooseChat = (chat) => {
        setSelectedChat(chat)
    }

    useEffect(()=>{
        if(selectedChat != null){
            var filtered = chats.find(
                obj => obj.chat_id == selectedChat
            )
            setSelectedDetails(filtered)
            fetchMessages(filtered.chat_id)
        }
    },[selectedChat])

    const fetchChats = async () => {
        var params = new URLSearchParams();
        params.append('user', routerLoc.state.user_id)
        var queryString = "http://127.0.0.1:8000/api/chats"
        axios
            .get(queryString,{
              params:params
            })
            .then(response => {
                var chatData = routerLoc.state
                var allChats = response.data
                setChats(allChats)
                if(chatData.seller_id !== null && chatData.listing_id !== null){
                    var filtered = allChats.filter(function(v,i) {
                        console.log(v)
                        return ((
                            (v['sender_id']['user_id'] == chatData.seller_id || 
                                v['receiver_id']['user_id'] == chatData.seller_id)
                            &&
                                v['listing']['listing_id'] == chatData.listing_id
                            &&
                            (v['sender_id']['user_id'] == chatData.user_id || 
                            v['receiver_id']['user_id'] == chatData.user_id)
                        ))
                    })
                    if(filtered.length > 0) {
                        console.log("Chat available")
                    }else{
                        createChat()
                    }
                }
                return response.data
            })
            .catch(error => console.error(`Error retrieving Login Info: ${error}`))
    }

    const fetchMessages = async (chat) => {
        var params = new URLSearchParams();
        params.append('chat', chat)
        var queryString = "http://127.0.0.1:8000/api/all_messages"
        axios
            .get(queryString,{
              params:params
            })
            .then(response => {
                var pastMessages = response.data.map(msg => {
                    return {
                        name:msg.sender.user_id,
                        message:msg.message
                    }
                })
                setAllMessages(pastMessages)
            })
            .catch(error => console.error(`Error retrieving Login Info: ${error}`))
    }

    const createChat = async () => {
        var chatData = routerLoc.state
        var queryString = "http://127.0.0.1:8000/api/create_chat"
        console.log(chatData)
        axios
            .post(queryString,{
                user:chatData.user_id,
                seller:chatData.seller_id,
                listing:chatData.listing_id
            })
            .then(response => {
              fetchChats()
            })
            .catch(error => console.error(`Error retrieving Login Info: ${error}`))
    }

    const openReview = (visible) => {
        setReviewVisible(visible)
    }

    const openReserve = (visible) => {
        setReserveVisible(visible)
    }

    const openAccept = (visible) => {
        setAcceptVisible(visible)
    }

    const openComplete = (visible) => {
        setCompleteVisible(visible)
    }

    useEffect(()=>{
        var allChats = fetchChats()
    },[])

  return (
    <div id="chatOuter">
        <div id="chatInner">
            <Container id="chatContainer">
                <Row style={{height:'100%'}}>
                    <Col id="cardCol" xs={3}>
                        <h4 className="chatTitle">Chats</h4>
                        {
                            chats.map(chat => 
                                <ChatCard   seller={chat.receiver_id} 
                                            user={chat.sender_id}
                                            chat={chat.chat_id}
                                            select={chooseChat}
                                            selected={
                                                chat.chat_id == selectedChat?
                                                true:false
                                            }/>)
                        }
                        
                    </Col>
                    <Col id="boxCol" xs={9}>
                        {
                            selectedDetails == null? <div></div>:
                            <Container id="boxCon" style={{minWidth:'100%'}}>
                                <Row id="boxDetails" style={{height:'25%'}}>
                                    <Col xs={2} id="imgCol" style={{maxWidth:140}}>
                                        <img 
                                            src={`http://127.0.0.1:8000${selectedDetails['listing']['image']}`} 
                                            style={{maxWidth:120}}/>
                                    </Col>

                                    <Col xs={10} id="detailsCol">
                                        <h4 className="chatDetails">
                                            {selectedDetails['receiver_id']['username']}
                                        </h4>
                                        <h5 className="chatDetails">
                                            {selectedDetails['listing']['title']}
                                        </h5>
                                        <div style={{display:'flex'}}>
                                            <h5>$1.99</h5>
    
                                            
                                            
                                        </div>
                                        <ReviewButton
                                                listing={selectedDetails['listing']['listing_id']}
                                                seller={selectedDetails['receiver_id']['user_id']}
                                                buyer={selectedDetails['sender_id']['user_id']}
                                                status={selectedDetails['listing']['status']}
                                                interested={selectedDetails['interested']}
                                                chat_id={selectedDetails['chat_id']}
                                                openReview={openReview}
                                                openReserve={openReserve}
                                                openAccept={openAccept}
                                                openComplete={openComplete}
                                            />
                                    </Col>
                                </Row>
                                <Row xs={8} style={{height:'75%'}}>
                                    <ChatBox 
                                        chatRoom={chatDetails.chat_id}
                                        pastMsgs={allMessages}/>
                                </Row>
                            </Container>
                        }
                    </Col>
                </Row>
            </Container>
        
            {
                selectedDetails == null? <div></div>:<ReviewModal 
                visible={reviewVisible} 
                openFunc={openReview}
                listing={selectedDetails['listing']['listing_id']}
                seller={selectedDetails['receiver_id']['user_id']}
                buyer={selectedDetails['sender_id']['user_id']}
                status={selectedDetails['listing']['status']}
                interested={selectedDetails['listing']['interested']}
                chat_id={selectedDetails['chat_id']}/>
            }


            {
                selectedDetails == null? <div></div>:<ReserveModal 
                visible={reserveVisible} 
                openFunc={openReserve}
                listing={selectedDetails['listing']['listing_id']}
                seller={selectedDetails['receiver_id']['user_id']}
                buyer={selectedDetails['sender_id']['user_id']}
                status={selectedDetails['listing']['status']}
                interested={selectedDetails['listing']['interested']}
                chat_id={selectedDetails['chat_id']}/>
            }

            {
                selectedDetails == null? <div></div>:<AcceptModal 
                visible={acceptVisible} 
                openFunc={openAccept}
                listing={selectedDetails['listing']['listing_id']}
                seller={selectedDetails['receiver_id']['user_id']}
                buyer={selectedDetails['sender_id']['user_id']}
                status={selectedDetails['listing']['status']}
                interested={selectedDetails['listing']['interested']}
                chat_id={selectedDetails['chat_id']}/>
            }

{
                selectedDetails == null? <div></div>:<CompleteModal 
                visible={completeVisible} 
                openFunc={openComplete}
                listing={selectedDetails['listing']['listing_id']}
                seller={selectedDetails['receiver_id']['user_id']}
                buyer={selectedDetails['sender_id']['user_id']}
                status={selectedDetails['listing']['status']}
                interested={selectedDetails['listing']['interested']}
                chat_id={selectedDetails['chat_id']}/>
            }
        </div>
    </div>
    
  );
};

export default Chats;
