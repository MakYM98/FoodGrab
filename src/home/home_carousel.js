import Carousel from 'react-bootstrap/Carousel';
import SlideShowOne from '../img/slideshow_1.jpg'

function HomeCarousel() {
  return (
    <Carousel style={{width:'100%',backgroundColor:'black', margin:'auto'}}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={SlideShowOne}
          alt="First slide"
          width='1500px'
          height='500px'
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={SlideShowOne}
          alt="Second slide"
          width='1500px'
          height='500px'
        />

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={SlideShowOne}
          alt="Third slide"
          width='1500px'
          height='500px'
        />

        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default HomeCarousel;