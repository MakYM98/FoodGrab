import Card from 'react-bootstrap/Card';
import CardHeader from 'react-bootstrap/esm/CardHeader';
import ListGroup from 'react-bootstrap/ListGroup';

import CardImage from '../img/slideshow_1.jpg';

function ListingCard(props) {
    return (
        <Card style={{ width: '300px' }}>
        <CardHeader>{props.name}</CardHeader>
        <Card.Img variant="top" src={CardImage} />
        <Card.Body>
          <Card.Title style={{textAlign:'left'}}>{props.title}</Card.Title>
          <Card.Text style={{textAlign:'left'}}>
            {props.description}
          </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item style={{textAlign:'left'}}>Price: {props.price}</ListGroup.Item>
          <ListGroup.Item style={{textAlign:'left'}}>Location: {props.location}</ListGroup.Item>
        </ListGroup>
      </Card>
    );
  }
  
  export default ListingCard;