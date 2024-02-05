import React, { useState } from 'react'
import axios from "axios";

function Chatbox(){
    const {formState, setFormState} = useState("");

    function handleSubmit(){
        const configuration = {
            method: "post",
            url: "http://localhost:8080/chat",
            data: {formState}
        }
        axios(configuration).then(res => {
            console.log(res);
        })
    }

    function handleFormChange({target}){
        setFormState(target.value);
    }

    return (
        <div className = "chatbox">
            <form onSubmit = {handleSubmit}>
                <input type = "text" value = {formState} onChange = {handleFormChange}/>
            </form>
        </div>
    )
}

export default Chatbox;