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

function App() {
  const [loggedIn, setLoggedIn] = useState()

  const logInFunc = (e) => {
    setLoggedIn(e)
  }

  const getLoggedIn =()=>{
    return loggedIn
  }

  console.log(loggedIn)

  return (
    <div className="App">
      <Header loggedIn={loggedIn} loginFunc={getLoggedIn}/>
        <div>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login cover="register" loginFunc={logInFunc}/>}/>
            <Route path="/register" element={<Login cover="login" loginFunc={logInFunc}/>}/>
            <Route path="/communityfridge" element={<CommunityFridge/>}/>
            <Route path="/listings" element={<FoodListings/>}/>
            <Route path="/indvListing" element={<IndvListing/>}/>
            <Route path="/aboutus" element={<AboutUs/>}/>
            <Route path="/profile" element={<Profile/>}/>
          </Routes>
        </div>
      <Footer/>
    </div>
  );
}

export default App;
