import React, { useState, useContext, useRef, useEffect } from 'react'
import axios from "axios";
import '../styles/Chatbox.css'
import { CoordsContext } from './CoordsContext'
import { ChatlogContext } from './ChatlogContext'
import MessageIcon from '@mui/icons-material/Message';

function Chatbox(){
    const [showChat, setShowChat] = useState(false);
    const [prompt, setPrompt] = useState("");
    const {chatlog, setChatlog} = useContext(ChatlogContext);
    const {coords, setCoords} = useContext(CoordsContext);

    const messagesColumnRef = useRef(null);
    
    const handleSubmit = async (event) => {
        if(prompt !== ''){
            // Adds the prompt to the chat log
            setPrompt("");
            let newMessage = {
                message: prompt,
                role: "User",
                __createdTime__: Date.now()
            }
            
            setChatlog(chatlog => [...chatlog, newMessage]);
            event.preventDefault();

            // Geolocation to send to ChatGPT
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
                let chatResponse;
                if(res.data.hasOwnProperty('error')){
                    chatResponse = {
                        message: "I'm sorry, I do not understand what you said. Please ask prompts related to Costco gas stations like nearest station, appropriate gas type for your car, or gas trends.",
                        role: "Gas Tracker Assistant",
                        __createdTime__: Date.now()
                    }
                }
                else{
                    let promptAnswer = res.data.Prompt_Response;
                    let warehouseName = res.data.Warehouse_Info.Station_Name;
                    chatResponse = {
                        message: promptAnswer,
                        role: "Gas Tracker Assistant",
                        __createdTime__: Date.now()
                    }
                    let coordsCopy = coords;
                    for(let i = 0; i<coordsCopy.length; i++){
                        if(coordsCopy[i].name === warehouseName){
                            coordsCopy[i].map_highlight = true;
                            console.log("Set map highlight");
                        }
                    }
                    setCoords(coordsCopy);
                }

                setChatlog(chatlog => [...chatlog, chatResponse]);
            }).catch(error => {
                console.log(error);
            })
        }

    }

    function handlePromptChange({target}){
        setPrompt(target.value);
    }

    function handleShowChat(){
        setShowChat(!showChat);
    }

    function handleKeyDown(event){
        if(event.key === 'Enter')
            handleSubmit(event);
    }

    function formatDateFromTimestamp(timestamp){
        const date = new Date(timestamp);
        return date.toLocaleString();
    }

    useEffect(() => {
        messagesColumnRef.scrollTop = messagesColumnRef.scrollHeight;
    }, [chatlog])
    return (
        <div className="chat-menu">
            <div className="showchat-button">
                <button onClick={handleShowChat}>
                    <MessageIcon/>
                </button>
            </div>
            {
                showChat ? 
                <div className = "chat" >
                    <div className = "chatbox" ref = {messagesColumnRef}>
                        {
                            chatlog.map((msg, i) => (
                                <div className='message' key = {i} style = {{float: msg.role === "Gas Tracker Assistant" ? 'left' : 'right',
                                textAlign: msg.role === "Gas Tracker Assistant" ? 'left' : 'right', background: msg.role === "Gas Tracker Assistant" ? 'lightgreen' : 'lightblue'}}>
                                    <div style = {{display: 'block'}}>
                                        <div style = {{display: 'flex', justifyContent: 'space-between'}}>
                                            <span className='msgMeta'>{msg.role}</span>
                                            <span className='msgMeta'>
                                                {formatDateFromTimestamp(msg.__createdTime__)}
                                            </span>
                                        </div>
                                        
                                        <p className='msgText'>{msg.message}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                            
                    <form onSubmit = {(e) => handleSubmit(e)}>
                        <div className = "input-box">
                            <input type = "text" placeholder = "Enter your prompt" value = {prompt} 
                            onChange = {handlePromptChange} onKeyDown = {handleKeyDown}/>
                            <button onClick = {(e) => handleSubmit(e)}>
                                Submit
                            </button>
                        </div>
                        
                    </form>
                </div> : null    
            }
        </div>
    )
}

export default Chatbox;