import React, { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

export default function ReserveModal(props){
    // States for Interested Modal
    const [show, setShow] = useState(props.visible);
    // Determine whether to show modal
    useEffect(()=>{setShow(props.visible)},[props.visible])
    // Function to close modal
    const handleClose = () => {
        setShow(false)
        props.openFunc(false)
    }

    return (

        <Modal show={show} >
        {/* Modal Title */}
        <Modal.Header closeButton>
          <Modal.Title>Are you sure you want to reserve?</Modal.Title>
        </Modal.Header>
        <Modal.Body></Modal.Body>
        {/* Modal Buttons */}
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>handleClose()}>
            Close
          </Button>
          <Button variant="primary" >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>

        
    )

}