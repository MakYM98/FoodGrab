import React, { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function DeleteModal(props){
    const [show, setShow] = useState(props.visible);
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const navigate = useNavigate()

    useEffect(()=>{setShow(props.visible)},[props.visible])

    const handleClose = () => {
        setShow(false)
        props.openFunc(false)
    }

    const deleteFunc = async () => {
      var queryString = "http://127.0.0.1:8000/api/delete"
      console.log(props.listing_id)
      axios
          .post(queryString,{
              listing_id: props.listing,
          })
          .then(response => {
            if(response.data == 'Deleted'){
              handleClose()
              navigate('/profile')
            }
          })
          .catch(error => console.error(`Error retrieving Login Info: ${error}`))
    }

    return (

        <Modal show={show} >
        <Modal.Header>
          <Modal.Title>Are you sure you want to delete this listing?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          The listing will be removed and you will have to create your listing
          again.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>handleClose()}>
            Close
          </Button>
          <Button variant="danger" onClick={()=>deleteFunc()}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>

        
    )

}