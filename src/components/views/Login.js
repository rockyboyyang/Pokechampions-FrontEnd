import React, { useState, useContext } from 'react';
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import { AppContext } from '../../context/AppContext'
import ProfessorOak from '../../assets/images/professoroak2.png'
import OpeningTheme from '../../assets/music/pokemonopening.mp3'

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

        let demo = e.target.id
        if(demo.includes('demo')) {
            body = {
                username: demo,
                password: 'password'
            }
        }

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
        if(!res.ok) {
            alert('Wrong password or username!')
        }
    }

    const handleUsernameChange = (e) => {
        setUsername(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const goToSignup = (e) => {
        history.push('/signup')
    }

    const demologin = (e) => {
        e.preventDefault()

    }

    return (
        <div className="login-form">
            <div className="logo">
                <div className="oak-dialogue-box">
                    <div className="oak-image">
                        <img src={ProfessorOak}></img>
                    </div>
                    <div className="dialogue-box">
                        <audio autoPlay='true' loop='true'>
                            <source src={OpeningTheme} type='audio/mpeg' />
                        </audio>
                        <p id='oak-signup-typewriter'>
                            <h1>Hey future Champion! Long time no see!  I see that you're well rested.  Why don't you log in and continue your quest!</h1>
                        </p>
                    </div>
                </div>
            </div>
            <div className="form-container">
                <form>
                    <div className="personal-pages-link">
                        <a className="fa fa-github-square" href='https://github.com/rockyboyyang'></a>
                        <a className="fa fa-linkedin" href='https://www.linkedin.com/in/rocky-yang-8a6669b8/'></a>
                    </div>
                    <div className="entry-fields">
                        <input type="text" placeholder="Enter Username" value={username} onChange={handleUsernameChange}></input>
                        <input type="password" placeholder="Enter Password" value={password} onChange={handlePasswordChange}></input>
                    </div>
                    <button onClick={login}>Log In</button>
                    <p id='link-to-login-signup' onClick={goToSignup}>Don't have an account?</p>
                    <div className='demoUserButtons'>
                        <button onClick={login} id="demouser">Demo</button>
                        {/* <button onClick={login} id="demouserallgymleader">Demo def. Gym Leaders</button>
                        <button onClick={login} id="demouserallelitefour">Demo def. Elite Four</button> */}
                        <button onClick={login} id="demouserchampion">Demo def. Champion</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;
