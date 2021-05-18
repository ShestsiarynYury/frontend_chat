import { useState, useEffect } from "react";
import "./UserInfoAndAction.css";
import { url } from "../../properties";
import jwt_decode from "jwt-decode";
import {
    loadTokenFromSessionStorage
} from "../../util";

const UserInfoAndAction = (props) => {
    const[login, setLogin] = useState("");
    const[avatar, setAvatar] = useState("");

    const getLoginFromToken = (token) => {
        if (token) {
            let decoded = jwt_decode(token);
            return decoded.login;
        }
        
        return null;
    };

    useEffect(
        async () => {
            await setLogin(getLoginFromToken(loadTokenFromSessionStorage()));
            fetch(
                url + "users" + "/" + login + "/" +"foto",
                {
                    method: "GET",
                    headers: {
                        "Content-Type": 'application/json'
                    }
                }
            ).then(
                function(response) {
                    if (response.ok) {
                        return response.text();
                    }

                    throw new Error("failed");
                }
            ).then(
                (text) => {setAvatar(text)}
            ).catch(
                function(error) {
                    // props.setModalAlert({
                    //     name: "image",
                    //     message: error,
                    //     hidden: false
                    // });
                }
            )
        }, 
        [login, avatar]
    );

    return (
        <div id="user-info">
            <div id="login"><h4>{login}</h4></div>
            <div id="avatar"><img src={avatar} ></img></div>
            <div id="write-message">
                <textarea id="message"></textarea>
                <button onClick={ () => {
                        let chatMessage = {};
                        chatMessage.sender = login;
                        chatMessage.avatar = avatar;
                        chatMessage.message = document.getElementById("message").value;

                        props.sendMessage(chatMessage);
                    }
                }>send message</button>
            </div>
        </div>
    );
};

export default UserInfoAndAction;