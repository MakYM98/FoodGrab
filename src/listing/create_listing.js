import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import './listing.css'
import ListingImgOne from '../img/listing_1.jpg';
import ListingImgTwo from '../img/listing_2.jpg';
import ListingImgThree from '../img/listing_3.jpg';
import ListingImgFour from '../img/listing_4.jpg';
import ListingImgFive from '../img/listing_5.jpg';
import { Button } from 'react-bootstrap';

function Sell(props) {
  const routerNews = useLocation()
  const [checked, setChecked] = useState(false);
  const [radioValue, setRadioValue] = useState('For Sale');
  const [imgValue, setImgValue] = useState(1)
  const [listingDetails, setListingDetails] = useState({})


  const radios = [
    { name: 'For Sale', value: 'For Sale' },
    { name: 'For Free', value: 'For Free' }
  ];

  const imgRadios = [
    { name: 1, value: 1 },
    { name: 2, value: 2 },
    { name: 3, value: 3 },
    { name: 4, value: 4 },
  ]

  const onFormChange = (e, updatedAt) => {
    const name = e.target.name;
    const value = e.target.value;
    setListingDetails({ ...listingDetails, [name]: value });
  };


  const createFunc = () => {
    console.log(listingDetails)
  }

  return (
    <div id="createListing">
        <Container>
            <Row>
                <Col  xs={5}>
                    <div id="imageArea">
                        <h4 style={{textAlign:'left'}}>Item Image</h4>
                        <img 
                            src={imgValue==1? ListingImgOne: 
                                    imgValue==2? ListingImgTwo:
                                    imgValue==3? ListingImgThree:ListingImgFour}
                            width={500}
                        />
                        <ButtonGroup className="mb-2" id="imageToggle">
                            {imgRadios.map((radio, idx) => (
                                <ToggleButton
                                    key={idx}
                                    id={`img-radio-${idx}`}
                                    type="radio"
                                    variant="none"
                                    name="imgRadio"
                                    value={radio.value}
                                    checked={imgValue == radio.value}
                                    onChange={(e) => setImgValue(e.currentTarget.value)}
                                >
                                    <img src={radio.value==1? ListingImgOne: 
                                                radio.value==2? ListingImgTwo:
                                                radio.value==3? ListingImgThree:ListingImgFour} 
                                    width={100}/>
                                </ToggleButton>
                            ))}
                        </ButtonGroup>

                    </div>
                </Col>
                <Col style={{borderLeft:'1px #eae8e4 solid'}} xs={7}>
                    <div id="detailsArea">
                        <h4 style={{textAlign:'left'}}>Item Details</h4>
                        {/* Text Box for Title */}
                        <h5 style={{textAlign:'left'}}>Title</h5>
                        <Form.Group className="mb-3" id="listingTitle" controlId="title">
                          <Form.Control 
                            name="title" 
                            type="text" 
                            placeholder="Listing Title"
                            onChange={onFormChange} 
                            required/>
                        </Form.Group>
                        {/* Item Details Area */}
                        <div style={{marginTop:'0%'}}>
                            {/* Price Detail */}
                            <h5 id="priceTitle">Price</h5>
                            <ButtonGroup className="mb-2" id="saleToggle">
                                {radios.map((radio, idx) => (
                                <ToggleButton
                                    key={idx}
                                    id={`radio-${idx}`}
                                    type="radio"
                                    variant="primary"
                                    name="priceRadio"
                                    value={radio.value}
                                    checked={radioValue === radio.value}
                                    onChange={(e) => setRadioValue(e.currentTarget.value)}
                                >
                                    {radio.name}
                                </ToggleButton>
                                ))}
                            </ButtonGroup>
                            <Form.Group className="mb-3" controlId="regType">
                            <Form.Control 
                                name="price" 
                                type="text" 
                                placeholder="Price"
                                onChange={onFormChange} 
                                disabled={radioValue=='For Sale'? false:true}
                                required/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="regConfPassword">
                            <h5 style={{textAlign:'left'}}>Description</h5>
                            <Form.Control 
                                name="description" 
                                as="textarea"
                                onChange={onFormChange} 
                                rows={15}
                                placeholder="Describe about your product" 
                                required/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="regConfPassword">
                            <h5 style={{textAlign:'left'}}>Location</h5>
                            <Form.Control 
                                name="location" 
                                type="text"
                                onChange={onFormChange} 
                                placeholder="Item Collection Point" 
                                required/>
                            </Form.Group>
                        </div>
                        <Button type="submit" onClick={createFunc}>
                            Create
                        </Button>
                    </div>
                </Col>
            </Row>
        </Container>
    </div>
  );
}

export default Sell;