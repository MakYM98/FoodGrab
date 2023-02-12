import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './chat.css'

function MessageBubble(props){
    // console.log(props)
    if(props.user == 'me'){
        return(
            <p id="messagePara" className="from-me">
                {props.message}
            </p>
        )
    }else{
        return(
            <p id="messagePara" className="from-them">
                {props.message}
            </p>
        )
    }
};

export default MessageBubble;
