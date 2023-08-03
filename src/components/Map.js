import React, {useState, useRef, useEffect} from 'react'
import Gas from './Gas'
import './Map.css'

const mapOptions = {
    mapId: process.env.REACT_APP_GOOGLE_MAPS_PUBLIC_MAP_ID,
    center: {lat: 33.852235, lng: -117.943683},
    zoom: 10,
    disableDefaultUI: true
}

function Map({coords}){
    const [map, setMap] = useState();
    const ref = useRef();
    useEffect(() => {
        setMap(new window.google.maps.Map(ref.current, mapOptions))
    }, [])
    return (
        <>
            <div ref = {ref} id = "map"/>
            {map && <Gas coords = {coords} map = {map}/>}
        </>
    )
}


export default Map