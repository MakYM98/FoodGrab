import React, { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

export default function ReserveModal(props){
    const [show, setShow] = useState(props.visible);
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    useEffect(()=>{setShow(props.visible)},[props.visible])

    const handleClose = () => {
        setShow(false)
        props.openFunc(false)
    }

    return (

        <Modal show={show} >
        <Modal.Header closeButton>
          <Modal.Title>Are you sure you want to reserve?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Not collecting your products after reservation will result in banning
          of you account.
        </Modal.Body>
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