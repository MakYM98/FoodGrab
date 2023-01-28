import React, {useState} from 'react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import data from "../products";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Hamburger from 'hamburger-react'
import SlideDrawer from './sidebar';

function Header(props) {
  const [isOpen, setOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false);

  function handleOpenDrawerButton() {
    setDrawerOpen(!drawerOpen);
  }

  function handleBackdropClick() {
    setDrawerOpen(false);
    setOpen(false);
  }

  const handleOnSearch = (string, results) => {
    console.log(string, results);
  };

  const handleOnHover = (result) => {
    console.log(result);
  };

  const handleOnSelect = (item) => {
    window.location = `/products/${item.id}`;
  };

  const handleOnFocus = () => {
    console.log("Focused");
  };

  const handleOnClear = () => {
    console.log("Cleared");
  };

    return (
      <div style={{display:'flex', width:'100%', paddingLeft:'5%', paddingTop:'1%',backgroundColor:'#5F9EA0'}}>
        <h1><a href='/' className='navLinks'>FoodGrab</a></h1>
        <div>
          <SlideDrawer show={drawerOpen} close={handleBackdropClick}/>
          {drawerOpen}
        </div>
        <div style={{width:'100%', marginLeft:'2%'}}>
          <ReactSearchAutocomplete
            items={data}
            maxResults={15}
            onSearch={handleOnSearch}
            onHover={handleOnHover}
            onSelect={handleOnSelect}
            onFocus={handleOnFocus}
            placeholder="Search for food, location and more"
            onClear={handleOnClear}
            fuseOptions={{ keys: ["name", "description"] }}
            styling={{
              zIndex: 100,
              borderRadius: "5px",
              boxShadow: "none",
              border: "1px solid #e5e5e5",
              height: "5vh",
              placeholderFontSize: "2.5vh",
              fontSize: "2.2vh",
            }}
            className="search"
          />
        </div>

        <div style={{width:'100%', display:'flex', justifyContent:'end', marginRight:'3%', verticalAlign:'middle'}}>
          <Hamburger toggled={isOpen} toggle={setOpen} onToggle={handleOpenDrawerButton} color={"white"}/>
        </div>
      </div>
    );
  }
  
  export default Header;