import React, {useState} from 'react'
import GoogleMapReact from 'google-map-react'
import LocationInfoBox from './LocationInfoBox';
import './Map.css'

function Map({coords, center, zoom, regular}) {
    const [locationInfo, setLocationInfo] = useState(null);

    const renderMarkers = (map, maps) => {
        let markers = [];
        coords.forEach((elem) => {
            let marker = new maps.Marker({
                position: { lat: elem.position.lat, lng: elem.position.lng },
                map
            });

            marker.addListener("click", () => {
                setLocationInfo({
                    name: elem.name,
                    regular_gas: elem.regular_gas,
                    premium_gas: elem.premium_gas
                })
            })
            markers.push(marker);
        })
        return markers;
    };


    return (
        <div className='map'>
            <GoogleMapReact
                bootstrapURLKeys={{key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY}}
                defaultCenter = { center }
                defaultZoom = { zoom }
                onGoogleApiLoaded={({ map, maps }) => renderMarkers(map, maps)}
            >
            </GoogleMapReact>
            {locationInfo && <LocationInfoBox info = {locationInfo} regular = {regular}/>}
        </div>
    ) 
}

Map.defaultProps = {
    center: {
        lat: 33.352235,
        lng: -117.943683
    },
    zoom: 10.5
}

export default Map