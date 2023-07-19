import React, {useState} from 'react'
import GoogleMapReact from 'google-map-react'
import LocationMarker from './LocationMarker';
import LocationInfoBox from './LocationInfoBox';

function Map({coords, center, zoom}) {
    const [locationInfo, setLocationInfo] = useState(null);

    const markers = coords.map((elem, idx) => {
        return <LocationMarker key = {idx} lat = {elem.position.lat} lng = {elem.position.lng} onClick = {() => setLocationInfo({
            name: elem.name,
            regular_gas: elem.regular_gas,
            premium_gas: elem.premium_gas
        })} />
    })
    return (
        <div className='map'>
            <GoogleMapReact
                bootstrapURLKeys={{key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY}}
                defaultCenter = { center }
                defaultZoom = { zoom }
            >
                { markers }
            </GoogleMapReact>
            {locationInfo && <LocationInfoBox info = {locationInfo} />}
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