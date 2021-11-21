import React, { useContext } from 'react';
import '../../../Style.css';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Context } from '../../../Context'

function Header() {

    const history = useHistory();

    const {setlogin,setlogout,setuserDetails} = useContext(Context);

    function logout() {
        axios.get('/logout').then((res) => {
            setlogin(false);
            setlogout(true);
            setuserDetails({});
            history.push('/login');
        });
    }

    return (
        <div>
            <header className="chat-header">

                <h1 style={{ "color": "#8f7daf" }}><i className="fas fa-smile" id="userName"></i> </h1>
                <i data-user-name="" id="channel"></i>
                <a href="/createchannel" className="btn">Create Channel</a>
                <a href="/" className="btn" >  Leave Room</a>
                <button className="btn" onClick={() => { logout() }} >Logout</button>


            </header>
        </div>
    )
}

export default Header
