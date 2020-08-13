import React, { useState, useContext } from 'react';
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import { AppContext } from '../../context/AppContext'

const Signup = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    let history = useHistory()
    const { backendUrl, setToken, setUser } = useContext(AppContext)

    const signup = async (e) => {
        e.preventDefault()
        if(password !== confirmPassword) {
            console.log('passwords do not match')
            return
        }
        let body = {
            username: username,
            password: password,
        };

        const res = await fetch(backendUrl + "/api/session_user/signup", {
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
            history.push("/home");
        }
    }

    const handleUsernameChange = (e) => {
        setUsername(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value)
    }

    return (
        <div className="login-form">
            <form>
                <div className="entry-fields">
                    <input type="text" placeholder="Create Username" value={username} onChange={handleUsernameChange}></input>
                    <input type="password" placeholder="Enter Password" value={password} onChange={handlePasswordChange}></input>
                    <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={handleConfirmPasswordChange}></input>
                </div>
                <button onClick={signup}>Sign Up</button>
            </form>
        </div>
    )
}

export default Signup;
