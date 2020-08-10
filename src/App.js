import React, {useState} from 'react';
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import Login from "./components/views/Login";

const App = props => {
  const backendUrl = "http://localhost:5000"
  const [tokenState, setToken] = useState(localStorage.access_token);
  const [user, setUser] = useState({})

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" render={(props) => <Login {...props} backendUrl={backendUrl} setToken={setToken} setUser={setUser}/> } />
      </Switch>
    </BrowserRouter>
  )
}

export default App;
