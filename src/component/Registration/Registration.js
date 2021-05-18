import React, {useState} from "react";
import "./Registration.css";
import {
    loadTokenFromSessionStorage,
    saveTokenToSessionStorage
} from "../../util";
import { url } from "../../properties";

const Registration = (props) => {
    const [mode, setMode] = useState(false);
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [foto, setFoto] = useState({
        value: "",
        asText: "",
    });


    const toggleMode = () => {
        setMode(!mode);
        setLogin("");
        setPassword("");
        setPhone("");
        setFoto("");
    };

    const handlerLogin = (event) => {
        setLogin(event.target.value);
    };

    const handlerPassword = (event) => {
        setPassword(event.target.value);
    };

    const handlerPhone = (event) => {
        setPhone(event.target.value);
    };

    const handlerFoto = (event) => {
        let file = event.target.files[0];
        let reader = new FileReader();
        reader.onload = function(event) {
            let foto = {};
            foto.value = event.target.value
            foto.asText = event.target.result;
            
            setFoto(foto);
        };
      
        reader.onerror = function(event) {
            //
        };

        reader.readAsDataURL(file);
    };
    
    const register = () => {
        let user = {};
        user.login = login;
        user.password = password;
        user.phone = phone;
        user.foto = foto.asText;

        console.log(user);
        fetch(
            url + "register",
            {
                method: "POST",
                body: JSON.stringify(user),
                headers: {
                    "Content-Type": 'application/json'
                }
            }
        )
        .then(
            function(response) {
                if (response.ok) {
                    return response.json();
                }

                throw new Error("failed");
            }
        )
        .then(
            function(json) {
                saveTokenToSessionStorage(json.token);
                props.passToken(json.token);
            }
        )
        .catch(
            function(error) {
                props.modal({
                    name: "registation",
                    message: error,
                    hidden: false
                });
            }
        )
    };

    const signin = () => {
        let authenticationRequest = {};
        authenticationRequest.login = login;
        authenticationRequest.password = password;

        fetch(
            url + "signin",
            {
                method: "POST",
                body: JSON.stringify(authenticationRequest),
                headers: {
                    "Content-Type": 'application/json'
                }
            }
        )
        .then(
            function(response) {
                if (response.ok) {
                    return response.json();
                }

                throw new Error("failed");
            }
        )
        .then(
            function(json) {
                saveTokenToSessionStorage(json.token);
                props.passToken(json.token);
            }
        )
        .catch(
            function(error) {
                props.modal({
                    name: "sigin",
                    message: error,
                    hidden: false
                });
            }
        )
    };

    return (
        <>
            <h4>Velcome to my chat:)</h4>
            <div id="registration">
                <div className="form-control"><label>login:<input id="login-registration" type="text" value={login} onChange={handlerLogin} /></label></div>
                <div className="form-control"><label>password:<input id="password-registration" type="password" value={password} onChange={handlerPassword} /></label></div>
                { mode && <div className="form-control"><label>phone:<input id="phone-registration" type="text" value={phone} onChange={handlerPhone} /></label></div>}
                { mode && <div className="form-control"><label>foto:<input id="foto-registration" type="file" value={foto.value} onChange={handlerFoto} /></label></div>}
                { mode === false && <button onClick={signin}>sign in</button>}
                { mode && <button onClick={register}>register</button>}
                <button onClick={toggleMode}>{mode === false ? "registration-form" : "signin-form"}</button>
            </div>
        </>
    );
}

export default Registration;