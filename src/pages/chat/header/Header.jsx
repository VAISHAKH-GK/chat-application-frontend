import React, { useContext, useState, useEffect } from 'react';
import '../../../Style.css';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Context } from '../../../Context';
import { AiOutlineMenu } from "react-icons/ai";
import { HiSwitchHorizontal } from 'react-icons/hi'

function Header({ setclassName }) {

    const history = useHistory();

    const { setlogin, setlogout, setuserDetails } = useContext(Context);
    const [side, setside] = useState(false);

    function logout() {
        axios.get('/logout').then((res) => {
            setlogin(false);
            setlogout(true);
            setuserDetails({});
            history.push('/login');
        });
    }

    function changeDisplay() {
        setside(!side);

    }

    useEffect(() => {
        if (!side) {
            setclassName({ sidebar: "hide", showmc: true });
        } else if (side) {
            setclassName({ sidebar: "chat-sidebar", showmc: false });
        }
    }, [side])

    return (
        <div>
            <header className="chat-header">
                {/* <h1 style={{ "color": "#8f7daf" }}><i className="fas fa-smile" id="userName"></i> </h1> */}
                {/* <i data-user-name="" id="channel"></i> */}
                {/* <AiOutlineMenu className="menu-icon" onClick={changeDisplay} /> */}
                <HiSwitchHorizontal className="menu-icon" onClick={changeDisplay} />
                <button className="btn button-logout" onClick={() => { logout() }} >Logout</button>


            </header>
        </div>
    )
}

export default Header
