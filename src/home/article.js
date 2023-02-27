import Carousel from 'react-bootstrap/Carousel';
import SlideShowOne from '../img/slide_1.jpg';
import SlideShowTwo from '../img/slide_2.jpg';
import SlideShowThree from '../img/slide_3.jpg';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import "./home.css"
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useNavigate } from "react-router-dom";

function Article(props) {
  const routerNews = useLocation()
  const articleData = routerNews.state
  const navigate = useNavigate()
  
  return (
    <div id="articleDiv">
        <h4 id="backButton"onClick={()=>{navigate('/')}}><AiOutlineArrowLeft/>Back</h4>
        <img
            className="d-block w-100"
            src={articleData.news_id == 1? SlideShowOne: articleData.news_id == 2? SlideShowTwo:SlideShowThree}
            alt="Slider image"
            width='1500px'
            height='500px'
        />

      <div id="contentDiv">
        <div id="articleHeader">
          <h1>{articleData.title}</h1>
          <p>By FoodGrab | 06/02/2023</p>
        </div>
        

        <div id="articleContent">
          <p>{articleData.content}</p>
        </div>
      </div>


     


    </div>
  );
}

export default Article;