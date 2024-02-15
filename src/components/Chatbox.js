import React, { useState, useEffect, useContext, useRef } from 'react'
import axios from "axios";
import '../styles/Chatbox.css'
import { CoordsContext } from './CoordsContext'

function Chatbox(){
    const [chatlog, setChatlog] = useState([]);
    const [prompt, setPrompt] = useState("");
    const {coords, setCoords} = useContext(CoordsContext);

    const chatlogColumnRef = useRef(null);

    const handleSubmit = async (event) => {
        if(prompt !== ''){
            let newMessage = {
                message: prompt,
                role: "You",
                __createdTime__: Date.now()
            }

            setChatlog(chatlog => [...chatlog, newMessage]);
            event.preventDefault();
            let address;
            if(navigator.geolocation){
                navigator.geolocation.getCurrentPosition(
                    async (position) => {
                        const { latitude, longitude } = position.coords;
                        let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
                        const response = await axios.get(url);
                        address = response.data.results[0].formatted_address;
                    },
                    (error) => {
                        console.error('Error getting user location: ', error);
                    }
                )
            }
            else {
                console.error('Geolocation is not supported by this browser.');
            }
            const configuration = {
                method: "post",
                url: "http://localhost:8080/chat",
                data: {
                    prompt: prompt,
                    address: address
                }
            }
            axios(configuration).then(res => {
                console.log(res);
                let promptAnswer = res.answer;
                let chatResponse = {
                    message: promptAnswer,
                    role: "Website",
                    __createdTime__: Date.now()
                }
                setChatlog(chatlog => [...chatlog, chatResponse]);
            })
        }

    }

    function handlePromptChange({target}){
        setPrompt(target.value);
    }

    function handleKeyDown(event){
        if(event.key === 'Enter')
            handleSubmit(event);
    }

    function formatDateFromTimestamp(timestamp){
        const date = new Date(timestamp);
        return date.toLocaleString();
    }

    // useEffect(() => {
    //     chatlogColumnRef.current.scrollTop = chatlogColumnRef.current.scrollHeight;
    // }, [chatlog]);

    return (
        <div className = "chat">
            {/* <div className = "chatbox">
                {
                    chatlog.map((msg, i) => (
                        <div className='message' key = {i}>
                            <div style = {{display: 'block'}}>
                                <div style = {{display: 'flex', justifyContent: 'space-between'}}>
                                    <span className='msgMeta'>{msg.role}</span>
                                    <span className='msgMeta'>
                                        {formatDateFromTimestamp(msg.__createdTime__)}
                                    </span>
                                </div>
                                
                                <p className='msgText'>{msg.message}</p>
                            </div>
                            <br/>
                        </div>
                    ))
                }
            </div> */}
            
            <form onSubmit = {(e) => handleSubmit(e)}>
                <div className = "input-box">
                    <input type = "text" placeholder = "Enter your prompt" value = {prompt} 
                    onChange = {handlePromptChange} onKeyDown = {handleKeyDown}/>
                    <button onClick = {(e) => handleSubmit(e)}>
                        Submit
                    </button>
                </div>
                
            </form>
        </div>
    )
}

export default Chatbox;