function CreatedListing(props) {
  const routerNews = useLocation()
  const articleData = routerNews.state

  return (
    <div id="articleDiv">
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

export default CreatedListing;