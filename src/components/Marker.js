import { useEffect, useRef } from 'react'
import { createRoot } from 'react-dom/client'
import { setCurrentInfoWindow } from './GlobalInfoWindow';
import '../styles/Marker.css'

function Marker({ map, children, address, last_scraped, last_updated, position, locationInfo, setLocationInfo }) {
    const markerRef = useRef();

    const rootRef = useRef();

    // CSS for InfoWindow
    const InfoWindow = new window.google.maps.InfoWindow({
        minWidth: 200,
        maxWidth: 300
    });

    // Icon Marker
    const iconMarker = '/Vector.png';

    useEffect(() => {
        if (!rootRef.current) {
            const container = document.createElement("div");
            rootRef.current = createRoot(container);

            markerRef.current = new window.google.maps.Marker({
                position,
                map,
                icon: iconMarker,
            })

            markerRef.current = new window.google.maps.marker.AdvancedMarkerView({
                content: container,
            })

            // markerRef.current.addListener("click", () => {
            //     setLocationInfo({
            //         address: address,
            //         last_updated: last_updated,
            //         last_scraped: last_scraped
            //     })
            // })

            markerRef.current.addListener('click', () => {
                // setLocationInfo({
                //     address,
                //     last_updated,
                //     last_scraped
                // });

                // Location information
                InfoWindow.setContent(`
                    <div class="feh-content">
                        <img src="/thumbnail.jpg" alt="Image describing location">
                        <h2>Warehouse Info</h2>
                        <p>Address: ${address}</p> 
                        <p>Last Updated: ${last_updated}</p>
                        <p>Last Scraped: ${last_scraped}</p>
                    </div>
                `);
                
                // Close the currently open InfoWindow and update the reference
                setCurrentInfoWindow(InfoWindow);

                // Open the new InfoWindow
                InfoWindow.open(map, markerRef.current);
            });
        }
    }, [map, last_scraped, last_updated, address, position])

    useEffect(() => {
        rootRef.current.render(children);
        markerRef.current.position = position;
        markerRef.current.map = map;
    }, [map, children, position])

}

export default Marker;