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

            let content = document.createElement("div");
            let h2 = document.createElement("h2");
            h2.innerText = "Warehouse Info"
            content.append(h2);

            let ul = document.createElement("ul");
            content.append(ul);

            let address = document.createElement("li");
            address.innerText = "Address: " + elem.name;
            ul.append(address);

            let priceLI = document.createElement("li");
            let price = regular ? elem.regular_gas : elem.premium_gas;
            priceLI.innerText = "Price: " + price;
            ul.append(priceLI);

            let infoWindow = new maps.InfoWindow({
                content: content
            })
            marker.addListener("click", () => {
                setLocationInfo({
                    name: elem.name,
                    regular_gas: elem.regular_gas,
                    premium_gas: elem.premium_gas
                })
                //infoWindow.open(map, marker)
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