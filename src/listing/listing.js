import React, { Component, useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import ListingCard from '../global/listing_card';
import Select from 'react-select'
import Button from 'react-bootstrap/Button';

var listingData = require('../data/test_listing.json')['listings']
var listingChunks = []

const dropdownStyles = {
    control: styles=>({...styles, minHeight:50, borderRadius:20, textAlign:'left'})
}

const chunkSize = 4;
for (let i = 0; i < listingData.length; i += chunkSize) {
    const chunk = listingData.slice(i, i + chunkSize);
    listingChunks.push(chunk)
}

const uniqueLocations = listingData.map(function(listing){ 
    return {value:listing.location, label:listing.location}
})

const sortOptions = [
    {value:'location', label:'Location'},
    {value:'price', label:'Price'}
]

// Sort By(Location, Price) Filter By(Location, Price)
function FoodListings() {
    const [visibleAmount, setVisibleAmount] = useState(2)
    const [visibleData, setVisibleData] = useState([])

    return (
      <div style={{display:'flex', justifyContent:'center', marginTop:'3%', marginBottom:'3%'}}>
        <div style={{width:'80%'}}>
            <h3 style={{textAlign:'left'}}>Food Listings</h3>
            <div style={{display:'flex', marginBottom:'2%'}}>
                <div style={{minWidth:200}}><Select options={sortOptions} name="test" styles={dropdownStyles}/></div>
                
                {/* Filter */}
                <div style={{border:'1px solid black', marginLeft:'2%'}}/>
                <div style={{display:'flex', marginLeft:'2%'}}>
                    <div style={{minWidth:200}}><Select options={uniqueLocations} isMulti styles={dropdownStyles}/></div>
                    <div style={{marginLeft:'2%',minWidth:200}}><Select  native name="amount" styles={dropdownStyles}/></div>
                </div>

            </div>
            <Table>
                {
                    listingChunks.slice(0,visibleAmount).map(listingList => 
                        <tr>
                            {
                                listingList.map(listing => 
                                    <td>
                                        <ListingCard name={listing["name"]} title={listing["title"]} description={listing["description"]}
                                            price={listing["price"]} location={listing["location"]} id={listing["id"]}/>
                                    </td>
                                )
                            }
                        </tr>  
                    )
                }
            </Table>
            <div>
                <Button variant="secondary" onClick={() => setVisibleAmount(visibleAmount+1)}>Show More</Button>
            </div>
            
        </div>
      </div>
    )
  }

  export default FoodListings
