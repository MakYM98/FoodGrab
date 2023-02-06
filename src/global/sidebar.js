import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

function SlideDrawer(props){
  let drawerClasses = props.show ? "side-drawer open" : "side-drawer";
  const navigate = useNavigate()

  const navigateFunc = (loc) => {
    navigate(loc)
    props.close()
  }

  return (
    <div className={drawerClasses}>
      <h3 id="sideBarX" onClick={props.close}>X</h3>
      <h4 className="sideBarName" style={{marginTop:'20%'}} onClick={()=>{navigateFunc('/')}}>Home</h4>
      <h4 className="sideBarName" onClick={()=>{navigateFunc('/aboutus')}}>About Us</h4>
      <h4 className="sideBarName" onClick={()=>{navigateFunc('/communityfridge')}}>Community Fridge</h4>
      <h4 className="sideBarName" onClick={()=>{navigateFunc('/listings')}}>Food Listings</h4>
    </div>
  );
};

export default SlideDrawer;
