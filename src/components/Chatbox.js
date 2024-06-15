import React, { useState, useContext, useRef, useEffect } from 'react'
import axios from "axios";
import '../styles/Chatbox.css'
import { CoordsContext } from './CoordsContext'
import { ChatlogContext } from './ChatlogContext'
import MessageIcon from '@mui/icons-material/Message';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Input from 'antd/es/input/Input';
import SendIcon from '@mui/icons-material/Send';
import ReactSwitch from 'react-switch';
import { RegularContext } from './RegularContext';

function Chatbox() {
    const [showChat, setShowChat] = useState(false);
    const [prompt, setPrompt] = useState("");
    const { chatlog, setChatlog } = useContext(ChatlogContext);
    const { coords, setCoords } = useContext(CoordsContext);

    const messagesColumnRef = useRef(null);

    const handleSubmit = async (event) => {
        if (prompt !== '') {
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
            if (navigator.geolocation) {
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
                if (res.data.hasOwnProperty('error')) {
                    chatResponse = {
                        message: "I'm sorry, I do not understand what you said. Please ask prompts related to Costco gas stations like nearest station, appropriate gas type for your car, or gas trends.",
                        role: "Gas Tracker Assistant",
                        __createdTime__: Date.now()
                    }
                }
                else {
                    let promptAnswer = res.data.Prompt_Response;
                    let warehouseName = res.data.Warehouse_Info.Station_Name;
                    chatResponse = {
                        message: promptAnswer,
                        role: "Gas Tracker Assistant",
                        __createdTime__: Date.now()
                    }
                    let coordsCopy = coords;
                    for (let i = 0; i < coordsCopy.length; i++) {
                        if (coordsCopy[i].name === warehouseName) {
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

    function handlePromptChange({ target }) {
        setPrompt(target.value);
    }

    function handleShowChat() {
        setShowChat(!showChat);
    }

    function handleKeyDown(event) {
        if (event.key === 'Enter')
            handleSubmit(event);
    }

    function formatDateFromTimestamp(timestamp) {
        const date = new Date(timestamp);
        return date.toLocaleString();
    }

    useEffect(() => {
        if (showChat && messagesColumnRef.current) {
            messagesColumnRef.current.scrollTop = messagesColumnRef.current.scrollHeight;
        }
    }, [chatlog, showChat]);

    const { isRegular, setRegular } = useContext(RegularContext);

    return (
        <div className="chat-menu">
            <div className="showchat-button">
                <IconButton aria-label="icon-button" color='black' size='large' onClick={handleShowChat}>
                    <MessageIcon className='icon' fontSize='inherit' />
                </IconButton>

                <div className='toggle'>
                    <ReactSwitch
                        width={150}
                        onColor='#b1cf86'
                        height={50}
                        onChange={() => { setRegular(!isRegular) }} checked={isRegular === false}
                        className='toggle-btn'
                        checkedIcon={
                            <div style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                height: "100%",
                                fontSize: 15,
                                fontWeight: 600,
                                color: "white",
                                paddingRight: 2,
                                marginLeft: "30px",
                            }}>
                                Premium
                            </div>
                        }
                        uncheckedIcon={
                            <div style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                position: "relative",
                                left: "-28px",
                                height: "100%",
                                width: "100px",
                                fontSize: 15,
                                color: "white",
                                fontWeight: 600,
                            }}>
                                Off Premium
                            </div>
                        }
                    />
                </div>
            </div>
            {showChat ?
                <div className="chat">
                    <Box ref={messagesColumnRef} sx={{ flexGrow: 1, overflowY: 'auto' }} >
                        {chatlog.map((msg, i) => (
                            <Box
                                key={i}
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: msg.role === 'Gas Tracker Assistant' ? 'flex-start' : 'flex-end',
                                    mb: 1,
                                }}
                            >
                                <Typography
                                    variant="caption"
                                    color="textSecondary"
                                    sx={{
                                        margin: "15px 15px 0 0"
                                    }}
                                >
                                    {msg.role} - {formatDateFromTimestamp(msg.__createdTime__)}
                                </Typography>

                                <Typography
                                    variant="body1"
                                    sx={{
                                        bgcolor: msg.role === 'Gas Tracker Assistant' ? 'lightgreen' : '#b7e1cd',
                                        p: 1,
                                        borderRadius: 5,
                                        margin: "1px 15px 5px 0",
                                        maxWidth: "80%"
                                    }}
                                >
                                    {msg.message}
                                </Typography>
                            </Box>
                        ))}
                    </Box>

                    <form onSubmit={(e) => handleSubmit(e)} style={{ flexShrink: 0 }}>
                        <div className="wrapper-input-box">
                            <div className="input-box" style={{ display: 'flex', alignItems: 'center' }}>
                                <Input
                                    fullWidth
                                    placeholder="Enter your prompt"
                                    value={prompt}
                                    onChange={handlePromptChange}
                                    onKeyDown={handleKeyDown}
                                    style={{
                                        marginRight: 10,
                                        borderRadius: 20,
                                    }}
                                />
                                <Button
                                    type="submit"
                                    variant="contained"
                                    onClick={(e) => handleSubmit(e)}
                                    sx={{
                                        borderRadius: 5,
                                        backgroundColor: "#0b8043",
                                        '&:hover': {
                                            backgroundColor: "#066732"
                                        }
                                    }}
                                >
                                    <SendIcon />
                                </Button>
                            </div>
                        </div>
                    </form>
                </div> : null
            }
        </div>
    )
}

export default Chatbox;