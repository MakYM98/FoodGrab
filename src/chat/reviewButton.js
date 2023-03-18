import React from "react";
import './chat.css'
import { Button } from 'react-bootstrap';

function ReviewButton(props){
    // Get Logged In User's Details
    var account = JSON.parse(localStorage.getItem("account"));
    // If Logged in User is the Seller
    if(account.user_id == props.seller){
        // If transaction Completed and Reviewed, Show Sold Button
        if(props.status=='completed' && props.interested=='reviewed'){
            return(
                <Button style={{float:'left'}} disabled={true}>
                    Sold
                </Button>
            )
        // If item available and user interested, Show Accept Button
        }else if(props.status=='available' && props.interested=='True'){
            return(
                <Button style={{float:'left'}} onClick={
                    ()=>props.openAccept(true)}
                >
                    Accept
                </Button>
            )
        // If item available, no buttons                                  
        }else if(props.status=='available'){
            return(
                <div></div>
            )
        // If Logged In User accepted, show Complete Button
        }else if(props.status=='accepted'){
            return(
                <Button style={{float:'left'}} onClick={()=>props.openComplete(true)}>
                    Complete
                </Button>
            )
        // If transaction completed but not yet reviewed, show Review Button
        }else if(props.status=='completed'){
            return(
                <Button style={{float:'left'}} onClick={()=>props.openReview(true)}>
                    Review
                </Button>
            )
        }
    // If Logged In User is the buyer
    }else if(account.user_id == props.buyer){
        // If transaction Completed and Reviewed, Show Sold Button
        if(props.status=='completed' && props.interested=='reviewed'){
            return(
                <Button style={{float:'left'}} disabled={true}>
                    Sold
                </Button>
            )
        // If item available and logged in user interested, Show Expressed Interest Button
        }else if(props.status=='available' && props.interested=='True'){
            return(
                <Button style={{float:'left'}} disabled={true}>
                    Expressed Interest
                </Button>
            )
        // If item available , Show Express Interest Button                                       
        }else if(props.status=='available'){
            return(
                <Button style={{float:'left'}} onClick={()=>props.openReserve(true)}>
                    Express Interest
                </Button>
            )
        // If item accepted by seller, show Accepted Button                                      
        }else if(props.status=='accepted'){
            return(
                <Button style={{float:'left'}} disabled={true}>
                    Accepted
                </Button>
            )
        // If transaction completed but not yet reviewed, show review button
        }else if(props.status=='completed'){
            return(
                <Button style={{float:'left'}} onClick={()=>props.openReview(true)}>
                    Review
                </Button>
            )
        }
    }
};

export default ReviewButton;
