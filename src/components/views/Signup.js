import React, { useState, useContext } from 'react';
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import { AppContext } from '../../context/AppContext'
import ProfessorOak from '../../assets/images/professoroak2.png'
import OpeningTheme from '../../assets/music/pokemonopening.mp3'

const Signup = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    let history = useHistory()
    const { backendUrl, setToken, setUser, setUser_slot_1, setUser_slot_2, setUser_slot_3, setUser_slot_4, setUser_slot_5, setUser_slot_6 } = useContext(AppContext)

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

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value)
    }

    return (
        <div className="login-form">
            <div className="logo">
                <div className="oak-dialogue-box">
                    <div className="oak-image">
                        <img src={ProfessorOak}></img>
                    </div>
                    <div className="dialogue-box">
                        <audio autoplay='true'>
                            <source src={OpeningTheme} type='audio/mpeg'/>
                        </audio>
                        <p id='oak-signup-typewriter'>
                           <h1>Welcome to the world of Pokemon.  I am Professor Oak.  If you are new to the Pokemon challenge, please sign up and register for the Pokemon League.</h1>
                        </p>
                    </div>
                </div>
            </div>
            <div className="form-container">
                <form>
                    <div className="entry-fields">
                        <input type="text" placeholder="Create Username" value={username} onChange={handleUsernameChange}></input>
                        <input type="password" placeholder="Enter Password" value={password} onChange={handlePasswordChange}></input>
                        <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={handleConfirmPasswordChange}></input>
                    </div>
                    <button onClick={signup}>Sign Up</button>
                </form>
            </div>
        </div>
    )
}

export default Signup;
