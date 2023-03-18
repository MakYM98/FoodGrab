import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './chat.css'

function MessageBubble(props){
    // Message Bubble if sent by Logged in User
    if(props.user == 'me'){
        return(
            <div id="messageDiv">
                <p id="messagePara" className="from-me">
                    {props.message}
                </p>
            </div>
            
        )
    }else{
        // Message Bubble if sent by Other Users
        return(
            <p id="messagePara" className="from-them">
                {props.message}
            </p>
        )
    }
};

export default MessageBubble;
