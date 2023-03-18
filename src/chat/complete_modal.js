import React, { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

export default function CompleteModal(props){
    // States for Complete Modal
    const [show, setShow] = useState(props.visible);
    // Determine whether to show modal
    useEffect(()=>{setShow(props.visible)},[props.visible])
    // Function to close modal
    const handleClose = () => {
        setShow(false)
        props.openFunc(false)
    }
    // Function to complete sale
    const completeFunc = async () => {
      var queryString = "http://127.0.0.1:8000/api/list_status"
      axios
          .post(queryString,{
              buyer: props.buyer,
              listing_id: props.listing,
              status:'completed'
          })
          .then(response => {
            // If Successful, close modal
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
          {/* Modal Title */}
          <Modal.Title>
            Are you sure you want to mark this item as sold?
          </Modal.Title>
        </Modal.Header>
        {/* Modal Mesage */}
        <Modal.Body>
          This signifies that the item is sold and that the transaction has 
          went through.
        </Modal.Body>
        {/* Modal Buttons */}
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