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
// import useWebSocket, { ReadyState } from "react-use-websocket";
import { w3cwebsocket as W3CWebSocket } from "websocket";

function ChatBox(props){
    // const [client, setClient] = useState()
    // For Chat Box
    const [messages, setMessages] = useState([])
    const [filledForm, setFilledForm] = useState(false)
    const [value, setValue] = useState('')
    const [name, setName] = useState('')
    const [chatRoom, setChatRoom] = useState()
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("account")))
    const client = new W3CWebSocket(`ws://127.0.0.1:8000/ws/${props.chatRoom}/`); //gets room_name from the state and connects to the backend server 

    useEffect(()=>{     
        if(client!=undefined){
            client.onmessage = (message) => {
                const dataFromServer = JSON.parse(message.data);
                if (dataFromServer) {
                    var curMessages = messages
                    curMessages.push({
                        message: dataFromServer.message,
                        name: dataFromServer.username
                    })
                    setMessages(curMessages)
                }
            }
        }

        console.log(user)
    },[])

    useEffect(()=>{
        
    },[client])

    useEffect(()=>{
        console.log(messages)
    },[messages])

    const onButtonClicked = (e) => {
        if(e.code == "Enter"){
            console.log(user['user_id'])
            // e.prevenDefault()
            client.send(
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
                    <div style={{width:'100%', minHeight:50}}>
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

        <div style={{height:'10%',marginTop:'3%'}}>
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
