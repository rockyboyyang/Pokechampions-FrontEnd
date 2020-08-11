import React, {useState} from 'react';
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import Login from "./components/views/Login";
import Signup from "./components/views/Signup";
import Home from "./components/views/Home";
import Pokedex from "./components/views/Pokedex";
import TrainerBio from "./components/views/TrainerBio";
import { AppContext } from './context/AppContext'

const App = props => {
  const backendUrl = "http://localhost:5000"
  const [tokenState, setToken] = useState(localStorage.access_token);
  const [user, setUser] = useState(localStorage.user)

  return (
    <BrowserRouter>
      <AppContext.Provider value={{ backendUrl, setToken, setUser, user }}>
        <Switch>
          <Route path="/signup" component={Signup}/>
          <Route path="/login" component={Login} />
          <Route path="/home" component={Home} />
          <Route path="/pokedex" component={Pokedex} />
          <Route path="/trainers" component={TrainerBio} />
        </Switch>
      </AppContext.Provider>
    </BrowserRouter>
  )
}

export default App;
