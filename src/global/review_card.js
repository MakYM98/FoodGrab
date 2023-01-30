import Card from 'react-bootstrap/Card';
import CardHeader from 'react-bootstrap/esm/CardHeader';
import ListGroup from 'react-bootstrap/ListGroup';

import CardImage from '../img/slideshow_1.jpg';

function ReviewCard() {
    return (
      <Card style={{ width: '300px' }}>
        <CardHeader>User1</CardHeader>
        <Card.Body>
          <Card.Title style={{textAlign:'left'}}>Star</Card.Title>
          <Card.Text style={{textAlign:'left'}}>
            Very Good Service
          </Card.Text>
        </Card.Body>
        
      </Card>
    );
  }
  
  export default ReviewCard;