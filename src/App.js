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
import Article from './home/article';
import Sell from './listing/create_listing';
import CreatedListing from './listing/listing_created';
import Chats from './chat/chats';

function App() {
  const [loggedIn, setLoggedIn] = useState()
  const [userDetails, setUserDetails] = useState()

  const logInFunc = (e, details) => {
    setLoggedIn(e)
    setUserDetails(details)
  }

  const getLoggedIn =()=>{
    return loggedIn
  }

  return (
    <div className="App">
      <Header loggedIn={loggedIn} loginFunc={getLoggedIn} details={userDetails}/>
        <div>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login loginFunc={logInFunc}/>}/>
            <Route path="/communityfridge" element={<CommunityFridge/>}/>
            <Route path="/listings" element={<FoodListings/>}/>
            <Route path="/indvListing/:listing" element={<IndvListing/>}/>
            <Route path="/aboutus" element={<AboutUs/>}/>
            <Route path="/profile/:username" element={<Profile/>}/>
            <Route path="/article/:articleid" element={<Article/>}/>
            <Route path="/sell" element={<Sell/>}/>
            <Route path="/created" element={<CreatedListing/>}/>
            <Route path="/chats" element={<Chats/>}/>
          </Routes>
        </div>
      <Footer/>
    </div>
  );
}

export default App;
