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

function ChatSocket(props){
    // const [client, setClient] = useState()
    // For Chat Box
    const [messages, setMessages] = useState([])
    const [value, setValue] = useState('')
    const [time, setTime] = useState(Date.now());
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("account")))
    // const client = React.useRef(new W3CWebSocket(`ws://127.0.0.1:8000/ws/${props.chatRoom}/`));
    // const client = useRef(null)
    const [websocket, setWebSocket]= useState(new W3CWebSocket(`ws://127.0.0.1:8000/ws/${props.chatRoom}/`))

    useEffect(()=>{
        setMessages([])
    },[props.chatRoom])

    useEffect(()=>{
        if(props.pastMsgs.length!=0){
            var allMessages = props.pastMsgs.concat(messages)
            setMessages(allMessages)
        }
    },[props.pastMsgs])

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
    const getMessages = () => {
        return messages
    }

    useEffect(()=>{
        console.log(messages)
    },[messages])

    useEffect(()=>{     
        // client.current = new W3CWebSocket(`ws://127.0.0.1:8000/ws/${props.chatRoom}/`);
        websocket.onopen = () => console.log("ws opened");
        websocket.onclose = () => console.log("ws closed");

        if(websocket!=undefined){
            websocket.onmessage = (message) => {
                const dataFromServer = JSON.parse(message.data);
                if (dataFromServer) {
                    console.log(getMessages())
                    setMessages(messages => {
                        console.log(messages)
                    });

                    newMessage(dataFromServer)
                }
            }
        }
    },[])

    const onButtonClicked = (e) => {
        if(e.code == "Enter"){
            // e.prevenDefault()
            websocket.send(
                JSON.stringify({
                    type:"message",
                    text:value,
                    sender:user["user_id"]
                })
            )
            // var curMessages = messages
            // curMessages.push({
            //     message: value,
            //     name: user["user_id"]
            // })
            // setMessages(curMessages)
            setValue('')
        }
    }

};

export default ChatSocket;
