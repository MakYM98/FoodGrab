import Card from 'react-bootstrap/Card';
import CardHeader from 'react-bootstrap/esm/CardHeader';
import ListGroup from 'react-bootstrap/ListGroup';
import Rating from './rating_system';
import CardImage from '../img/slideshow_1.jpg';

function ReviewCard(props) {
    return (
      <Card style={{ width: '300px' }}>
        <CardHeader>{props.user}</CardHeader>
        <Card.Body>
          <Card.Title style={{textAlign:'left'}}>
            <Rating rating={props.rating}/>
          </Card.Title>
          <Card.Text style={{textAlign:'left'}}>
            {props.comment}
          </Card.Text>
        </Card.Body>
        
      </Card>
    );
  }
  
  export default ReviewCard;