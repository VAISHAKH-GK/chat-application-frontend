import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Chat from './pages/chat/Chat';
import Login from './pages/login/Login';
import axios from 'axios';
import Signup from './pages/signup/Signup';
import { Context } from './Context';


function App() {

    const { login, logeout, setlogin, setlogout ,setuserDetails } = useContext(Context);

    useEffect(() => {

        axios.get('/checklog').then((logD) => {
            if (logD.data.login) {

                setuserDetails(logD.data.user);
                setlogin(true);
            } else {
                setlogin(false);
                setlogout(true);

            }

        });

    }, []);
    return (

        <Router>
            <Route exact path="/">
                {login ? <Chat /> : logeout ? <Login  /> : ''}
            </Route>
            <Route exact path="/login">
                <Login />
            </Route>
            <Route exact path="/signup">
                <Signup />
            </Route>
        </Router>

    )
}

export default App