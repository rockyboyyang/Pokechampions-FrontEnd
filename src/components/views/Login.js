import React, { useState } from 'react';
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";

const Login = ({ backendUrl, setToken, setUser }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    let history = useHistory()

    const login = async (e) => {
        e.preventDefault()
        let body = {
            username: username,
            password: password,
        };

        const res = await fetch(backendUrl + "/api/session_user", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        })
        console.log(res)
        if (res.ok) {
            const { access_token, user } = await res.json();
            setToken({ access_token });
            setUser({ user })
            window.localStorage.access_token = access_token; 
            window.localStorage.user = JSON.stringify(user);
            history.push("/");
        }
    }

    const handleUsernameChange = (e) => {
        setUsername(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    return (
       <div className="login-form">
           <form>
               <div className="entry-fields">
                    <input type="text" placeholder="Enter Username" value={username} onChange={handleUsernameChange}></input>
                    <input type="password" placeholder="Enter Password" value={password} onChange={handlePasswordChange}></input>
               </div>
               <button onClick={login}>Log In</button>
           </form>
       </div>
    )
}

export default Login;
