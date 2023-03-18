import React, { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import axios from 'axios';

export default function AcceptModal(props){
    // States for Accept Modal
    const [show, setShow] = useState(props.visible);
    // Update state when Visible Variable changes
    useEffect(()=>{setShow(props.visible)},[props.visible])
    // Function to close this modal
    const handleClose = () => {
        setShow(false)
        props.openFunc(false)
    }
    // Function to pass Reserve product 
    const acceptFunc = async () => {
      var queryString = "http://127.0.0.1:8000/api/list_status"
      axios
          .post(queryString,{
              buyer: props.buyer,
              listing_id: props.listing,
              status:'accepted'
          })
          .then(response => {
            // If response returns success, close modal
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
            Are you sure you want to reserve the product for this user?
          </Modal.Title>
        </Modal.Header>
          {/* Modal Message */}
        <Modal.Body>
          This will signal the buyer that this item is reserved for them. 
        </Modal.Body>
          {/* Modal Buttons */}
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