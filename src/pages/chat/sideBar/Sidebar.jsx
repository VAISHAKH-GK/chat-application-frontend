import React, { useState, useContext } from 'react';
import '../../../Style.css';
import { Context } from '../../../Context'


function Sidebar({ className, setside, side, hideall, setCreateC, CreateC }) {


    const [showU, setShowU] = useState(false);
    const [showC, setShowC] = useState(false);
    const [showFR, setShowFR] = useState(false);
    const [showF, setShowF] = useState(false);

    const { setroom, userDetails, setRoomName, friends, setDm, channels, users, friendRequests, setdmuser, setRoomOwner } = useContext(Context);

    return (
        <div className={hideall}>
            <div className={className.sidebar}>
                <hr />
                <h3><i className="fas fa-comments" ></i> <p className="link" onClick={e => { setroom(null); setCreateC(false); setDm(false); setRoomName(''); setdmuser(); }} style={{ textDecoration: 'none', color: 'white' }} > {userDetails ? userDetails.userName : ''} </p></h3>
                <hr />
                <hr />
                <h5 className="channelslist" style={{ textDecoration: " none ", color: "white", backgroundColor: 'black', display: 'flex', justifyContent: 'center' }} onClick={() => setShowU(!showU)} >Users</h5>
                {
                    showU ? <div>
                        <ul id="users">
                            <hr />
                            {users.map((user, i) => {
                                return (<li key={i} onClick={() => { setCreateC(false); setroom(user._id); setside(false); setDm(true); setdmuser(user._id); setRoomName(user.userName); }} style={{'color':'cyan',marginBottom:'3px',width:'auto','marginLeft':'auto','marginRight':'auto'}} >{user.userName}</li>)
                            })}
                        </ul>

                    </div> : ''
                }
                <hr />
                <h5 className="channelslist link" style={{ textDecoration: " none ", color: "white", backgroundColor: 'black', display: 'flex', justifyContent: 'center' }} onClick={() => setShowC(!showC)} >Channels</h5>
                {
                    showC ? <div>
                        <ul className="channels">
                            <hr />
                            <p onClick={e => { setroom(null); setDm(false); setRoomName(''); setdmuser(); setCreateC(true); setside(false); }} style={{'color':'yellow',marginBottom:'5px'}} >Create New Channel </p>
                            {channels.map((obj, index) => {
                                return (
                                    <li key={index}><p id="channels" onClick={() => { setroom(obj._id); setside(false); setCreateC(false); setDm(false); setRoomName(obj.name); setRoomOwner(obj.ownerDetails); }} style={{'color':'cyan',marginBottom:'3px',width:'auto','marginLeft':'auto','marginRight':'auto'}} >{obj.name}</p></li>
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
                            {friendRequests.map((user, index) => {
                                return (
                                    <li key={index}><p id="channels" onClick={() => { setroom(user._id); setCreateC(false); setside(false); setDm(true); setdmuser(user._id); setRoomName(user.userName); }} style={{'color':'cyan',marginBottom:'3px',width:'auto','marginLeft':'auto','marginRight':'auto'}} >{user.userName}</p></li>
                                )
                            })}
                        </ul>
                    </div> : ''
                }
                <hr />
                <h5 className="channelslist" style={{ textDecoration: " none ", color: "white", backgroundColor: 'black', display: 'flex', justifyContent: 'center' }} onClick={() => setShowF(!showF)} >Friends</h5>
                {
                    showF ? <div>
                        <ul id="users">
                            <hr />
                            {friends.map((user, i) => {
                                return (<li key={i} onClick={() => { setroom(user._id); setDm(true); setCreateC(false); setside(false); setdmuser(user._id); setRoomName(user.userName); }} style={{'color':'cyan',marginBottom:'3px',width:'auto','marginLeft':'auto','marginRight':'auto'}} >{user.userName}</li>)
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
