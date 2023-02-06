import Carousel from 'react-bootstrap/Carousel';
import SlideShowOne from '../img/slide_1.jpg';
import SlideShowTwo from '../img/slide_2.jpg';
import SlideShowThree from '../img/slide_3.jpg';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

function HomeCarousel() {
  const [newsData, setNewsData] = useState([])
  const navigate = useNavigate()

  useEffect(()=>{
    fetchNews()
  },[])

  const fetchNews = async () => {
    var queryString = "http://127.0.0.1:8000/api/news"
    axios
        .get(queryString)
        .then(response => {
          console.log(response.data)
            // Save all the data in a Normal Array (For Sorting)
            setNewsData(response.data)
        })
        .catch(error => console.error(`Error retrieving Login Info: ${error}`))
  }

  const articleFunc = (news) => {
    var redirect_url = "/article/" + news.news_id
    navigate(redirect_url, {
      state:{
        news_id:news.news_id,
        title: news.title,
        content:news.content
      }
    });
  }


  return (
    <Carousel style={{width:'100%',backgroundColor:'black', margin:'auto'}} >
      {
        newsData.map(news => 
          <Carousel.Item onClick={()=>{articleFunc(news)}}>
            <img
              className="d-block w-100"
              src={news.news_id == 1? SlideShowOne: news.news_id == 2? SlideShowTwo:SlideShowThree}
              alt="Slider image"
              width='1500px'
              height='500px'
            />
            <Carousel.Caption>
              <h3 style={{background:'black'}}>{news.title}</h3>
            </Carousel.Caption>
          </Carousel.Item>
        )
      }

    </Carousel>
  );
}

export default HomeCarousel;