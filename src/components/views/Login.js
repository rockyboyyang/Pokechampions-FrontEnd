import React, { useState, useContext } from 'react';
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import { AppContext } from '../../context/AppContext'

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    let history = useHistory()
    const { backendUrl, setToken, setUser, setUser_slot_1, setUser_slot_2, setUser_slot_3, setUser_slot_4, setUser_slot_5, setUser_slot_6 } = useContext(AppContext)
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
            setUser(user)
            window.localStorage.access_token = access_token; 
            window.localStorage.user = JSON.stringify(user);
            setUser_slot_1(JSON.parse(user.slot_1))
            setUser_slot_2(JSON.parse(user.slot_2))
            setUser_slot_3(JSON.parse(user.slot_3))
            setUser_slot_4(JSON.parse(user.slot_4))
            setUser_slot_5(JSON.parse(user.slot_5))
            setUser_slot_6(JSON.parse(user.slot_6))
            history.push("/home");
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
