import React from 'react';
import { useLocation } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import CardHeader from 'react-bootstrap/esm/CardHeader';
import ListGroup from 'react-bootstrap/ListGroup';
import { useNavigate } from "react-router-dom";
import CardImage from '../img/slideshow_1.jpg';
import { Button } from 'react-bootstrap';

function CreatedListing(props) {
  const routerCreated = useLocation()
  const createdData = routerCreated.state
  const navigate = useNavigate()

  console.log(routerCreated)

  return (
    <div style={{display:'flex', justifyContent:'center', marginTop:'3%', height:'600px'}}>
        <div style={{width:'50%',height:'100%',justifyContent:'center'}}>
        <h2>Listing has been created</h2>
        <div style={{display:'flex', justifyContent:'center'}}>
            <Card style={{ width: '300px', marginBottom:'2%' }}>
                <CardHeader>{createdData['seller']}</CardHeader>
                <Card.Img variant="top" src={CardImage} />
                <Card.Body>
                <Card.Title style={{textAlign:'left'}}>{createdData['title']}</Card.Title>
                <Card.Text style={{textAlign:'left'}}>
                    {createdData['description']}
                </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                <ListGroup.Item style={{textAlign:'left'}}>Price: {createdData['price']}</ListGroup.Item>
                <ListGroup.Item style={{textAlign:'left'}}>Location: {createdData['location']}</ListGroup.Item>
                </ListGroup>
            </Card>
        </div>
        <h4>Click the button below to return to the homepage</h4>
        <Button onClick={()=>{navigate('/')}}>Return</Button>
            
        </div>
    </div>
  );
}

export default CreatedListing;