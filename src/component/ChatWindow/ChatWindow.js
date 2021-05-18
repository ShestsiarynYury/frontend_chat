import React, { useState } from 'react';
import './ChatWindow.css';
import ChatMessage from '../ChatMessage/ChatMessage';
import UserInfoAndAction from '../UserInfoAndAction/UserInfoAndAction';

class ChatWindow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            webSocket: null,
            chatMessages: []
        }
    }

    connect = () => {
        let webSocket = new WebSocket("ws://192.168.3.23:8081/chat");
        webSocket.onmessage = (response) => {
            console.log(response);
            this.setState({chatMessages: [...this.state.chatMessages, JSON.parse(response.data)]});
        };

        webSocket.onerror = () => {
            alert("error");
        };

        webSocket.onopen = () => {
            alert("open");
        };

        webSocket.onclose = (response) => {
            console.log(response);
            alert("close");
        };

        this.setState({webSocket: webSocket}, () => { console.log(this.state)});
    };

    disconnect = () => {
        if (this.state.webSocket) {
            this.state.webSocket.close();
            this.setState({webSocket: null}, () => { console.log(this.state)});
        }
    };

    sendMessage = (chatMessage) => {
        console.log(chatMessage);
        if (this.state.webSocket)
            this.state.webSocket.send(JSON.stringify(chatMessage));
    };

    render () {
        return (
            <>
                <div>
                    <button onClick={this.connect}>connect</button>
                    <button onClick={this.disconnect}>disconnect</button>
                    <label>connection status : {this.state.webSocket ? this.state.webSocket.readyState : 'NULL'}</label>
                </div>
                <UserInfoAndAction sendMessage={this.sendMessage}/>
                <div id="messages">
                    {
                        this.state.chatMessages.map((chatMessage) => {
                            return <ChatMessage sender={chatMessage.sender} avatar={chatMessage.avatar} message={chatMessage.message} />
                        })
                    }
                </div>
            </>
        );
    }
}

export default ChatWindow;