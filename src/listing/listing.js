import React, { Component, useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import ListingCard from '../global/listing_card';
import Select from 'react-select'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

// Styles for the Dropdowns
const dropdownStyles = {
    control: styles=>({...styles, minHeight:50, borderRadius:20, textAlign:'left'})
}
// Options for Sorting
const sortOptions = [
    {value:'Recent', label:'Recent'},
    {value:'Price - Low to High', label:'Price - Low to High'},
    {value:'Price - High to Low', label:'Price - High to Low'},
    {value:'Location', label:'Location'},
]
// Options for Price Dropdown
const priceOptions = [
    {value:'For Sale', label:'For Sale'},
    {value:'For Free', label:'For Free'},
]

function FoodListings() {
    // States for Food Listing Page
    const [availableData, setAvailableData] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const [visibleData, setVisibleData] = useState([])
    const [chunkCount, setChunkCount] = useState(2)
    // Store all User selected locations in Filter
    const [locFilter, setLocFilter] = useState([])
    const [priceFilter, setPriceFilter] = useState('')
    const [sortFilter, setSortFilter] = useState('')
    const [searchFilter, setSearchFilter] = useState('')
    const [toSearch, setToSearch] = useState(false)
    // Used to Determine the visiblility of "Show More" Button
    const [moreData, setMoreData] = useState(true)  
    // Store all Dropdown values for Location Filter
    const [locationOptions, setLocationOptions] = useState([])
    // Store Empty Spot Count
    const [emptySpots, setEmptySpots] = useState(0)
    // All Data & Friends Data
    const [allData, setAllData] = useState([])
    const [followingData, setFollowingData] = useState([])
    // Active Tab
    const [activeTab, setActiveTab] = useState('allListings')
    const[account, setAccount] = useState(
        JSON.parse(localStorage.getItem("account")))
    const navigate = useNavigate()
    const chunkSize = 4;

    // Initial Population of 8 Listings
    useEffect(()=>{
        fetchAvailableLocation()
        fetchListingsAll()
        fetchListingsFollowing()
    },[])

    // Determine the data to show depending on the tab selected
    useEffect(()=>{
        if(activeTab=='followingListings'){
            setAvailableData(followingData)
        }else{
            setAvailableData(allData)
        }
    },[activeTab])
    // Get All Listings from Database
    const fetchListingsAll = async () => {
        var queryString = "http://127.0.0.1:8000/api/listing"
        axios
            .get(queryString,)
            .then(response => {
                setAllData(response.data)
                setAvailableData(response.data)
            })
            .catch(error => console.error(`Error retrieving Login Info: ${error}`))
      }
    // Fetch Listings uploaded by User's Following from Database
    const fetchListingsFollowing = async () => {
        var queryString = "http://127.0.0.1:8000/api/listing_following"
        var params = new URLSearchParams();
        params.append('user', account.user_id)
        axios
            .get(queryString,{params:params})
            .then(response => {
                setFollowingData(response.data)
            })
            .catch(error => console.error(`Error retrieving Login Info: ${error}`))
      }
    // Filter/Sort Data whenever user change input or when data update
    useEffect(()=>{
        var allData = availableData
        // Filter Data Visible based on User Search Input
        if(setToSearch){
            var searchText = searchFilter.toLowerCase()
            allData = allData.filter((element) => {
                return (element.title.toLowerCase().includes(searchText) || 
                        element.description.toLowerCase().includes(searchText))
            })
        }
        // Sort Data based on User's Choice
        if(sortFilter === null || sortFilter == 'Recent'){
            allData = allData.sort(
                (a,b) => (a.date_posted > b.date_posted) ? 1 : 
                ((b.date_posted > a.date_posted) ? -1 : 0)
            )
        }else if(sortFilter == 'Price - Low to High'){
            allData = allData.sort((a,b) => (a.price > b.price) ? 1 : ((b.price > a.price) ? -1 : 0))
        }else if(sortFilter == 'Price - High to Low'){
            allData = allData.sort((a,b) => (a.price < b.price) ? 1 : ((b.price < a.price) ? -1 : 0))
        }else if(sortFilter == 'Location'){
            allData = allData.sort(function(a, b) {
                return a.location.localeCompare(b.location)
              })
        }
        // Filter data based on locations selected
        if(locFilter.length !=0){
            allData = allData.filter((element) => {
                return locFilter.includes(element.location) 
            })
        }
        // Filter data based on price filter selected
        if(priceFilter == 'For Sale'){
            allData = allData.filter((element) => {
                return element.price > 0
            })
        }else if(priceFilter == 'For Free'){
            allData = allData.filter((element) => {
                return element.price == 0
            })
        }

        // Create a Nested Array to create Rows of 4 Listings
        var dataInChunks = []
        for (let i = 0; i < allData.length; i += chunkSize) {
            const chunk = allData.slice(i, i + chunkSize);
            dataInChunks.push(chunk)
        }
        // Fill up empty spots to prevent awkward placements
        var lastRow = dataInChunks.slice(-1)
        if(lastRow.length < chunkSize){
            setEmptySpots(Array.from(Array(chunkSize-lastRow.length).keys()))
        }
        setFilteredData(dataInChunks)
    },[availableData, sortFilter, locFilter, priceFilter, toSearch])
    // Show more data when user click show more
    useEffect(()=>{
        if(filteredData.length > chunkCount){
            setMoreData(true)
        }else{
            setMoreData(false)
        }
        setVisibleData(filteredData.slice(0,chunkCount))
    },[filteredData, chunkCount])
    // Get All Locations from Datbase
    const fetchAvailableLocation = async () => {
    var queryString = "http://127.0.0.1:8000/api/locations"
    axios
        .get(queryString)
        .then(response => {
            var locationArray = response.data.map(element =>{
                return {label:element.location, value:element.location}
            })

            setLocationOptions(locationArray)
        })
        .catch(error => console.error(`Error retrieving Login Info: ${error}`))
    }
    // Function to perform Sorting 
    const sortFunc = (sort) => {
        if(sort === null){
            setChunkCount(2)
            setSortFilter(sort)
        }else{
            setSortFilter(sort.value)
        }
    }
    // Function to Filter Listings based on Locations
    const locationFilterFunc = (filters) => {
        if(filters.length == 0){
            setChunkCount(2)
            setLocFilter([])
        }else{
            var newLoc = filters.map(element => element.value)
            setLocFilter(newLoc)
        }
    }
    // Function to Filter Listings based on Price
    const priceFilterFunc = (filters) => {
        if(filters===null){
            setChunkCount(2)
            setPriceFilter('')
        }else {
            setPriceFilter(filters.value)
        }
    }
    // Set Search State
    const searchFunc = ()=>{
        setToSearch(true)
    }
    // Clear Search Input
    const clearSearch = () => {
        setSearchFilter('')
        setToSearch(false)
    }
    // Set Tab Selected
    const tabSelected = (key) =>{
        setActiveTab(key)
    }
    // Detect Search Bar Changes
    const searchBarChange = (e) => {
        setSearchFilter(e)
        setToSearch(false)
      }
    // Function when user press a key
    const keyDownFunc = (e) => {
        if(e.key == "Enter"){
            searchFunc()
            setToSearch(true)
        }
    }

    return (
      <div style={{marginTop:'1%', marginBottom:'3%', width:'100%', 
                    display:'flex', justifyContent:'center'}}>
        <div style={{width:'95%'}}>
            <h2 style={{textAlign:'left'}}>Food Listings</h2>
            {/* Search Bar Input */}
            <InputGroup className="mb-3">
                <Form.Control
                    placeholder="Search for Products"
                    aria-label="Search"
                    onChange={(e) => {searchBarChange(e.target.value)}}
                    value={searchFilter}
                    onKeyDown={(e) =>{keyDownFunc(e)}}
                />
                {/* Detect whether user is using the search bar */}
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
            {/* Sorting Dropdown */}
            <div style={{display:'flex', marginBottom:'2%'}}>
                <div >
                    <Select 
                        options={sortOptions} 
                        name="Sorting" 
                        isClearable={true}
                        styles={dropdownStyles}
                        placeholder='Sorting'
                        onChange={(e) => {sortFunc(e)}}
                    />    
                </div>
                
                {/* Filter */}
                <div style={{border:'1px solid black', marginLeft:'2%'}}/>
                    <div style={{display:'flex', marginLeft:'2%'}}>
                        {/* Location Dropdown */}
                        <div style={{width:'150px', marginRight:'2%'}}>
                            <Select 
                                options={locationOptions} 
                                isMulti 
                                styles={dropdownStyles}
                                placeholder='Location'
                                onChange={(e)=>{locationFilterFunc(e)}}
                                classname="filterOptions"
                                />
                        </div>
                        {/* Price Dropdown */}
                        <div style={{width:'150px'}}>
                            <Select 
                                options={priceOptions} 
                                name="Price" 
                                styles={dropdownStyles}
                                placeholder='Price'
                                isClearable={true}
                                onChange={(e) => {priceFilterFunc(e)}}
                            /> 
                        </div>
                    </div>

            </div>
            {/* Tabs to show ALL and Following ONLY */}
            <Tabs
                defaultActiveKey="allListings"
                id="uncontrolled-tab-example"
                className="mb-3"
                style={{display:'flex', justifyContent:'center'}}
                onSelect={(key)=>{tabSelected(key)}}
                fill
            >
                {/* ALL Listings Tab */}
                <Tab eventKey="allListings" title="All Listings">
                    <Container>
                        {/* Check if there is any listing in database */}
                        {
                            visibleData.length == 0 ? <h2>
                                There are not listings for the time being, 
                                please check back again later! Alternatively, 
                                you can click <span id="listingHere" 
                                onClick={()=>{navigate('/sell')}}>here</span> to 
                                create a listing!
                            </h2>:
                            // Create a card for every listing
                            visibleData.map(listingList => 
                                <Row style={{marginTop:'1%'}}>
                                    {
                                        listingList.map(listing => 
                                            <Col style={{display:'flex', 
                                                    justifyContent:'center'}}>
                                                <ListingCard 
                                                    user_id={listing["seller"]['user_id']}
                                                    name={listing["seller"]['username']}
                                                    title={listing["title"]} 
                                                    description={listing["description"]}
                                                    price={listing["price"]} 
                                                    location={listing["location"]} 
                                                    id={listing["listing_id"]}
                                                    image={listing["image"]}
                                                    user_rating={listing['seller']['rating']}
                                                    type={listing['seller']['type']['name']}
                                                />
                                            </Col>
                                        )
                                    }
                                    {/* Check if Row has any empty spots */}
                                    {
                                        emptySpots.length == 0? 
                                        null:
                                        emptySpots.map(
                                            element => <Col></Col>
                                        )
                                    }
                                </Row>  
                            )
                        }
                    </Container>
                </Tab>
                {/* Tab for Following Listings */}
                <Tab eventKey="followingListings" title="Followings">
                    <Container>
                        {/* Check if following have any listings */}
                        {
                            visibleData.length == 0 ? 
                            account == null?
                            <h2>Please Login to Access Following Section</h2>
                            :
                            <h2>
                                There are not listings for the time being, 
                                please check back again later! Alternatively, 
                                you can click <span id="listingHere" 
                                onClick={()=>{navigate('/sell')}}>here</span> to 
                                create a listing!
                            </h2>:
                            // Create a card for each listing
                            visibleData.map(listingList => 
                                <Row style={{marginTop:'1%'}}>
                                    {
                                        listingList.map(listing => 
                                            <Col style={{display:'flex', justifyContent:'center'}}>
                                                <ListingCard 
                                                    user_id={listing["seller"]['user_id']}
                                                    name={listing["seller"]['username']}
                                                    title={listing["title"]} 
                                                    description={listing["description"]}
                                                    price={listing["price"]} 
                                                    location={listing["location"]} 
                                                    id={listing["listing_id"]}
                                                    image={listing["image"]}
                                                    user_rating={listing['seller']['rating']}
                                                    type={listing['seller']['type']['name']}
                                                />
                                            </Col>
                                        )
                                    }
                                    {/* Check if row has any empty spot */}
                                    {
                                        emptySpots.length == 0? 
                                        null:
                                        emptySpots.map(
                                            element => <Col></Col>
                                        )
                                    }
                                </Row>  
                            )
                        }
                    </Container>
                </Tab>
            </Tabs>

                
            {/* Show More button to show more listings */}
            <div>
                {
                    moreData == false? <div></div>:
                    <Button variant="secondary" onClick={
                        () => setChunkCount(chunkCount+1)}>
                        Show More
                    </Button>
                }
            </div>
            
        </div>
      </div>
    )
  }

  export default FoodListings
