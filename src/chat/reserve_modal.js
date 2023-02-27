import React, { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import axios from "axios";

export default function ReserveModal(props){
    const [show, setShow] = useState(props.visible);
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    useEffect(()=>{setShow(props.visible)},[props.visible])

    const handleClose = () => {
        setShow(false)
        props.openFunc(false)
    }

    const interestFunc = async () => {
      var queryString = "http://127.0.0.1:8000/api/interested"
      axios
          .post(queryString,{
              chat_id: props.chat_id,
              interest:true
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
          <Modal.Title>Are you sure you want to express interest in this item?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          The seller will have to accept the request on their side for the 
          transaction to be confirmed
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>handleClose()}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>interestFunc()}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>

        
    )

}