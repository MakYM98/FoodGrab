import React, {useEffect, useState} from 'react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import data from "../products";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import Hamburger from 'hamburger-react'
import { IoChatboxOutline, IoLogOutOutline } from 'react-icons/io5';
import { AiOutlineArrowDown, AiOutlineUser } from 'react-icons/ai';
import { Button } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Avatar from '../img/img_avatar.png'

function Header(props) {
  const [isOpen, setOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [userDetails, setUserDetails] = useState(props.details)
  const [loginDrop, setLoginDrop] = useState(false)
  const [account, setAccount] = useState(JSON.parse(localStorage.getItem("account")))

  const navigate = useNavigate()

  window.addEventListener('storage', () => {
    setAccount(JSON.parse(localStorage.getItem("account")))
  })

  useEffect(()=>{
    setUserDetails(props.details)
  },[props.details])

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

  console.log(account)
    return (
      <div style={{display:'flex', width:'100%', paddingLeft:'1%', paddingTop:'0.5%', backgroundColor:'#d5ecd5'}}>
          <div style={{width:'100%', padding:'0.5%'}}>
              {
                localStorage.getItem('account') !== null? 
                <div style={{display:'flex', justifyContent:'end'}}>
                  {/* Area for all Navigation Buttons */}
                  <div id="navArea">
                    <h1 id="navHeader" onClick={()=>{navigateFunc('/')}}>FoodGrab</h1>
                    {/* Nav Header for About Us Page */}
                    <h5 className="allHeaders"  id="aboutUsNav"
                        onClick={()=>{navigateFunc('/aboutus')}}
                        style={{paddingLeft:'3%'}}>
                          About Us
                    </h5>
                    {/* Nav Header for Community Fridge Page */}
                    <h5 className="allHeaders" id="fridgeNav"
                        onClick={()=>{navigateFunc('/communityfridge')}}>
                          Community Fridge
                    
                    </h5>
                    {/* Nav Header for Listing Page */}
                    <h5 className="allHeaders" id="listingNav"
                        onClick={()=>{navigateFunc('/listings')}}>
                          Food Listings
                    </h5>
                  </div>
                      <div id="profDiv">
                        <img
                          src={
                            account.img === null | account.img === undefined? 
                            Avatar
                            :
                            `http://127.0.0.1:8000${account.img}`
                          }
                          style={{width:'40px', 
                                  height:'40px',
                                  borderRadius:'100px',
                                  marginRight:'10px'
                                }}
                        />
                        {/* User Name */}
                        <h5 id="userName">{account.username}</h5>
                        {/* Profile Icons */}
                        <div className="navIcons">
                          <AiOutlineUser size={25} color='black'
                                        onClick={()=>{profileFunc()}}
                                        />
                          <span class="tooltiptext">Profile</span>
                        </div>
                        {/* Chat Box Icons */}
                        <div className="navIcons">
                        <IoChatboxOutline size={25} color='black'
                                      onClick={()=>{chatPage()}}
                                      className="navIcons"/>
                          <span class="tooltiptext">Chats</span>
                        </div>
                        {/* Log Out Icons */}
                        <div className="navIcons">
                        <IoLogOutOutline size={25} color='black'
                                      onClick={()=>{logoutFunc()}}
                                      className="navIcons"/>
                          <span class="tooltiptext">Logout</span>
                        </div>
                        {/* Sell Button */}
                        <Button onClick={()=>{sellPage()}}>
                            Sell
                        </Button>
                      </div>
                  <div style={{display:'flex', marginRight:'1%', alignItems:'center'}} 
                  onMouseEnter={showDropdown} onMouseLeave={hideDropdown}>
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