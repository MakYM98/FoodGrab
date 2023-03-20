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
import { Button } from 'react-bootstrap';
import Dropzone from 'react-dropzone-uploader'
import 'react-dropzone-uploader/dist/styles.css'

function Sell(props) {
    // States for Create Listing
    const [radioValue, setRadioValue] = useState('For Sale');
    const [listingDetails, setListingDetails] = useState({})
    const [imgFile, setImgFile] = useState()
    const [imgDisplay, setImgDisplay] = useState()
    const [account, setAccount] = useState(JSON.parse(localStorage.getItem("account")))
    // Form Validation
    const [titleInvalid, setTitleInvalid] = useState()
    const [descInvalid, setDescInvalid] = useState()
    const [locInvalid, setLocInvalid] = useState()
    const [imgInvalid, setImgInvalid] = useState()
    const navigate = useNavigate()
    // Upload User's Image
    const fileParams = ({ meta }) => {
        return { url: 'https://httpbin.org/post' }
    }
    // Detect if user uploaded an image
    const onFileChange = ({ meta, file }, status) => { 
        if (FileReader) {
            var fr = new FileReader();
            fr.onload = function () {
                document.getElementById('imgDisplay').src = fr.result;
            }
            fr.readAsDataURL(file);
        }
        setImgFile(file)
    }
    // Radio Selection to determine if free or on sale
    const radios = [
        { name: 'For Sale', value: 'For Sale' },
        { name: 'For Free', value: 'For Free' }
    ];
    // Detect for changes in inputs
    const onFormChange = (e, updatedAt) => {
        const name = e.target.name;
        const value = e.target.value;
        setListingDetails({ ...listingDetails, [name]: value });
    };

    // Function to create new listing
    const createFunc = () => {
        var queryString = "http://127.0.0.1:8000/api/create"
        // Check if price is in details (Won't exist if its free)
        if('price' in listingDetails){
            var price = listingDetails.price
        }else{
            var price = 0
        }

        var formPassed = true
        // Check if Title is Empty
        if(listingDetails.title === undefined){
            formPassed = false
            setTitleInvalid(true)
        }
        // Check if Description is Empty
        if(listingDetails.description === undefined){
            formPassed = false
            setDescInvalid(true)
        }
        // Check if Location is Empty
        if(listingDetails.location === undefined){
            formPassed = false
            setLocInvalid(true)
        }
        // Check if Image is Empty
        if(imgFile === null || imgFile === undefined){
            formPassed = false
            setImgInvalid(true)
        }
        // If no issues, use FormData to create parameters
        if(formPassed){
            let form_data = new FormData();
            form_data.append('image', imgFile);
            form_data.append('title',listingDetails.title);
            form_data.append('description',listingDetails.description);
            form_data.append('location',listingDetails.location);
            form_data.append('price',price);
            form_data.append('date_posted',new Date().toLocaleDateString());
            form_data.append('seller',account.user_id);
            axios
                .post(queryString,form_data)
                .then(response => {
                    // If Successful, navigate to listings page.
                    if(response.status == 200){
                        navigate('/listings')
                    }
                    alert('Listing Created')
                })
                .catch(error => console.error(`Error retrieving creating: ${error}`))
        }
        
    }

  return (
    <div id="createListing">
        <Container>
            <Row>
                <Col  xs={5}>
                    <div id="imageArea">
                        <h4 style={{textAlign:'left'}}>Item Image</h4>
                        {/* To display user uploaded image */}
                        <img 
                            id="imgDisplay"
                            src={imgDisplay}
                            width={400}
                        />
                        {/* Drop area to upload image file */}
                        <Dropzone
                            onChangeStatus={onFileChange}
                            getUploadParams={fileParams}
                            accept="image/*"
                            maxFiles={1}
                            inputContent="Drop A File"
                            styles={{
                                dropzone: { width: '100%', height: 200, marginTop:'1%' },
                                dropzoneActive: { borderColor: 'green' },
                            }}            
                        />
                        {/* Error message if user did not upload */}
                        {
                            imgInvalid? 
                            <h5 style={{color:'red'}}>
                                No Image Detected. Please upload an image
                            </h5>
                            :
                            null
                        }
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
                            isInvalid={titleInvalid}
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
                            {/* Price Input */}
                            <Form.Group className="mb-3" controlId="regType">
                            <Form.Control 
                                name="price" 
                                type="text" 
                                placeholder="Price"
                                onChange={onFormChange} 
                                disabled={radioValue=='For Sale'? false:true}
                                required/>
                            </Form.Group>
                            {/* Description Input Area */}
                            <Form.Group className="mb-3" controlId="regConfPassword">
                            <h5 style={{textAlign:'left'}}>Description</h5>
                            <Form.Control 
                                name="description" 
                                as="textarea"
                                onChange={onFormChange} 
                                rows={15}
                                isInvalid={descInvalid}
                                placeholder="Describe about your product" 
                                required/>
                            </Form.Group>
                            {/* Location Input Area */}
                            <Form.Group className="mb-3" controlId="regConfPassword">
                            <h5 style={{textAlign:'left'}}>Location</h5>
                            <Form.Control 
                                name="location" 
                                type="text"
                                onChange={onFormChange} 
                                isInvalid={locInvalid}
                                placeholder="Item Collection Point" 
                                required/>
                            </Form.Group>
                        </div>
                        {/* Button to submit */}
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