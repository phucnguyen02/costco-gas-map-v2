import React, { useState, useEffect, useContext} from 'react'
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
    const handleSubmit = async (event) => {
        if(prompt !== ''){
            setPrompt("");
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
                let chatResponse;
                console.log(res.data);
                if(res.data.hasOwnProperty('error')){
                    
                    chatResponse = {
                        message: "I'm sorry, I do not understand what you said.",
                        role: "Website",
                        __createdTime__: Date.now()
                    }
                }
                else{
                    let promptAnswer = res.data.answer;
                    chatResponse = {
                        message: promptAnswer,
                        role: "Website",
                        __createdTime__: Date.now()
                    }
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
        if(showChat === false)
            setShowChat(true);
        else
            setShowChat(false);
    }

    function handleKeyDown(event){
        if(event.key === 'Enter')
            handleSubmit(event);
    }

    function formatDateFromTimestamp(timestamp){
        const date = new Date(timestamp);
        return date.toLocaleString();
    }

    return (
        <div className="chat-menu">
            <div className="showchat-button">
                <button onClick={handleShowChat}>
                    <MessageIcon/>
                </button>
            </div>
            {
                showChat ? 
                <div className = "chat">
                    <div className = "chatbox">
                        {
                            chatlog.map((msg, i) => (
                                <div className='message' key = {i} style = {{float: msg.role === "Website" ? 'left' : 'right',
                                textAlign: msg.role === "Website" ? 'left' : 'right'}}>
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