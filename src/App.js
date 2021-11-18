import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Chat from './pages/chat/Chat';
import Login from './pages/login/Login';
import axios from 'axios';
import Signup from './pages/signup/Signup';

function App() {

    const [login, setlogin] = useState(false);
    const [logeout, setlogout] = useState(false);
    const [userDetails, setuserDetails] = useState(null);

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
                {login ? <Chat setlogin={setlogin} setlogout={setlogout} setuserDetails={setuserDetails} userDetails={userDetails} /> : logeout ? <Login setlogin={setlogin} /> : ''}
            </Route>
            <Route exact path="/login">
                <Login setlogin={setlogin} />
            </Route>
            <Route exact path="/signup">
                <Signup />
            </Route>
        </Router>

    )
}

export default App