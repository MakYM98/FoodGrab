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
import Home from './home/home';
import CommunityFridge from './fridge/fridge';
import FoodListings from './listing/listing';
import React, {useState} from 'react';
import IndvListing from './listing/indv_listing'
import Footer from './global/footer';

function App() {
  return (
    <div className="App">
      <Header/>
        <div>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login cover="register"/>}/>
            <Route path="/register" element={<Login cover="login"/>}/>
            <Route path="/communityfridge" element={<CommunityFridge/>}/>
            <Route path="/listings" element={<FoodListings/>}/>
            <Route path="/indvListing" element={<IndvListing/>}/>
          </Routes>
        </div>
      <Footer/>
    </div>
  );
}

export default App;
