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


function Chats(props){
    const [chats, setChats] = useState([])
    const [newChat, setNewChat] = useState(false)
    const [selectedChat, setSelectedChat] = useState()
    const [selectedDetails, setSelectedDetails] = useState()
    const [message, setMessage] = useState('')
    const [allMessages, setAllMessages] = useState([])
    const [reviewVisible, setReviewVisible] = useState(false)
    const [reserveVisible, setReserveVisible] = useState(false)

    const routerLoc = useLocation()

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
                        return ((
                            (v['seller_id']['user_id'] == chatData.seller_id || 
                                v['receiver_id']['user_id'] == chatData.seller_id)
                            &&
                                v['listing']['listing_id'] == chatData.listing_id
                            &&
                            (v['seller_id']['user_id'] == chatData.user_id || 
                            v['receiver_id']['user_id'] == chatData.user_id)
                        ))
                    })
                    console.log(filtered)
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
                console.log(response.data)
                setAllMessages(response.data)
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

    const newMessage = async () => {
        var chatData = routerLoc.state
        var queryString = "http://127.0.0.1:8000/api/new_message"
        console.log(chatData)
        axios
            .post(queryString,{
                user:chatData.user_id,
                chat:selectedChat,
                message:message,
                date: moment().format('YYYY-MM-DD HH:mm:ss')
            })
            .then(response => {
              setMessage('')
              fetchMessages(selectedChat)
            })
            .catch(error => console.error(`Error retrieving Login Info: ${error}`))
    }

    const sendMessage = (target) => {
        if(target.code == "Enter"){
            newMessage()
            
        }
    }

    const messageChange = (e, updatedAt) => {
        const value = e.target.value;
        setMessage(value);
    };

    const offerFunc = () => {

    }

    const openReview = (visible) => {
        setReviewVisible(visible)
    }

    const openReserve = (visible) => {
        setReserveVisible(visible)
    }

    useEffect(()=>{
        var allChats = fetchChats()
    },[])

  return (
    <div id="chatOuter">
        <div id="chatInner">
            <Container id="chatContainer">
                <Row style={{height:'100%'}}>
                    <Col id="cardCol" xs={4}>
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
                    <Col id="boxCol" xs={8}>
                        {
                            selectedDetails == null? <div></div>:
                            <Container id="boxCon" style={{minWidth:'100%'}}>
                            <Row id="boxDetails" style={{height:'20%'}}>
                                <Col xs={2} id="imgCol" style={{maxWidth:140}}>
                                    <img src={ListingImgOne} style={{maxWidth:120}}/>
                                </Col>

                                <Col xs={10} id="detailsCol">
                                    <h4 className="chatDetails">
                                        {selectedDetails['receiver_id']['username']}
                                    </h4>
                                    <h4 className="chatDetails">
                                        {selectedDetails['listing']['title']}
                                    </h4>
                                    <div>
                                        
                                            {
            selectedDetails['listing']['seller']['user_id'] == routerLoc.state.user_id? 
            selectedDetails['listing']['status'] == 'available?'? 
                                                <div></div>: 
                                                <Button style={{float:'left'}} onClick={()=>openReview(true)}>
                                                    Review
                                                </Button>:

                                                selectedDetails['listing']['status'] == 'available?'? 
                                                <Button style={{float:'left'}} onClick={()=>openReview(true)}>
                                                    Review
                                                </Button>:
                                                <Button style={{float:'left'}} onClick={()=>openReserve(true)}>
                                                    Reserve
                                                </Button>
                                            }
                                        
                                    </div>
                                </Col>
                            </Row>

                            <Row xs={7} style={{height:'70%'}}>
                            <div id="messageOuter">
                                <div id="messageArea">
                                <div style={{width:'100%', minHeight:50}}>
                                    {
                                        allMessages.map(message => 
                                            <MessageBubble 
                                                user={
                                                    message.sender.user_id == 
                                                    routerLoc.state.user_id? 'me': 'seller'
                                                } 
                                                message={message.message}
                                            />
                                        )
                                    }
                                </div>
                                </div>
                            </div>
                        </Row>

                        <Row xs={1} id="" style={{height:'10%'}}>
                        <Form.Group className="mb-3" controlId="message">
                            <Form.Control 
                                name="message" 
                                type="text" 
                                placeholder="Message"
                                value={message} 
                                required
                                onChange={messageChange}
                                onKeyDown={sendMessage}
                            />
                            </Form.Group>
                        </Row>

                        </Container>
                        }
                    </Col>
                </Row>
            </Container>


            <ReviewModal visible={reviewVisible} openFunc={openReview}/>
            <ReserveModal visible={reserveVisible} openFunc={openReserve}/>
        </div>
    </div>
    
  );
};

export default Chats;
