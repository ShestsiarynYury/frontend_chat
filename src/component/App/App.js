import React, {useState} from "react";
import "./App.css";
import Registration from "../Registration/Registration";
import {
    loadTokenFromSessionStorage
} from "../../util";
import ModalAlert from "../ModalAlert/ModalAlert";
import ChatWindow from '../ChatWindow/ChatWindow';

const App = () => {
    const [token, setToken] = useState(loadTokenFromSessionStorage());
    const [modalAlert, setModalAlert] = useState({
        name: "hi",
        message: "Nice to see you",
        hidden: false,
    });

    return (
        <div id="root">
            { (token === null || token === "")  && <Registration modal={setModalAlert} passToken={setToken} /> }
            { 
                (token !== null && token !== "") 
                && 
                <>
                    {
                        /* <UserInfoAndAction
                            token={token}
                            passChatMessage={insertChatMessage} 
                            setModalAlert={setModalAlert}
                        />*/
                        <ChatWindow />
                    }
                    <ModalAlert 
                        name={modalAlert.name}
                        hidden={modalAlert.hidden} 
                        message={modalAlert.message}
                        close={
                            () => {
                                setModalAlert({
                                    hidden: true,
                                    name: "",
                                    message: "",
                                });
                            }
                        }
                    >   
                    </ModalAlert>
                </> 
            }
        </div>
    );
}

export default App;