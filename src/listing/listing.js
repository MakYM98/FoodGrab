import React, { Component, useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import ListingCard from '../global/listing_card';
import Select from 'react-select'
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const dropdownStyles = {
    control: styles=>({...styles, minHeight:50, borderRadius:20, textAlign:'left'})
}

const sortOptions = [
    {value:'Recent', label:'Recent'},
    {value:'Price - Low to High', label:'Price - Low to High'},
    {value:'Price - High to Low', label:'Price - High to Low'},
    {value:'Location', label:'Location'},
]

// Sort By(Location, Price) Filter By(Location, Price)
function FoodListings() {
    const [availableData, setAvailableData] = useState([])
    const [visibleData, setVisibleData] = useState([])
    const [chunkCount, setChunkCount] = useState(1)
    // Store all User selected locations in Filter
    const [locFilter, setLocFilter] = useState([])
    const [filteredData, setFilteredData] = useState([])
    // Used to Determine the visiblility of "Show More" Button
    const [moreData, setMoreData] = useState(true)  
    // Store all Dropdown values for Location Filter
    const [locationOptions, setLocationOptions] = useState([])

    const chunkSize = 4;

    // Initial Population of 8 Listings
    useEffect(()=>{
        fetchAvailableLocation()
        fetchListingsAll(1)
    },[])

    const fetchListingsAll = async () => {
        var queryString = "http://127.0.0.1:8000/api/listing/" + String(chunkCount)
        axios
            .get(queryString)
            .then(response => {
                // Save all the data in a Normal Array (For Sorting)
                var allData = availableData
                allData = allData.concat(response.data)
                setAvailableData(allData)

                // Create a Nested Array to create Rows of 4 Listings
                var dataInChunks = []
                for (let i = 0; i < response.data.length; i += chunkSize) {
                    const chunk = response.data.slice(i, i + chunkSize);
                    dataInChunks.push(chunk)
                }
                var newDataList = visibleData
                newDataList = newDataList.concat(dataInChunks)
                setVisibleData(newDataList)
            })
            .catch(error => console.error(`Error retrieving Login Info: ${error}`))
      }

      const fetchListingsLoc = async (locations) => {
        setLocFilter(locations)
        var params = new URLSearchParams();
        for (let i = 0; i < locations.length; i += 1) {
            params.append("location", locations[i])
        }
        setLocFilter(locations)
        var queryString = "http://127.0.0.1:8000/api/listing/loc/" + String(chunkCount)
        axios
            .get(queryString,{params:params})
            .then(response => {
                if(response.data.length == 0){
                    setMoreData(false)
                    return
                }else if(response.data.length < 8){
                    setMoreData(false)
                }else{
                    setMoreData(true)
                }
                setAvailableData(response.data)
                console.log(response.data)
                var newDataList = filteredData
                newDataList = newDataList.concat(response.data)
                setFilteredData(newDataList)
                console.log(newDataList)
            })
            .catch(error => console.error(`Error retrieving Login Info: ${error}`))
      }

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

    // Query for more queries after User presses "Show More"
    useEffect(()=>{
        if(locFilter.length != 0){
            fetchListingsLoc(locFilter)
        }else{
            fetchListingsAll(chunkCount)
        }
        
    },[chunkCount])

    const sortFunc = (sort) => {
        var allData = availableData

        if(sort.value == 'Recent'){
            allData = allData.sort((a,b) => (a.date_posted > b.date_posted) ? 1 : ((b.date_posted > a.date_posted) ? -1 : 0))
        }else if(sort.value == 'Price - Low to High'){
            allData = allData.sort((a,b) => (a.price > b.price) ? 1 : ((b.price > a.price) ? -1 : 0))
        }else if(sort.value == 'Price - High to Low'){
            allData = allData.sort((a,b) => (a.price < b.price) ? 1 : ((b.price < a.price) ? -1 : 0))
        }else if(sort.value == 'Location'){
            allData = allData.sort((a,b) => (a.location > b.location) ? 1 : ((b.location > a.location) ? -1 : 0))
        }

        var dataInChunks = []
        for (let i = 0; i < allData.length; i += chunkSize) {
            const chunk = allData.slice(i, i + chunkSize);
            dataInChunks.push(chunk)
        }
        
        setVisibleData(dataInChunks)
    }

    const locationFilterFunc = (filters) => {
        var locationValue = filters.map(e => {
            return e.value
        })

        fetchListingsLoc(locationValue)
    }

    return (
      <div style={{display:'flex', justifyContent:'center', marginTop:'3%', marginBottom:'3%'}}>
        <div style={{width:'80%'}}>
            <h3 style={{textAlign:'left'}}>Food Listings</h3>
            <div style={{display:'flex', marginBottom:'2%'}}>
                <div style={{minWidth:200}}>
                    <Select 
                        options={sortOptions} 
                        name="Sorting" 
                        styles={dropdownStyles}
                        onChange={(e) => {sortFunc(e)}}
                    />    
                </div>
                
                {/* Filter */}
                <div style={{border:'1px solid black', marginLeft:'2%'}}/>
                <div style={{display:'flex', marginLeft:'2%'}}>
                    <div style={{minWidth:200, maxWidth:400}}>
                        <Select 
                            options={locationOptions} 
                            isMulti 
                            styles={dropdownStyles}
                            onChange={(e)=>{locationFilterFunc(e)}}
                            />
                    </div>
                    {/* <div style={{marginLeft:'2%',minWidth:200}}><Select  native name="amount" styles={dropdownStyles}/></div> */}
                </div>

            </div>
            <Table>
                {
                    visibleData.length == 0 ? <h1>No Data</h1>:
                    visibleData.map(listingList => 
                        <tr>
                            {
                                listingList.map(listing => 
                                    <td>
                                        <ListingCard 
                                            name={listing["seller"]['username']}
                                            title={listing["title"]} 
                                            description={listing["description"]}
                                            price={'$' + String(listing["price"])} 
                                            location={listing["location"]} 
                                            id={listing["listing_id"]}/>
                                    </td>
                                )
                            }
                        </tr>  
                    )
                }
            </Table>
            <div>
                {
                    moreData == false? <div></div>:
                    <Button variant="secondary" onClick={() => setChunkCount(chunkCount+1)}>Show More</Button>
                }
                
            </div>
            
        </div>
      </div>
    )
  }

  export default FoodListings
