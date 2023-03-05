import React, {useEffect, useState} from 'react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import data from "../products";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import Hamburger from 'hamburger-react'
import { AiOutlineUser } from 'react-icons/ai';
import { IoChatboxOutline } from 'react-icons/io5';
import { AiOutlineArrowDown } from 'react-icons/ai';
import { Button } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Header(props) {
  const [isOpen, setOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [userDetails, setUserDetails] = useState(props.details)
  const [loginDrop, setLoginDrop] = useState(false)
  const [account, setAccount] = useState(JSON.parse(localStorage.getItem("account")))

  const navigate = useNavigate()

  window.addEventListener('storage', () => {
    console.log("Change to local storage!");
    setAccount(JSON.parse(localStorage.getItem("account")))
})

  useEffect(()=>{
    setUserDetails(props.details)
  },[props.details])

  function handleOpenDrawerButton() {
    setDrawerOpen(!drawerOpen);
  }

  function handleBackdropClick() {
    setDrawerOpen(false);
    setOpen(false);
  }

  const showDropdown = (e)=>{
    setLoginDrop(!loginDrop);
  }
  const hideDropdown = e => {
    setLoginDrop(false);
  }

  function redirect(type){
    navigate('/login', {
      state:{
        type:type
      }
    });
  }

  function sellPage(){
    navigate('/sell', {
      state:{
        user_id:account.user_id
      }
    });
  }

  function chatPage(){
    navigate('/chats', {
      state:{
        seller_id:null,
        user_id: account.user_id,
        listing_id:null,
      }
    });
  }

  function logoutFunc(){
    localStorage.removeItem("account");
    navigate('/');
  }

  function profileFunc(){
    navigate(`/profile`);
  }

  const navigateFunc = (loc) => {
    navigate(loc)
    props.close()
  }

  
  const handleOnSearch = (string, results) => {
    console.log(string, results);
  };

  const handleOnHover = (result) => {
    console.log(result);
  };

  const handleOnSelect = (item) => {
    window.location = `/products/${item.id}`;
  };

  const handleOnFocus = () => {
    console.log("Focused");
  };

  const handleOnClear = () => {
    console.log("Cleared");
  };

    return (
      <div style={{display:'flex', width:'100%', paddingLeft:'1%', paddingTop:'0.5%', backgroundColor:'#d5ecd5'}}>
          <div style={{width:'100%', padding:'0.5%'}}>
              {
                localStorage.getItem('account') !== null? 
                <div style={{display:'flex', justifyContent:'end'}}>
                  <div id="navArea">
                    <h1 id="navHeader" onClick={()=>{navigate('/')}}>FoodGrab</h1>
                    <h5 className="allHeaders" onClick={()=>{navigateFunc('/aboutus')}}>About Us</h5>
                    <h5 className="allHeaders" onClick={()=>{navigateFunc('/communityfridge')}}>Community Fridge</h5>
                    <h5 className="allHeaders" onClick={()=>{navigateFunc('/listings')}}>Food Listings</h5>
                  </div>
                  
                  <Nav onMouseEnter={showDropdown} onMouseLeave={hideDropdown}>
                    <NavDropdown
                      id="nav-dropdown-dark-example"
                      title={
                      <div id="profDiv">
                        <AiOutlineUser size={40} color='black'/>
                        <h5 id="userName">{account.username}</h5>
                        <AiOutlineArrowDown size={15} color='black' id='profArrow'/>
                      </div>}
                      menuVariant="dark"
                      show={loginDrop}
                      
                    >
                      <NavDropdown.Item onClick={()=>{profileFunc()}}>
                        Profile
                      </NavDropdown.Item>
                      <NavDropdown.Item onClick={()=>{chatPage()}}>
                        Chats
                      </NavDropdown.Item>
                      <NavDropdown.Item onClick={()=>{sellPage()}}>
                        Sell
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item onClick={()=>{logoutFunc()}}>
                        Logout
                      </NavDropdown.Item>
                    </NavDropdown>
                  </Nav>
                  <div style={{display:'flex', marginRight:'1%', alignItems:'center'}} onMouseEnter={showDropdown} onMouseLeave={hideDropdown}>
                  </div>
                </div>
                : 
                <div style={{display:'flex', justifyContent:'end'}}>
                  <div id="navArea">
                    <h1 id="navHeader" onClick={()=>{navigate('/')}}>FoodGrab</h1>
                    <h5 className="allHeaders" onClick={()=>{navigateFunc('/aboutus')}}>About Us</h5>
                    <h5 className="allHeaders" onClick={()=>{navigateFunc('/communityfridge')}}>Community Fridge</h5>
                    <h5 className="allHeaders" onClick={()=>{navigateFunc('/listings')}}>Food Listings</h5>
                  </div>
                  
                  <h4 onClick={()=>{redirect('login')}} className="accountBtn" id="loginBtn">Login</h4>
                  <h4 onClick={()=>{redirect('register')}} className="accountBtn" id="regBtn">Register</h4>
                </div>
              }
          </div>


        
      </div>
    );
  }
  
  export default Header;