import {useEffect, useRef} from 'react'
import {createRoot} from 'react-dom/client'
import '../styles/Marker.css'

function Marker({map, children, address, last_scraped, last_updated, position, locationInfo, setLocationInfo}){
    const markerRef = useRef();
    const rootRef = useRef();
    useEffect(() => {
        if(!rootRef.current){
            const container = document.createElement("div");
            rootRef.current = createRoot(container);

            markerRef.current = new window.google.maps.marker.AdvancedMarkerView({
                position,
                content: container
            })
            markerRef.current.addListener("click", () => {
                setLocationInfo({
                    address: address,
                    last_updated: last_updated,
                    last_scraped: last_scraped
                })
            })
        }
    }, [last_scraped, last_updated, address, position, setLocationInfo])

    useEffect(() => {
        rootRef.current.render(children);
        markerRef.current.position = position;
        markerRef.current.map = map;
    }, [map, children, position])
}

export default Marker;