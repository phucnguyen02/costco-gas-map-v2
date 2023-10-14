import React, {useState, useRef, useEffect, useContext} from 'react'
import Gas from './Gas'
import '../styles/Map.css'
import axios from "axios";
import { CenterContext } from './CenterContext'

let mapOptions = {
    mapId: process.env.REACT_APP_GOOGLE_MAPS_PUBLIC_MAP_ID,
    center: {lat: 33.852235, lng: -117.943683},
    zoom: 10,
    disableDefaultUI: true
}

function Map({coords}){
    const [map, setMap] = useState();
    const {centerState, setCenterState} = useContext(CenterContext);
    const ref = useRef();
    useEffect(() => {
        setMap(new window.google.maps.Map(ref.current, mapOptions))
    }, [])

    // useEffect(() => {
    //     async function getGeocode(location){
    //         let state = centerState
    //         let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${state}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
    //         const response = await axios.get(url)
    //         const data = response.data.results[0]
    //         if(data){
    //             const info = {
    //                 position: {
    //                     lat: data.geometry.location.lat,
    //                     lng: data.geometry.location.lng
    //                 }
    //             }
    //             return info;
    //         }
    //         alert('Invalid location!')
    //         return null
            
    //     }
        
    //     const updateMapCenter = async () =>{
    //         let info = await getGeocode(centerState);
    //         if(info){
    //             mapOptions.center = info.position;
    //             setMap(new window.google.maps.Map(ref.current, mapOptions))
    //         }
            
    //     }

    //     updateMapCenter();
    // }, [centerState])


    return (
        <>
            <div ref = {ref} id = "map"/>
            {map && <Gas coords = {coords} map = {map}/>}
        </>
    )
}


export default Map