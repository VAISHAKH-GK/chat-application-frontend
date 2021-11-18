import React, { useState, useEffect } from 'react';
import '../../../Style.css';
import axios from 'axios';


function Sidebar(props) {


    const [showU, setShowU] = useState(false);
    const [showC, setShowC] = useState(false);
    const [showFR,setShowFR] = useState(false);
    const [showF,setShowF] = useState(false);

    return (
        <div>
            <div className="chat-sidebar">
                <hr />
                <h3><i className="fas fa-comments" ></i> <p className="link" onClick={e => { props.setroom(null); props.setDm(false);props.setRoomName('');props.setdmuser(); }} style={{ textDecoration: 'none', color: 'white' }} > {props.userDetails ? props.userDetails.userName : ''} </p></h3>
                <hr />
                <hr />
                <h5 className="channelslist" style={{ textDecoration: " none ", color: "white", backgroundColor: 'black', display: 'flex', justifyContent: 'center' }} onClick={() => setShowU(!showU)} >Users</h5>
                {
                    showU ? <div>
                        <ul id="users">
                            <hr />
                            {props.users.map((user, i) => {
                                return (<li key={i} onClick={() => { props.setroom(user._id); props.setDm(true); props.setdmuser(user._id);props.setRoomName(user.userName);  }} >{user.userName}</li>)
                            })}
                        </ul>

                    </div> : ''
                }
                <hr />
                <h5 className="channelslist link"  style={{ textDecoration: " none ", color: "white", backgroundColor: 'black', display: 'flex', justifyContent: 'center' }} onClick={() => setShowC(!showC)} >Channels</h5>
                {
                    showC ? <div>
                        <ul className="channels">
                            <hr />
                            {props.channels.map((obj, index) => {
                                return (
                                    <li key={index}><p id="channels" onClick={() => { props.setroom(obj._id); props.setDm(false);props.setRoomName(obj.name); }} >{obj.name}</p></li>
                                )
                            })}
                        </ul>
                    </div> : ''
                }
                <hr />
                <h5 className="channelslist" style={{ textDecoration: " none ", color: "white", backgroundColor: 'black', display: 'flex', justifyContent: 'center' }} onClick={() => setShowFR(!showFR)} >Friend Requests</h5>
                {
                    showFR ? <div>
                        <ul className="channels">
                            <hr />
                            {props.friendRequests.map((user, index) => {
                                return (
                                    <li key={index}><p id="channels" onClick={() => { props.setroom(user._id); props.setDm(true); props.setdmuser(user._id); props.setRoomName(user.userName); }} >{user.userName}</p></li>
                                )
                            })}
                        </ul>
                    </div> : ''
                }
                <hr/>
                <h5 className="channelslist" style={{ textDecoration: " none ", color: "white", backgroundColor: 'black', display: 'flex', justifyContent: 'center' }} onClick={() => setShowF(!showF)} >Friends</h5>
                {
                    showF ? <div>
                        <ul id="users">
                            <hr />
                            {props.friends.map((user, i) => {
                                return (<li key={i} onClick={() => { props.setroom(user._id); props.setDm(true); props.setdmuser(user._id);props.setRoomName(user.userName);  }} >{user.userName}</li>)
                            })}
                        </ul>

                    </div> : ''
                }
                <hr />
                <ul id="users" className="userslist">
                    <li id="allusers"></li>
                </ul>
            </div>
        </div>
    )
}

export default Sidebar
