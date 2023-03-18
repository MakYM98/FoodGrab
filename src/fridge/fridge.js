import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Table from 'react-bootstrap/Table';
import axios from 'axios'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

delete L.Icon.Default.prototype._getIconUrl;

// Get Leaflet Marker Icons
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});
// Declare Singapore's Longitude and Latitude
const singaporePostion = [1.3521, 103.8198]

function CommunityFridge() {
  // States for Community Fridge page
  const [allFridges, setAllFridges] = useState([])
  const [fridgeLocations, setFridgeLocations] = useState([])
  const [searchFilter, setSearchFilter] = useState('')
  const [toSearch, setToSearch] = useState(false)

  // Function to fetch all fridge locations from database
  const fetchFridges = async () => {
    var queryString = "http://127.0.0.1:8000/api/fridges"
    axios
        .get(queryString)
        .then(response => {
            setFridgeLocations(response.data)
            setAllFridges(response.data)
        })
        .catch(error => console.error(`Error retrieving Login Info: ${error}`))
  }
  // Inital Render
  useEffect(()=>{
    fetchFridges()
  },[])
  // Function to start search
  const searchFunc = ()=>{
    setToSearch(true)
  }
  // Function to Clear Search
  const clearSearch = () => {
      setSearchFilter('')
      setFridgeLocations(allFridges)
      setToSearch(false)
  }
  // Detect Search Bar changes
  const searchBarChange = (e) => {
    setSearchFilter(e)
    setToSearch(false)
  }
  // Detect Key down
  const keyDownFunc = (e) => {
    if(e.key == "Enter"){
      searchFunc()
      setToSearch(true)
    }
  }

  useEffect(()=>{
    if(toSearch){
      var existingFridges = allFridges
        if(setToSearch){
          existingFridges = existingFridges.filter((element) => {
            console.log(element.street)
                return element.street.toLowerCase().includes(searchFilter.toLowerCase())
            })
          setFridgeLocations(existingFridges)
        }
    }
  },[toSearch])

  return (
    <div style={{display:'flex', justifyContent:'center', marginTop:'1%'}}>
      <div style={{width:'95%'}}>
        {/* Leaflet Map Container */}
        <MapContainer center={singaporePostion} zoom={12} scrollWheelZoom={false} 
                        style={{ height: '60vh', width: '60wh!important' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {/* Create Marker for each location retrieved */}
          {
            fridgeLocations.map(location => 
                <Marker position={[location['latitude'], location['longitude']]}>
                  <Popup>
                    {location['street']}
                  </Popup>
                </Marker>
            )
          }
        </MapContainer>
        {/* Location Box Area */}
        <div style={{marginTop:'3%', marginBottom:'5%'}}>
          <h3 style={{textAlign:'left'}}>List of Locations</h3>
          {/* Search Bar */}
          <InputGroup className="mb-3">
                <Form.Control
                    placeholder="Search for Fridge"
                    aria-label="Search"
                    onChange={(e) => {searchBarChange(e.target.value)}}
                    value={searchFilter}
                    onKeyDown={(e) =>{keyDownFunc(e)}}
                />
                {/* Change button depending on situation */}
                {
                    toSearch === false? 
                    <Button type="submit" id="button-addon2"
                            onClick={()=>{searchFunc()}}
                            >
                        Search
                    </Button>
                    :
                    <Button type="submit" id="button-addon2"
                            onClick={()=>{clearSearch()}}
                            >
                        Clear
                    </Button>
                }
                
            </InputGroup>
          {/* Table to represent all locations */}
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Street Name</th>
              </tr>
            </thead>
            <tbody>
              {/* Create a row for each location */}
              {
                fridgeLocations.map(location =>
                  <tr>
                    <td>{location['fridge_id']}</td>
                      <td style={{textAlign:'left'}}>{location['street']}</td>
                  </tr> 
                )
              }
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  )
  }

  export default CommunityFridge
