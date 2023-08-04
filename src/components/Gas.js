import {useState, useContext} from 'react'
import { RegularContext } from './RegularContext'
import Marker from './Marker'
import LocationInfoBox from './LocationInfoBox'

function Gas({coords, map}){
    const [data, setData] = useState(coords);
    const [highlight, setHighlight] = useState(false);
    const {isRegular} = useContext(RegularContext);
    const [locationInfo, setLocationInfo] = useState(null);
    return (
        <>
            {
                data.map((elem, index) => (
                    <Marker key = {index} map = {map} name = {elem.name} last_updated = {elem.last_updated}
                    position = {elem.position} locationInfo = {locationInfo} setLocationInfo = {setLocationInfo}>
                        <div className = {`marker ${highlight === index ? "highlight" : ""}`}
                            onMouseEnter = {() => setHighlight(index)}
                            onMouseLeave = {() => setHighlight(null)}
                        >
                            <h6>{isRegular ? elem.regular_gas : elem.premium_gas}</h6>
                        </div>
                    </Marker>
                ))
            }
            {locationInfo && <LocationInfoBox info = {locationInfo}/>}
        </>
    )
}

export default Gas;