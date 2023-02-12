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

function Chats(props){
    const [chats, setChats] = useState([])
    const routerLoc = useLocation()

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
                    console.log(chatData.seller_id)
                    var filtered = allChats.filter(function(v,i) {
                        return ((
                            (v['seller_id'] == chatData.seller_id || 
                                v['receiver_id'] == chatData.seller_id)
                            &&
                                v['listing'] == chatData.listing_id
                            &&
                            (v['seller_id'] == chatData.user_id || 
                            v['receiver_id'] == chatData.user_id)
                        ))
                    })
        
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
              console.log(response.data)
              return response.data
            })
            .catch(error => console.error(`Error retrieving Login Info: ${error}`))
    }



    useEffect(()=>{
        var chatData = routerLoc.state
        var allChats = fetchChats()
        console.log(allChats)
        
    },[])

  return (
    <div id="chatOuter">
        <div id="chatInner">
            <Container id="chatContainer">
                <Row style={{height:'100%'}}>
                    <Col id="cardCol" xs={4}>
                        <h4 className="chatTitle">Chats</h4>
                        {
                            chats.map(chat => <ChatCard/>)
                        }
                        
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
