import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import data from "../products";

function Header() {

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
      <div style={{display:'flex', width:'100%', paddingLeft:'5%', paddingTop:'1%',backgroundColor:'#D3D3D3'}}>
        <h1>FoodGrab</h1>
        <h5 style={{display:'flex', alignItems:'center',justifyContent:'center', marginLeft:'1%'}}>Community Fridge</h5>
        <h5 style={{display:'flex', alignItems:'center',justifyContent:'center', marginLeft:'1%', marginRight:'2%'}}>Food Listings</h5>
        <div style={{width:'40%'}}>
          <ReactSearchAutocomplete
            items={data}
            maxResults={15}
            onSearch={handleOnSearch}
            onHover={handleOnHover}
            onSelect={handleOnSelect}
            onFocus={handleOnFocus}
            placeholder="Search for food, location and more"
            onClear={handleOnClear}
            fuseOptions={{ keys: ["name", "description"] }} // Search in the description text as well
            styling={{
              zIndex: 100,
              borderRadius: "5px",
              boxShadow: "none",
              border: "1px solid #e5e5e5",
              height: "5vh",
              placeholderFontSize: "2.5vh",
              fontSize: "2.2vh",
            }}
            className="search" // To display it on top of the search box below
          />
        </div>
        <h5 style={{display:'flex', alignItems:'center',justifyContent:'center', marginLeft:'10%'}}>Register</h5>
        <h5 style={{display:'flex', alignItems:'center',justifyContent:'center', marginLeft:'1%'}}>Login</h5>
        
      </div>
    );
  }
  
  export default Header;