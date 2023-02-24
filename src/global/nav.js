import React, {useEffect, useState} from 'react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import data from "../products";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import Hamburger from 'hamburger-react'
import SlideDrawer from './sidebar';
import { AiOutlineUser } from 'react-icons/ai';
import { IoChatboxOutline } from 'react-icons/io5';
import { Button } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Header(props) {
  const [isOpen, setOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [userDetails, setUserDetails] = useState(props.details)
  const [loginDrop, setLoginDrop] = useState(false)

  const navigate = useNavigate()

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
        user_id:userDetails.user_id
      }
    });
  }

  function chatPage(){
    var account = JSON.parse(localStorage.getItem("account"));
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
      <div style={{display:'flex', width:'100%', paddingLeft:'5%', paddingTop:'1%',backgroundColor:'#5F9EA0'}}>
        <div style={{display:'flex', justifyContent:'start', marginRight:'3%', verticalAlign:'middle'}}>
          <Hamburger toggled={isOpen} toggle={setOpen} onToggle={handleOpenDrawerButton} color={"white"}/>
        </div>
        <div>
          <SlideDrawer show={drawerOpen} close={handleBackdropClick}/>
          {drawerOpen}
        </div>
        {/* <div style={{width:'100%', marginLeft:'2%'}}>
          <ReactSearchAutocomplete
            items={data}
            maxResults={15}
            onSearch={handleOnSearch}
            onHover={handleOnHover}
            onSelect={handleOnSelect}
            onFocus={handleOnFocus}
            placeholder="Search for food, location and more"
            onClear={handleOnClear}
            fuseOptions={{ keys: ["name", "description"] }}
            styling={{
              zIndex: 100,
              borderRadius: "5px",
              boxShadow: "none",
              border: "1px solid #e5e5e5",
              height: "5vh",
              placeholderFontSize: "2.5vh",
              fontSize: "2.2vh",
            }}
            className="search"
          />
        </div> */}

          <div style={{width:'100%'}}>
              {
                localStorage.getItem('account') !== null? 

                <div style={{display:'flex', justifyContent:'end'}}>
                  <h1 id="navHeader" onClick={()=>{navigate('/')}}>FoodGrab</h1>
                  <Nav onMouseEnter={showDropdown} onMouseLeave={hideDropdown}>
                    <NavDropdown
                      id="nav-dropdown-dark-example"
                      title={<div><AiOutlineUser size={40} color='white'/>
                      <h5 id="userName">{userDetails === undefined? 'Username': userDetails.username}</h5></div>}
                      menuVariant="dark"
                      show={loginDrop}
                    >
                      <NavDropdown.Item href="#action/3.1">
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
                  <h1 id="navHeader" onClick={()=>{navigate('/')}}>FoodGrab</h1>
                  <h4 onClick={()=>{redirect('login')}} className="accountBtn" id="loginBtn">Login</h4>
                  <h4 onClick={()=>{redirect('register')}} className="accountBtn" id="regBtn">Register</h4>
                </div>
              }
          </div>


        
      </div>
    );
  }
  
  export default Header;