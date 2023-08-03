import {useEffect, useRef} from 'react'
import {createRoot} from 'react-dom/client'
import './Marker.css'
function Marker({map, children, position}){
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
        }
    }, [])

    useEffect(() => {
        rootRef.current.render(children);
        markerRef.current.position = position;
        markerRef.current.map = map;
    }, [map, children, position])
}

export default Marker;