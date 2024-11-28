import React from 'react';
import { useLocation } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import customMarkerImage from '../assets/images/beehero-icon.png';

const MapPage = () => {
    const location = useLocation();
    const { lat, lng } = location.state;
    const customMarkerIcon = new L.Icon({
        iconUrl: customMarkerImage,
        iconSize: [38, 38],
        iconAnchor: [19, 38],
        popupAnchor: [0, -38],
    });
    
    
    return (
        <div style={{ height: '100vh', width: '100%' }}>
            <MapContainer center={[lat, lng]} zoom={13} style={{ height: "100%", width: "100%" }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={[lat, lng]} icon={customMarkerIcon}>
                    <Popup>
                        User's Location: {lat}, {lng}
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
};

export default MapPage;
