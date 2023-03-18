import React, { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function DeleteModal(props){
    // States for Delete Modal
    const [show, setShow] = useState(props.visible);
    const navigate = useNavigate()
    // Determine whether to show this modal
    useEffect(()=>{setShow(props.visible)},[props.visible])
    // Function to close this modal
    const handleClose = () => {
        setShow(false)
        props.openFunc(false)
    }
    // Function to delete Listing
    const deleteFunc = async () => {
      var queryString = "http://127.0.0.1:8000/api/delete"
      axios
          .post(queryString,{
              listing_id: props.listing,
          })
          .then(response => {
            // If Successful, navigate to user profile page
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
          {/* Modal Title */}
          <Modal.Title>Are you sure you want to delete this listing?</Modal.Title>
        </Modal.Header>
        {/* Modal message */}
        <Modal.Body>
          The listing will be removed and you will have to create your listing
          again.
        </Modal.Body>
        {/* Modal Buttons */}
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