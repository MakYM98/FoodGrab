import React, { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

export default function ReviewModal(props){
    // States for Review Modal
    const [show, setShow] = useState(props.visible);
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [comment, setComment] = useState('');
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("account")))
    // Determine whether to show modal
    useEffect(()=>{setShow(props.visible)},[props.visible])
    // Function to close modal
    const handleClose = () => {
        setShow(false)
        props.openFunc(false)
        console.log(comment)
    }
    // Check who is the one being reviewed
    const getReviewee = () => {
      if(props.buyer == user.user_id){
        return props.seller
      }else{
        return props.buyer
      }
    }
    // Get the Role of the User
    const getUserRole = () => {
      if(props.buyer == user.user_id){
        return 'Buyer'
      }else{
        return 'Seller'
      }
    }
    // Function to Post Review
    const reviewFunc = async () => {
      var queryString = "http://127.0.0.1:8000/api/create_review"
      axios
          .post(queryString,{
            reviewer: user.user_id,
            reviewee:getReviewee(),
            rating: rating,
            comment:comment,
            user: getUserRole(),
            chat_id:props.chat_id
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
        <Modal.Header>
          {/* Modal Title */}
          <Modal.Title>How was your experience?</Modal.Title>
        </Modal.Header>
        
        <Modal.Body>
          Leave a Review for the user
        {/* Form to key in user review comment */}
        <Form.Group className="mb-3" controlId="message">
          <Form.Control 
              name="message" 
              type="text" 
              placeholder="Message"
              onChange={(e) => {
                setComment(e.target.value);
            }}
              required
          />
        </Form.Group>
        {/* Form to allow users to rate other users */}
        <div className="star-rating">
          {/* Using buttons as a way for users to select number of stars */}
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
        {/* Form Buttons */}
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>handleClose()}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>reviewFunc()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

        
    )

}