import {useState, useContext} from 'react'
import { RegularContext } from './RegularContext'
import Marker from './Marker'
import LocationInfoBox from './LocationInfoBox'
import { CoordsContext } from './CoordsContext'

function Gas({map}){
    const {coords, setCoords} = useContext(CoordsContext);
    const [highlight, setHighlight] = useState(false);
    const {isRegular} = useContext(RegularContext);
    const [locationInfo, setLocationInfo] = useState(null);
    return (
        <>
            {
                coords.map((elem, index) => 
                    {
                        return <Marker key = {index} map = {map} address = {elem.address} last_scraped = {elem.last_scraped} last_updated = {elem.last_updated}
                        position = {elem.position} locationInfo = {locationInfo} setLocationInfo = {setLocationInfo}>
                            <div className = {`marker ${highlight === index ? "highlight" : ""} ${elem.map_highlight ? "chatbot-highlight" : ""}`}
                                onMouseEnter = {() => setHighlight(index)}
                                onMouseLeave = {() => setHighlight(null)}
                            >
                                <h5>{isRegular ? elem.regular_gas : elem.premium_gas}</h5>
                            </div>
                        </Marker>
                    }
                )
            }
            {locationInfo && <LocationInfoBox info = {locationInfo}/>}
        </>
    )
}

export default Gas;