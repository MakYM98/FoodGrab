import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './chat.css'

function ChatCard(props){
  return (
    <div 
      id="cardOuter" 
      style={{backgroundColor: props.selected? '#D3D3D3':'white'}}
      onClick={() => props.select(props.chat)}
    >
        <div id="cardInner" style={{width:'90%'}}>
            <h5 className="cardInfo cardName">{props.seller.username}</h5>
            <p  className="cardInfo cardDesc" style={{textAlign:'left'}}>
                Recent Message
            </p>
        </div>
    </div>
    
  );
};

export default ChatCard;