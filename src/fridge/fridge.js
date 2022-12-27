import React, { Component } from 'react';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Table from 'react-bootstrap/Table';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

var locationData = require('../data/fridge_location.json')['locations']

const singaporePostion = [1.3521, 103.8198]

function CommunityFridge() {
    return (
      <div style={{display:'flex', justifyContent:'center', marginTop:'3%'}}>
        <div style={{width:'80%'}}>
          <MapContainer center={singaporePostion} zoom={12} scrollWheelZoom={false} style={{ height: '60vh', width: '60wh!important' }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {
              locationData.map(location => 
                  <Marker position={[location['latitude'], location['longitude']]}>
                    <Popup>
                      {location['street']}
                    </Popup>
                  </Marker>
              )
            }
          </MapContainer>

          <div style={{marginTop:'5%', marginBottom:'5%'}}>
            <h3 style={{textAlign:'left'}}>List of Locations</h3>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Street Name</th>
                </tr>
              </thead>
              <tbody>
                {
                  locationData.map(location =>
                    <tr>
                      <td>{location['no.']}</td>
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
