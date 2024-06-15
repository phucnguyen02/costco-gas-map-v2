import {useState, useContext} from 'react'
import { RegularContext } from './RegularContext'
import Marker from './Marker'
import { CoordsContext } from './CoordsContext'

function Gas({map}){
    const {coords, setCoords} = useContext(CoordsContext);
    const [highlight, setHighlight] = useState(false);
    const {isRegular} = useContext(RegularContext);
    return (
        <>
            {
                coords.map((elem, index) => 
                    {
                        return <Marker key = {index} map = {map} address = {elem.address} last_scraped = {elem.last_scraped} last_updated = {elem.last_updated}
                        position = {elem.position} streetview = {elem.streetview}>
                            <div className = {`marker ${highlight === index ? "highlight" : ""} ${elem.map_highlight ? "chatbot-highlight" : ""}`}
                                onMouseEnter = {() => setHighlight(index)}
                                onMouseLeave = {() => setHighlight(null)}
                            >
                                <h3>{isRegular ? elem.regular_gas : elem.premium_gas}</h3>
                            </div>
                        </Marker>
                    }
                )
            }
        </>
    )
}

export default Gas;