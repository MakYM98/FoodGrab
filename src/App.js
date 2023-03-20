import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Header from './global/nav';
import Login from './account/login';
import Profile from './account/profile';
import Home from './home/home';
import CommunityFridge from './fridge/fridge';
import FoodListings from './listing/listing';
import React, {useState} from 'react';
import IndvListing from './listing/indv_listing'
import Footer from './global/footer';
import AboutUs from './aboutus/aboutus';
import Sell from './listing/create_listing';
import CreatedListing from './listing/listing_created';
import Chats from './chat/chats';
import { BsFillChatFill } from 'react-icons/bs';
import { useNavigate } from "react-router-dom";
import OtherProfile from './account/other_profile';

function App() {
  // States for root page
  const [loggedIn, setLoggedIn] = useState()
  const [userDetails, setUserDetails] = useState()
  // Function for Login
  const logInFunc = (e, details) => {
    console.log(e)
    setLoggedIn(e)
    setUserDetails(details)
  }
  // Function to check if user is logged in
  const getLoggedIn =()=>{
    return loggedIn
  }

  return (
    <div className="App">
      {/* Acts as a form of navigation and show what page the route displays */}
      <Header loggedIn={loggedIn} loginFunc={getLoggedIn} details={userDetails}/>
        <div>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login loginFunc={logInFunc}/>}/>
            <Route path="/communityfridge" element={<CommunityFridge/>}/>
            <Route path="/listings" element={<FoodListings/>}/>
            <Route path="/indvListing/:listing" element={<IndvListing/>}/>
            <Route path="/aboutus" element={<AboutUs/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/profile/:username" element={<OtherProfile/>}/>
            <Route path="/sell" element={<Sell/>}/>
            <Route path="/created" element={<CreatedListing/>}/>
            <Route path="/chats" element={<Chats/>}/>
          </Routes>
        </div>
    </div>
  );
}

export default App;
