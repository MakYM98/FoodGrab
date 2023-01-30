import Card from 'react-bootstrap/Card';
import CardHeader from 'react-bootstrap/esm/CardHeader';
import ListGroup from 'react-bootstrap/ListGroup';

import CardImage from '../img/slideshow_1.jpg';

function HorizontalCard(props) {
    // var desc = props.description.substring(0,25) + '...'

    return (
        <div></div>


    //   <Card style={{ width: '300px' }} onClick={function(){window.location.href=`/indvListing?id=${props.id}`}}>
    //     <CardHeader>{props.name}</CardHeader>
    //     <Card.Img variant="top" src={CardImage} />
    //     <Card.Body>
    //       <Card.Title style={{textAlign:'left'}}>{props.title}</Card.Title>
    //       <Card.Text style={{textAlign:'left'}}>
    //         {/* {desc} */}
    //       </Card.Text>
    //     </Card.Body>
    //     <ListGroup className="list-group-flush">
    //       <ListGroup.Item style={{textAlign:'left'}}>Price: {props.price}</ListGroup.Item>
    //       <ListGroup.Item style={{textAlign:'left'}}>Location: {props.location}</ListGroup.Item>
    //     </ListGroup>
    //   </Card>
    );
  }
  
  export default HorizontalCard;