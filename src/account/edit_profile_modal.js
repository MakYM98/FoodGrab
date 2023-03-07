import {useLayoutEffect, useRef, useState, useEffect} from 'react';
import './account.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import ListingCard from "../global/listing_card";
import ReviewCard from "../global/review_card";
import Avatar from '../img/img_avatar.png'
import { useLocation } from "react-router-dom";
import Rating from '../global/rating_system';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Dropzone from 'react-dropzone-uploader'
import 'react-dropzone-uploader/dist/styles.css'
import Modal from 'react-bootstrap/Modal';

export default function EditProfileModal(props){
    const [show, setShow] = useState(props.visible);
    const [newAccDetails, setNewAccDetails] = useState({})
    const [imgFile, setImgFile] = useState()
    const [userNameError, setUserNameError] = useState(false)
    const [typeError, setTypeError] = useState(false)

    useEffect(()=>{setShow(props.visible)},[props.visible])

    const handleClose = () => {
        setShow(false)
        props.openFunc(false)
    }

    const updateFormValidation = async () => {
        var formPassed = true
        var params = new URLSearchParams();
        params.append('username',newAccDetails.newUser)
        var userQuery = "http://127.0.0.1:8000/api/edit_profile"
        axios
            .get(userQuery, {params:params})
            .then(response => {
              const checkUsername = response.data.find((e) => e.username == newAccDetails.newUser)
    
              if(checkUsername){
                setUserNameError(true)
                formPassed = false
              }else{
                setUserNameError(false)
              }
    
              if(formPassed){
                var newUsername = newAccDetails.newUser===undefined? props.username: newAccDetails.newUser
                var newType = newAccDetails.newType===undefined? props.type: newAccDetails.newType
                console.log(props.id)
                let form_data = new FormData();
                form_data.append('image', imgFile);
                form_data.append('username',newUsername);
                form_data.append('user_id',props.id);
                form_data.append('type',newType);
                var queryString = "http://127.0.0.1:8000/api/update_profile"
                axios
                  .post(queryString,form_data)
                  .then(response => {
                    console.log(response)
                    if(response.status == 200){
                      props.openFunc(false)
                        var updatedAcc = {
                            user_id:props.id,
                            username:newUsername,
                        }
                        props.fetchUser()
                        localStorage.setItem('account', JSON.stringify(updatedAcc));
                        window.dispatchEvent(new Event("storage"));
                    }
                  })
                  .catch(error => console.error(`Error retrieving Registering: ${error}`))
              }
            })
            .catch(error => console.error(`Error retrieving Registering: ${error}`))
      }

    const updateAcc = async (e) => {
        e.preventDefault();
        updateFormValidation()
    }

    const onFormChange = (e, updatedAt) => {
        const name = e.target.name;
        const value = e.target.value;
        setNewAccDetails({ ...newAccDetails, [name]: value });
    };

    const fileParams = ({ meta }) => {
        return { url: 'https://httpbin.org/post' }
    }

    const onFileChange = ({ meta, file }, status) => { 
        if (FileReader) {
            var fr = new FileReader();
            fr.readAsDataURL(file);
        }
        console.log(file)
        setImgFile(file)
    }


    return (

        <Modal show={show} >
        <Modal.Header closeButton>
          <Modal.Title>
            Edit Profile
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={updateAcc}>
                <Form.Group className="mb-3" controlId="newUser" style={{width:'80%', textAlign:'left'}}>
                    <Form.Label style={{display:'flex'}}>Username</Form.Label>
                    <Form.Control 
                    name="newUser" 
                    type="text" 
                    placeholder="Enter username" 
                    defaultValue={props.username}
                    onChange={onFormChange} 
                    required
                    isInvalid={userNameError}/>
                    <Form.Control.Feedback type="invalid">
                    Username Taken
                </Form.Control.Feedback>  
                </Form.Group>

                    {/* Type of Account */}

                        <Form.Group className="mb-3" controlId="newType" style={{width:'80%'}}>
                          <Form.Label style={{display:'flex'}}>Type</Form.Label>
                          <Form.Control 
                            as="select" 
                            name="newType" 
                            onChange={onFormChange} 
                            defaultValue={props.type}
                            placeholder="Account Type" 
                            required
                            isInvalid={typeError}
                            >
                            <option key='blankChoice' hidden value />
                            <option value="individual">Individual</option>
                            <option value="business">Business</option>
                          </Form.Control>
                          <Form.Control.Feedback type="invalid">
                            Please select an account type
                        </Form.Control.Feedback> 
                        </Form.Group>
                        <Dropzone
                            getUploadParams={fileParams}
                            onChangeStatus={onFileChange}
                            accept="image/*"
                            maxFiles={1}
                            inputContent="Drop A File"
                            styles={{
                                dropzone: { width: '100%', height: 200, marginTop:'1%' },
                                dropzoneActive: { borderColor: 'green' },
                            }}            
                        />
                    <Button variant="primary" type="submit">
                      Submit
                    </Button>
              </Form>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={()=>handleClose()}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>completeFunc()}>
            Confirm
          </Button>
        </Modal.Footer> */}
      </Modal>

        
    )

}