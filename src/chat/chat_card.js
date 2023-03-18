import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './chat.css'

function ChatCard(props){
  // Get Account details from Local Storage
  var account = JSON.parse(localStorage.getItem("account"));

  return (
    // Card that represents each ongoing chat the Logged In user has
    <div 
      id="cardOuter" 
      style={{backgroundColor: props.selected? '#D3D3D3':'white'}}
      onClick={() => props.select(props.chat)}
    >
        <div id="cardInner" style={{width:'90%'}}>
          {/* Check if the seller of the product is the Logged In User */}
            <h5 className="cardInfo cardName">
              {/* Depending on Situation, show seller/user name */}
              {props.seller.username==account.username? 
                props.user.username:
                props.seller.username
              }
            </h5>
            {/* Column Title */}
            <p className="cardInfo cardDesc" style={{textAlign:'left'}}>
                Recent Message
            </p>
        </div>
    </div>
    
  );
};

export default ChatCard;