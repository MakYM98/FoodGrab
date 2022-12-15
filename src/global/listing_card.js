import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

import CardImage from '../img/slideshow_1.jpg';

function ListingCard(props) {
    return (
        <Card style={{ width: '300px' }}>
        <Card.Img variant="top" src={CardImage} />
        <Card.Body>
          <Card.Title style={{textAlign:'left'}}>Sample Title</Card.Title>
          <Card.Text style={{textAlign:'left'}}>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item style={{textAlign:'left'}}>Price: $1.99</ListGroup.Item>
          <ListGroup.Item style={{textAlign:'left'}}>Location: XXX</ListGroup.Item>
        </ListGroup>
      </Card>
    );
  }
  
  export default ListingCard;