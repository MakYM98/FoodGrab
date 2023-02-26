import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation,useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import './listing.css'
import ListingImgOne from '../img/listing_1.jpg';
import ListingImgTwo from '../img/listing_2.jpg';
import ListingImgThree from '../img/listing_3.jpg';
import ListingImgFour from '../img/listing_4.jpg';
import { Button } from 'react-bootstrap';
import Dropzone from 'react-dropzone-uploader'
import 'react-dropzone-uploader/dist/styles.css'

function Sell(props) {
  const routerCreate = useLocation()
  const [checked, setChecked] = useState(false);
  const [radioValue, setRadioValue] = useState('For Sale');
  const [imgValue, setImgValue] = useState(1)
  const [listingDetails, setListingDetails] = useState({})
  const [imgFile, setImgFile] = useState()
  const navigate = useNavigate()

    const fileParams = ({ meta }) => {
        return { url: 'https://httpbin.org/post' }
    }
    const onFileChange = ({ meta, file }, status) => { 
        setImgFile(file)
    }
    const onSubmit = (files, allFiles) => {
        allFiles.forEach(f => {
            console.log(f)
        })


        allFiles.forEach(f => f.remove())
    }
    // const getFilesFromEvent = e => {
    //     return new Promise(resolve => {
    //         getDroppedOrSelectedFiles(e).then(chosenFiles => {
    //             resolve(chosenFiles.map(f => f.fileObject))
    //         })
    //     })
    // }

    // const getUploadParams = ({ file, meta }) => {
    //     const body = new FormData()
    //     body.append('fileField', file)
    //     return { url: 'https://httpbin.org/post', body }
    //   }

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
    var queryString = "http://127.0.0.1:8000/api/create"
    if('price' in listingDetails){
        var price = listingDetails.price
    }else{
        var price = 0
    }

    let form_data = new FormData();
    form_data.append('image', imgFile);
    form_data.append('title',listingDetails.title);
    form_data.append('description',listingDetails.description);
    form_data.append('location',listingDetails.location);
    form_data.append('price',price);
    form_data.append('date_posted',new Date().toLocaleDateString());
    form_data.append('seller',routerCreate.state.user_id);

    axios
        .post(queryString,form_data)
        .then(response => {
            console.log(listingDetails)
            if(response.status == 200){
                navigate('/created', {
                    state:{
                        title:listingDetails.title,
                        description:listingDetails.description,
                        location:listingDetails.location,
                        price:price,
                        image:imgFile,
                        seller:routerCreate.state.username,
                    }
                })
            }
        })
        .catch(error => console.error(`Error retrieving Registering: ${error}`))
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

                        <Dropzone
                            onSubmit={onSubmit}
                            onChangeStatus={onFileChange}
                            getUploadParams={fileParams}
                            // getFilesFromEvent={getFilesFromEvent}
                            accept="image/*"
                            maxFiles={1}
                            inputContent="Drop A File"
                            styles={{
                                dropzone: { width: '100%', height: 200 },
                                dropzoneActive: { borderColor: 'green' },
                            }}            
                        />
                        

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