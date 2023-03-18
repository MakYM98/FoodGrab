import React, { useEffect, useState, useRef } from "react";
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
// import useWebSocket, { ReadyState } from "react-use-websocket";
import { w3cwebsocket as W3CWebSocket } from "websocket";

function ChatBox(props){
    // States for Chat Box
    const [messages, setMessages] = useState([])
    const [value, setValue] = useState('')
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("account")))
    const [serverMessage, setServerMessage] = useState({})
    const [websocket, setWebSocket]= useState(
        new W3CWebSocket(`ws://127.0.0.1:8000/ws/${props.chatRoom}/`)
    )

    // Reset message when user select a different chat room
    useEffect(()=>{
        setMessages([])
    },[props.chatRoom])

    // Update chat box with past messages
    useEffect(()=>{
        if(props.pastMsgs.length!=0){
            var allMessages = props.pastMsgs.concat(messages)
            setMessages(allMessages)
        }
    },[props.pastMsgs])
    
    // Function to update database with new message
    const newMessage = (dataFromServer) => {
        var queryString = "http://127.0.0.1:8000/api/new_message"
        axios
            .post(queryString,{
                chat: props.chatRoom,
                user:user.user_id,
                message:dataFromServer.message,
                date:new Date()
            })
            .then(response => {
              console.log(response)
              
            })
            .catch(error => console.error(`Error retrieving Login Info: ${error}`))
    }
    
    // Initial Render
    useEffect(()=>{
        // For checking if Web Socket is open/closed
        websocket.onopen = () => console.log("ws opened");
        websocket.onclose = () => console.log("ws closed");
        // Check if socket exists
        if(websocket!=undefined){
            // Web Socket on message function
            websocket.onmessage = (message) => {
                const dataFromServer = JSON.parse(message.data);
                // If new message
                if (dataFromServer) {
                    // Update list of messages with new message
                    setMessages(messages => {
                        let messagesCopy = [...messages];
                        messagesCopy.push({
                            message:dataFromServer.message,
                            name:dataFromServer.username
                        })
                        return messagesCopy
                    });
                    // Store new message 
                    setServerMessage({
                        message:dataFromServer.message,
                        name:dataFromServer.username
                    })
                    // Ensure that only messages sent by loggeed in user is
                    // stored as past messages. This is to avoid duplicates
                    if(dataFromServer.username == user.user_id){
                        newMessage(dataFromServer)
                    }
                }
            }
        }
    },[])
    // On Submit Function
    const onButtonClicked = (e) => {
        // Check if user pressed "Enter Key"
        if(e.code == "Enter"){
            // Send New Message
            websocket.send(
                JSON.stringify({
                    type:"message",
                    text:value,
                    sender:user["user_id"]
                })
            )
            setValue('')
        }
    }

  return (
    <div style={{height:'100%'}}>
        <div style={{height:'88%'}}>
            <div id="messageOuter">
                <div id="messageArea">
                    <div style={{width:'100%', maxHeight:'500px',minHeight:50}}>
                        {/* Iterate through all messages, create a bubble */}
                        {
                            messages.map(message => 
                                <MessageBubble 
                                    user={
                                        message.name == 
                                        user['user_id']? 'me': 'seller'
                                    } 
                                    message={message.message}
                                />
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
        {/* Message Input Box */}
        <div style={{height:'10%',marginTop:'10px'}}>
            <Form.Group className="mb-3" controlId="message" >
                <Form.Control 
                    name="message" 
                    type="text" 
                    placeholder="Message"
                    required
                    value={value}
                    onKeyDown={onButtonClicked}
                    onChange={(e) => {
                        setValue(e.target.value);
                    }}
                />
            </Form.Group>
        </div>
    </div>
  );
};

export default ChatBox;
