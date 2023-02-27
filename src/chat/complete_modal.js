import React, { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

export default function CompleteModal(props){
    const [show, setShow] = useState(props.visible);
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    useEffect(()=>{setShow(props.visible)},[props.visible])

    const handleClose = () => {
        setShow(false)
        props.openFunc(false)
    }

    const completeFunc = async () => {
      var queryString = "http://127.0.0.1:8000/api/list_status"
      axios
          .post(queryString,{
              buyer: props.buyer,
              listing_id: props.listing,
              status:'completed'
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
            Are you sure you want to mark this item as sold?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          This signifies that the item is sold and that the transaction has 
          went through.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>handleClose()}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>completeFunc()}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>

        
    )

}