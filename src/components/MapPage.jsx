import React from 'react';
import { useLocation } from "react-router-dom";
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css'; // Import Leaflet styles

const MapPage = () => {
    const location = useLocation();
    const {lat, lng} = location.state;
    return(<div>{lat},{lng}</div>);
    // return (
    //     <div style={{ height: '100vh', width: '100%' }}>
    //         <MapContainer center={[lat, lng]} zoom={13} style={{ height: "100%", width: "100%" }}>
    //             <TileLayer
    //                 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    //                 attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    //             />
    //             <Marker position={[lat, lng]}>
    //                 <Popup>
    //                     User's Location: {lat}, {lng}
    //                 </Popup>
    //             </Marker>
    //         </MapContainer>
    //     </div>
    // );
};

export default MapPage;
