import React, { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './chat.css'
import ChatCard from "./chat_card";
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import ReviewModal from "./review_modal";
import ReserveModal from "./reserve_modal";
import ChatBox from "./chatbox";
import ReviewButton from "./reviewButton";
import AcceptModal from "./accept_modal";
import CompleteModal from "./complete_modal";

function Chats(props){
    // States for Chats
    const [chats, setChats] = useState([])
    const [selectedChat, setSelectedChat] = useState()
    const [selectedDetails, setSelectedDetails] = useState()
    const [allMessages, setAllMessages] = useState([])
    const [reviewVisible, setReviewVisible] = useState(false)
    const [reserveVisible, setReserveVisible] = useState(false)
    const [acceptVisible, setAcceptVisible] = useState(false)
    const [completeVisible, setCompleteVisible] = useState(false)
    const [chatDetails, setChatDetails] = useState()
    // Retrieve Parameters from previous page.
    const routerLoc = useLocation()
    // On Selected Chat Change
    useEffect(()=>{
        const found = chats.find(element => element.chat_id == selectedChat);
        setChatDetails(found)
    },[selectedChat])
    // Function to set state when user choose chat
    const chooseChat = (chat) => {
        setSelectedChat(chat)
    }
    // On Selected Chat Change
    useEffect(()=>{
        // If Selected Chat is not null
        if(selectedChat != null){
            // Fetch All messages based on selected chat
            var filtered = chats.find(
                obj => obj.chat_id == selectedChat
            )
            setSelectedDetails(filtered)
            fetchMessages(filtered.chat_id)
        }
    },[selectedChat])
    // Function to fetch all user's chats
    const fetchChats = async () => {
        // GET Query Parameters
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
                // Filter chats to check if selected chat is available
                if(chatData.seller_id !== null && chatData.listing_id !== null){
                    var filtered = allChats.filter(function(v,i) {
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
                    // Check if Selected chat is available
                    if(filtered.length > 0) {
                        console.log("Chat available")
                    }else{
                        // Create new chat if chat doesn't exist
                        createChat()
                    }
                }
                return response.data
            })
            .catch(error => console.error(`Error retrieving Login Info: ${error}`))
    }
    // Fetch All messages in a particular chat
    const fetchMessages = async (chat) => {
        // GET Query Parameter
        var params = new URLSearchParams();
        params.append('chat', chat)
        var queryString = "http://127.0.0.1:8000/api/all_messages"
        axios
            .get(queryString,{
              params:params
            })
            .then(response => {
                // Convert past messages format 
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

    // Create Chat function
    const createChat = async () => {
        var chatData = routerLoc.state
        var queryString = "http://127.0.0.1:8000/api/create_chat"
        axios
            .post(queryString,{
                user:chatData.user_id,
                seller:chatData.seller_id,
                listing:chatData.listing_id
            })
            .then(response => {
              // Call Fetch Chats again after creating
              fetchChats()
            })
            .catch(error => console.error(`Error retrieving Login Info: ${error}`))
    }

    // Open Review Modal
    const openReview = (visible) => {
        setReviewVisible(visible)
    }
    // Open Reserve Modal
    const openReserve = (visible) => {
        setReserveVisible(visible)
    }
    // Open Accept Modal
    const openAccept = (visible) => {
        setAcceptVisible(visible)
    }
    // Open Complete Modal
    const openComplete = (visible) => {
        setCompleteVisible(visible)
    }
    // Initial Render
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
                        {/* Create a Chat Card for each Chat */}
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
                            // Check if User has selected a Chat
                            selectedDetails == null? <div></div>:
                            // If User selected a chat
                            <Container id="boxCon" style={{minWidth:'100%'}}>
                                <Row id="boxDetails" style={{height:'25%'}}>
                                    {/* Listing Image */}
                                    <Col xs={2} id="imgCol" style={{maxWidth:140}}>
                                        <img 
                                            src={`http://127.0.0.1:8000${selectedDetails['listing']['image']}`} 
                                            style={{maxWidth:120}}/>
                                    </Col>
                                    {/* Listing Details */}
                                    <Col xs={10} id="detailsCol">
                                        <h4 className="chatDetails">
                                            {selectedDetails['receiver_id']['username']}
                                        </h4>
                                        <h5 className="chatDetails">
                                            {selectedDetails['listing']['title']}
                                        </h5>
                                        <div style={{display:'flex'}}>
                                            <h5>$1.99</h5>
                                        {/* Listing Chat Button */}
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
                                {/* Chat Box Area */}
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
        
            {/* Review Modal (Determine if Show/Don't Show) */}
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

            {/* Reserve Modal (Determine if Show/Don't Show) */}
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

            {/* Accept Modal (Determine if Show/Don't Show) */}
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

            {/* Complete Modal (Determine if Show/Don't Show) */}
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
