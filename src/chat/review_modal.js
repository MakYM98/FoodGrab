import React, { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

export default function ReviewModal(props){
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
          <Modal.Title>How was your experience?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        Leave a Review for the seller

        <Form.Group className="mb-3" controlId="message">
                            <Form.Control 
                                name="message" 
                                type="text" 
                                placeholder="Message"
                                required
                            />
                            </Form.Group>

        <div className="star-rating">
        {[...Array(5)].map((star, index) => {
            index += 1;
            return (
            <button
                type="button"
                key={index}
                id="starButton"
                className={index <= (hover || rating) ? "on" : "off"}
                onClick={() => setRating(index)}
                onMouseEnter={() => setHover(index)}
                onMouseLeave={() => setHover(rating)}
            >
                <span className="star">&#9733;</span>
            </button>
            );
        })}
        </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>handleClose()}>
            Close
          </Button>
          <Button variant="primary" >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

        
    )

}