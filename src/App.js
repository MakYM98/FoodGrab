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

function App() {
  return (
    <div className="App">
      <Header/>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/communityfridge" element={<CommunityFridge/>}/>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
