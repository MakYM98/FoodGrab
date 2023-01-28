import React from "react";
import "./Header.css";

function SlideDrawer(props){
  let drawerClasses = props.show ? "side-drawer open" : "side-drawer";

  return (
    <div className={drawerClasses}>
      <h3 id="sideBarX" onClick={props.close}>X</h3>
      <h4 style={{textAlign:'left', marginTop:'20%', marginLeft:'5%'}}><a href="/" className="navLinks">Home</a></h4>
      <h4 style={{textAlign:'left', marginTop:'10%', marginLeft:'5%'}}><a href="/aboutus" className="navLinks">About Us</a></h4>
      <h4 style={{textAlign:'left', marginTop:'10%', marginLeft:'5%'}}><a href="/communityfridge" className="navLinks">Community Fridge</a></h4>
      <h4 style={{textAlign:'left', marginTop:'10%', marginLeft:'5%'}}><a href="/listings" className="navLinks">Food Listings</a></h4>
      <div style={{display:'flex', height:'100%'}}>
        <div style={{position:'absolute', bottom:0, width:'100%'}}>
            <div style={{display:'flex', justifyContent:'center'}}>
            <a href="/login" className="btn btn-primary" color="white">Login</a>
            <a href="/register" className="btn btn-primary">Register</a>
            </div>

        </div>
        
      </div>
    </div>
  );
};

export default SlideDrawer;
