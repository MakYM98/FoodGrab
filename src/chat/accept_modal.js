import React, { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

export default function AcceptModal(props){
    const [show, setShow] = useState(props.visible);
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    useEffect(()=>{setShow(props.visible)},[props.visible])

    const handleClose = () => {
        setShow(false)
        props.openFunc(false)
    }

    const acceptFunc = async () => {
      var queryString = "http://127.0.0.1:8000/api/list_status"
      axios
          .post(queryString,{
              buyer: props.buyer,
              listing_id: props.listing,
              status:'accepted'
          })
          .then(response => {
            if(response.data == 'Success'){
              setShow(false)
              props.openFunc(false)
            }
          })
          .catch(error => console.error(`Error retrieving Login Info: ${error}`))
    }

    return (

        <Modal show={show} >
        <Modal.Header closeButton>
          <Modal.Title>
            Are you sure you want to reserve the product for this user?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          This will signal the buyer that this item is reserved for them. 
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>handleClose()}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>acceptFunc()}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>

        
    )

}