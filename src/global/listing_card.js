import Card from 'react-bootstrap/Card';
import CardHeader from 'react-bootstrap/esm/CardHeader';
import ListGroup from 'react-bootstrap/ListGroup';
import { useNavigate } from "react-router-dom";
import CardImage from '../img/slideshow_1.jpg';

function ListingCard(props) {
    var desc = props.description.substring(0,25) + '...'
    const navigate = useNavigate()
    const selectFunc = () =>{
      var redirect_url = "/indvListing/" + props.id
      var account=JSON.parse(localStorage.getItem("account"))
      console.log(account)

      if(account != null){
        navigate(redirect_url, {
          state:{
            listing_id:props.id,
            title:props.title,
            description:props.description,
            image:props.image,
            price:props.price,
            location:props.location,
            user_id:props.user_id,
            user_rating:props.user_rating,
            user_name:props.name,
            user_type:props.type
          }
        });
      }else{
        navigate('/login',{
          state:{
            type:'login'
          }
        })
      }
    }

    return (
      <Card style={{ width: '300px', height:'511px', padding:0}} onClick={function(){selectFunc()}}>
        <CardHeader>{props.name}</CardHeader>
        <Card.Img style={{width:'100%', height:'282px', borderRadius:0 }} variant="top" src={`http://127.0.0.1:8000${props.image}`}/>
        <Card.Body>
          <Card.Title style={{textAlign:'left'}}>{props.title}</Card.Title>
          <Card.Text style={{textAlign:'left'}}>
            {desc}
          </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item style={{textAlign:'left'}}>Price: {props.price==0?'Free': `$${props.price}`}</ListGroup.Item>
          <ListGroup.Item style={{textAlign:'left'}}>Location: {props.location}</ListGroup.Item>
        </ListGroup>
      </Card>
    );
  }
  
  export default ListingCard;