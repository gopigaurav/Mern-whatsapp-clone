import React, {useState} from 'react';
import {Avatar} from "@material-ui/core";
import {IconButton} from "@material-ui/core";
import {MoreVert} from '@material-ui/icons';
import './Chat.css';
import { AttachFile, SearchOutlined } from '@material-ui/icons';
import InsertEmotionIcon from "@material-ui/icons/InsertEmoticon"
import MicIcon from "@material-ui/icons/Mic"
import axios from './axios';


//(message.timestamp?.toDate())
function Chat({messages}) { 
    const [input,setInput] = useState([])

    const sendMessage = async (e) => {
        e.preventDefault();

        await axios.post('/messages/new', {
            message:input,
            name: "gopi",
            timestamp   : "Real Time | Thanks CP",
            received : true
        })

        setInput('');
    }


    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src="https://c4.wallpaperflare.com/wallpaper/384/350/430/digital-art-artwork-cyber-cyberpunk-neon-hd-wallpaper-preview.jpg" />
                <div className="chat__headerInfo">
                    <h3>Test room</h3>
                    <p>last seen at...</p>
                </div>
                <div className="chat__headerRight"> 
                <IconButton>
                    <SearchOutlined/>
                </IconButton>
                <IconButton>
                    <AttachFile/>
                </IconButton>
                <IconButton>
                     <MoreVert/>
                </IconButton>
                </div>
            </div>
            <div className="chat__body">

                {messages.map((message) => (
                    <p className={`chat__message ${message.received && "chat__receiver"}`}>
                    <span className="chat__name">
                        {message.name}
                    </span>
                    {message.message}
                    <span className="chat__timestamp">
                        {message.timestamp}
                    </span>
                    </p>
                ))}
                <p className="chat__message">
                <span className="chat__name">
                    gopi
                </span>
                Full Mern whatsapp-Clone | Yesss

                <span className="chat__timestamp">
                    {new Date().toUTCString()}
                </span>
                </p>
            </div>

            <div className ="chat__footer">
                <InsertEmotionIcon/>
                <form>
                    <input value = {input} onChange={e => setInput(e.target.value)} placeholder="Type a message"
                    type="text"/>
                    <button  onClick={sendMessage} type="submit">Send a message</button>
                </form>
                <MicIcon/>
            </div>
        </div>
    )
}

export default Chat
