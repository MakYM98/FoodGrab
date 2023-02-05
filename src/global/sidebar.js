import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

function SlideDrawer(props){
  let drawerClasses = props.show ? "side-drawer open" : "side-drawer";
  const navigate = useNavigate()

  return (
    <div className={drawerClasses}>
      <h3 id="sideBarX" onClick={props.close}>X</h3>
      <h4 className="sideBarName" style={{marginTop:'20%'}} onClick={()=>{navigate('/')}}>Home</h4>
      <h4 className="sideBarName" onClick={()=>{navigate('/aboutus')}}>About Us</h4>
      <h4 className="sideBarName" onClick={()=>{navigate('/communityfridge')}}>Community Fridge</h4>
      <h4 className="sideBarName" onClick={()=>{navigate('/listings')}}>Food Listings</h4>
    </div>
  );
};

export default SlideDrawer;
