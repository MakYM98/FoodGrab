import ListingCard from "../global/listing_card";
import Slider from "react-slick";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { CardGroup } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import HomeImg from '../img/home.png'

function Home() {
  const [latestListings, setLatestListings] = useState([]);
  const [missingCol, setMissingCol] = useState(0);
  const navigate = useNavigate()
  useEffect(()=>{
    fetchListingsAll()
  },[])

  const fetchListingsAll = async () => {
    var queryString = "http://127.0.0.1:8000/api/listing"
    axios
        .get(queryString)
        .then(response => {
          console.log(response.data)
            var newListings = response.data.slice(0,8).map(element => {
              return {
                name: element.seller['username'],
                title: element.title,
                description: element.description,
                price: element.price,
                location: element.location,
                id: element.listing_id,
                seller_id:element.seller.user_id,
                image:element.image
              }
            })
            
            if(newListings.length < 4){
              var emptyCount = 4-newListings.length
              setMissingCol(Array.from(Array(emptyCount).keys()))
            }
            setLatestListings(newListings)
        })
        .catch(error => console.error(`Error retrieving Login Info: ${error}`))
  }


    var settings = {
      className: "slider variable-width",
      dots: true,
      infinite: true,
      centerMode: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      variableWidth: true
    };

    return (
      <div style={{height:'100%',backgroundColor:'#d5ecd5'}}>
        <Container style={{maxWidth:'none', height:'100%'}}>
          <Row>
            <Col xs={3} style={{display:'flex', justifyContent:'left', alignItems:'center',marginLeft:'5%'}}>
              <div>
                <div style={{textAlign:'left'}}>
                  <h1 style={{fontSize:100}}>FoodGrab</h1>
                  <h1 id="homeTitle">Help Fight Against<br/> Food Wastage</h1>
                  <h5 id="homeSubtitle">
                    Every food matters, join us in fighting against 
                    Food Wastage. Click <span id="homeHere"
                    onClick={()=>{navigate('/aboutus')}}>
                      here
                    </span> to learn more. 
                  </h5>
                </div>
              </div>
              
              
            </Col>
            <Col style={{display:'flex', justifyContent:'end'}}>
              <div style={{width:'85%'}}>
                <img
                  className="d-block w-100"
                  src={HomeImg}
                  alt="First slide"
                />
              </div>
            </Col>
          </Row>

          <Row id="recentRow" style={{backgroundColor:'white'}}>
            <h1 id="recentHeader" style={{textAlign:'center', fontSize:50}}>
              Recent Listings
            </h1>
            {
              latestListings.length == 0? <h5>
                There are not listings for the time being, please check
                back again later! Alternatively, you can 
                click <span id="listingHere" onClick={()=>{
                    navigate('/sell')}
                }>here</span> to create a listing!
              </h5>:
              <div style={{width:'100%', display:'flex', justifyContent:'center'}}>
                <div style={{width:'95%'}}>
                  <Slider {...settings}>
                    {
                      latestListings.map(listing => 
                          <ListingCard name={listing["name"]} 
                                              title={listing["title"]} 
                                              description={listing["description"]}
                                              price={listing["price"]} 
                                              location={listing["location"]} 
                                              id={listing["id"]}
                                              image={listing["image"]}
                                              user_id={listing["seller_id"]}/>
                      )
                    }
                    <div>
                      <h6 style={{'width':'300px', 'height':'511px', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer'}}
                          onClick={()=>{navigate('/listings')}}>
                        Show More
                      </h6>
                    </div>
                  </Slider>
                </div>
              </div>
              
            }
          </Row>
        </Container>
      </div>
    );
  }
  
  export default Home;