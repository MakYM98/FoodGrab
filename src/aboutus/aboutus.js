import React from 'react';
import AboutUsOne from '../img/aboutus1.jpg'
import './aboutus.css';

function AboutUs() {
    return (
      <div style={{height:'100%', width:'100%'}}>
        <div style={{display:'table',height:'100%', width:'100%',justifyContent:'center', paddingLeft:'7%', paddingRight:'10%',
        paddingTop:'3%', paddingBottom:'3%'}}>
            <div style={{display:'table-cell',verticalAlign:'middle', width:'60%', paddingRight:"3%"}}>
                <h1 id="aboutTitle">FoodGrab's Story</h1>
                <p>
                    Food wastage has been a huge issue in many
                    countries and with the rising cost of living, many 
                    people are unable to afford nutritious food.
                    According to the National Environment Agency in 
                    Singapore, more than 816,000 tons of food waste were generated. On a global scale, 1.3 billion tons of 
                    food were wasted in a year and it accounted for a 
                    third of the world's food every year. This numbers
                    have inspired me to create a project for my final 
                    year in hopes to help fight against food wastage.
                </p>

                <p>
                It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
                </p>

                <p>
                It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
                </p>
            </div>

            <img
                className="d-block w-100"
                src={AboutUsOne}
                alt="First slide"
                height='800px'
                width='500px'
            />
        </div>
      </div>
    )
  }

  export default AboutUs
