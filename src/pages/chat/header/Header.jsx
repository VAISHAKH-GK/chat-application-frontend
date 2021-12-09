import React, { useContext } from 'react';
import '../../../Style.css';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Context } from '../../../Context';
import { BiArrowBack } from "react-icons/bi";

function Header({ setclassName, side, setside, changeDisplay }) {

    const history = useHistory();

    const { setlogin, setlogout, setuserDetails, setroom, setDm, setWho, setRoomName, setdmuser } = useContext(Context);

    function logout() {
        axios.get('/logout').then((res) => {
            setlogin(false);
            setlogout(true);
            setuserDetails({});
            setroom();
            setDm(false);
            setWho('');
            setRoomName('');
            setdmuser({});

            history.push('/login');
        });
    }

    return (
        <div>
            <header className="chat-header">

                {!side ? <BiArrowBack className="menu-icon" onClick={changeDisplay} /> : ''}
                <button className="btn button-logout" onClick={() => { logout() }} >Logout</button>

            </header>
        </div>
    )
}

export default Header
