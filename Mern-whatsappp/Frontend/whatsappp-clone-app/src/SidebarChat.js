import { Avatar } from '@material-ui/core';
import React from 'react';
import './SidebarChat.css';

function SidebarChat() {
    return (
        <div className="sidebarChat">
            <Avatar/>
        <div className="sidebarChat__info">
            <h2>Test Room</h2>
            <p>implement real-time chat</p>
        </div>
            
        </div>
    )
}

export default SidebarChat
