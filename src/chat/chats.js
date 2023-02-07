import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './chat.css'
import ChatCard from "./chat_card";
import ListingImgOne from '../img/listing_1.jpg';
import MessageBubble from "./message_bubble";
import Form from 'react-bootstrap/Form';

function Chats(props){


  return (
    <div id="chatOuter">
        <div id="chatInner">
            <Container id="chatContainer">
                <Row style={{height:'100%'}}>
                    <Col id="cardCol" xs={4}>
                        <h4 className="chatTitle">Chats</h4>
                        <ChatCard/>
                        <ChatCard/>
                        <ChatCard/>
                        <ChatCard/>
                        
                    </Col>
                    <Col id="boxCol" xs={8}>
                        <Container id="boxCon" style={{minWidth:'100%'}}>
                            <Row id="boxDetails" style={{height:'15%'}}>
                                <Col xs={2} id="imgCol" style={{maxWidth:120}}>
                                    <img src={ListingImgOne} style={{maxWidth:100}}/>
                                </Col>

                                <Col xs={10} id="detailsCol">
                                    <h4 className="chatDetails">Username</h4>
                                    <h4 className="chatDetails">Product Name</h4>
                                </Col>
                            </Row>

                            <Row xs={7} style={{height:'75%'}}>
                            <div id="messageOuter">
                                <div id="messageArea">
                                <div style={{width:'100%', minHeight:50}}>
                                    <MessageBubble user="me" message="Teasdfasfdasdft"/>
                                </div>
                                <div style={{width:'100%'}}>
                                    <MessageBubble user="them" message="Teasdfassadfasdfasdfasdfdasdft"/>
                                </div>
                                <div style={{width:'100%'}}>
                                    <MessageBubble user="them" message="Teasdfassadfasdfasdfasdfdasdft"/>
                                </div>
                                <div style={{width:'100%'}}>
                                    <MessageBubble user="them" message="Teasdfassadfasdfasdfasdfdasdft"/>
                                </div>
                                <div style={{width:'100%'}}>
                                    <MessageBubble user="them" message="Teasdfassadfasdfasdfasdfdasdft"/>
                                </div>
                                <div style={{width:'100%'}}>
                                    <MessageBubble user="them" message="Teasdfassadfasdfasdfasdfdasdft"/>
                                </div>
                                <div style={{width:'100%'}}>
                                    <MessageBubble user="them" message="Teasdfassadfasdfasdfasdfdasdft"/>
                                </div>
                                <div style={{width:'100%'}}>
                                    <MessageBubble user="them" message="Teasdfassadfasdfasdfasdfdasdft"/>
                                </div>
                                </div>
                            </div>
                        </Row>

                        <Row xs={1} id="" style={{height:'10%'}}>
                        <Form.Group className="mb-3" controlId="regConfPassword">
                            <Form.Control 
                                name="message" 
                                type="text" 
                                placeholder="Message" 
                                required/>
                            </Form.Group>
                        </Row>

                        </Container>
                        


                        
                        
                        
                        
                        
                    </Col>
                </Row>
            </Container>
        </div>
    </div>
    
  );
};

export default Chats;
