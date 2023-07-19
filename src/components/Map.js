import React from 'react'
import GoogleMapReact from 'google-map-react'
import LocationMarker from './LocationMarker';

function Map({coords, center, zoom}) {
    const markers = coords.map((elem, idx) => {
        return <LocationMarker key = {idx} lat = {elem.position.lat} lng = {elem.position.lng} />
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