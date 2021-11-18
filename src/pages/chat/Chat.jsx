import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import Header from './header/Header';
import '../../Style.css';
import Messages from './messages/Messages';
import Sidebar from './sideBar/Sidebar';
import ChatFrom from './chat-form/ChatFrom';


const socket = io('http://localhost:9000');

function Chat({ userDetails, setlogout, setuserDetails, setlogin }) {

    const [messages, setMessages] = useState([]);
    const [room, setroom] = useState();
    const [dm, setDm] = useState(false);
    const [dmuser, setdmuser] = useState('');
    const [who, setWho] = useState('');

    const [channels, setchannels] = useState([]);
    const [users, setusers] = useState([]);
    const [friendRequests, setFriendRequests] = useState([]);
    const [roomName, setRoomName] = useState('');
    const [friends, setFriends] = useState([]);



    function message(msg) {
        var ms = {
            msg: msg,
            userName: userDetails.userName,
            room: room,
            userId: userDetails.id
        }
        if (dm) {
            ms.receiver = dmuser;
            socket.emit('dmMessage', ms);
        } else {
            socket.emit("message", ms);
        }
    }

    useEffect(() => {
        if (userDetails && Object.keys(userDetails).length > 0) {
            axios.get(`/getchannels?user=${userDetails.userName}`).then((responce) => {
                setchannels(responce.data);
            });
            axios.get(`/getusers?user=${userDetails.id}`).then((result) => {
                setusers(result.data);
            });
            axios.get(`/getfriendrequests?user=${userDetails.id}`).then((friendReq) => {
                setFriendRequests(friendReq.data);
            });
            axios.get(`/getfriends?user=${userDetails.id}`).then((friends) => {
                setFriends(friends.data);
            });
        }
    }, [userDetails]);

    useEffect(() => {
        axios.get('/checklog').then((logD) => {
            if (logD.data.login) {
                setuserDetails(logD.data.user);
                setlogin(true);
            } else {
                setlogin(false);
                setlogout(true);
                setuserDetails(null);
            }
        });
    }, []);

    useEffect(() => {
        if (dm && dmuser) {
            axios.get(`/getwho?user=${userDetails.id}&otheruser=${dmuser}`).then((res) => {
                setWho(res.data);
            });
        }
    }, [dmuser])

    useEffect(() => {
        socket.on(room, (msg) => {
            setMessages(message => [...message, msg]);
        });
        if (userDetails) {
            socket.on(userDetails.id + dmuser, (msg) => {
                setMessages(message => [...message, msg]);
            });
            socket.on(dmuser + userDetails.id, (msg) => {
                setMessages(message => [...message, msg]);
            });
        }
        return () => { socket.off(room); if (userDetails) { socket.off(userDetails.id + dmuser); socket.off(dmuser + userDetails.id); } };

    }, [room]);

    useEffect(() => {
        if (room) {
            axios.get(`/getmessages?room=${room}`).then((message) => {
                setMessages(message.data);
            });
        } else {
            setMessages([]);
        }
    }, [room]);


    useEffect(() => {
        if (dmuser && room && dm) {
            axios.get(`/dmuser?senter=${userDetails.id}&receiver=${dmuser}`).then((message) => {
                setMessages(message.data);
            })
        }
    }, [dmuser, dm]);

    function addFriend() {
        axios.patch(`/addFriend?user=${userDetails.id}&friend=${dmuser}`).then(() => {
            axios.get(`/getwho?user=${userDetails.id}&otheruser=${dmuser}`).then((res) => {
                setWho(res.data);
                socket.emit('changeOnWho', { 'sent': userDetails.id, 'receive': dmuser });
            });

        });
    }

    function removeFriend() {
        axios.patch(`/removefriend?user=${userDetails.id}&friend=${dmuser}`).then(() => {
            axios.get(`/getwho?user=${userDetails.id}&otheruser=${dmuser}`).then((res) => {
                setWho(res.data);
                socket.emit('changeOnWho', { 'sent': userDetails.id, 'receive': dmuser });
            });
        })

    }
    useEffect(() => {
        if (!userDetails || !dmuser) return;
        socket.on('whochanged' + userDetails.id + dmuser, () => {
            axios.get(`/getwho?user=${userDetails.id}&otheruser=${dmuser}`).then((res) => {
                setWho(res.data);
            });
        });
    }, [dmuser, userDetails])

    function cancelFriendRequest() {
        axios.patch(`/cancelfriendrequest?user=${userDetails.id}&friend=${dmuser}`).then(() => {
            axios.get(`/getwho?user=${userDetails.id}&otheruser=${dmuser}`).then((res) => {
                setWho(res.data);
                socket.emit('changeOnWho', { 'sent': userDetails.id, 'receive': dmuser });
            });
        });
    }

    function acceptFriendRequest() {
        axios.patch(`acceptfriendrequest?user=${userDetails.id}&friend=${dmuser}`).then(() => {
            axios.get(`/getwho?user=${userDetails.id}&otheruser=${dmuser}`).then((res) => {
                setWho(res.data);
                socket.emit('changeOnWho', { 'sent': userDetails.id, 'receive': dmuser });
                axios.get(`/getfriendrequests?user=${userDetails.id}`).then((friendReq) => {
                    setFriendRequests(friendReq.data);
                });
            });
        });
    }

    function rejectFriendRequest() {
        axios.patch(`/rejectfriendrequest?user=${userDetails.id}&friend=${dmuser}`).then(() => {
            axios.get(`/getwho?user=${userDetails.id}&otheruser=${dmuser}`).then((res) => {
                setWho(res.data);
                socket.emit('changeOnWho', { 'sent': userDetails.id, 'receive': dmuser });
                axios.get(`/getfriendrequests?user=${userDetails.id}`).then((friendReq) => {
                    setFriendRequests(friendReq.data);
                });
            });
        })
    }

    function blockUser() {
        if (window.confirm(`Are you sure to block ${roomName} ?  `)) {
            axios.patch(`/blockuser?user=${userDetails.id}&block=${dmuser}`).then(() => {
                axios.get(`/getwho?user=${userDetails.id}&otheruser=${dmuser}`).then((res) => {
                    setWho(res.data);
                    socket.emit('changeOnWho', { 'sent': userDetails.id, 'receive': dmuser });
                });
                axios.get(`/getfriendrequests?user=${userDetails.id}`).then((friendReq) => {
                    setFriendRequests(friendReq.data);
                });
            });
        }
    }

    function unBlockUser() {
        if ((window.confirm(`Are you sure to Unblock ${roomName} ? `))) {
            axios.patch(`unblockuser?user=${userDetails.id}&block=${dmuser}`).then(() => {
                axios.get(`/getwho?user=${userDetails.id}&otheruser=${dmuser}`).then((res) => {
                    setWho(res.data);
                    socket.emit('changeOnWho', { 'sent': userDetails.id, 'receive': dmuser });
                });
            });
        }
    }

    return (
        <div>
            <div className="chat-container">
                <Header setlogout={setlogout} setlogin={setlogin} setuserDetails={setuserDetails} />
                <main className="chat-main">
                    <Sidebar userDetails={userDetails} room={room} setRoomName={setRoomName} friends={friends} setDm={setDm} channels={channels} users={users} friendRequests={friendRequests} setdmuser={setdmuser} setWho={setWho} setroom={setroom} />
                    <div>
                        {room ? !dm ? <div style={{ display: "flex", justifyContent: "right", "backgroundColor": "#10422b", "padding": "20px" }}>
                            <p className="ml-auto btn roomname" style={{ "marginBottom": '0' }} > {roomName} </p> <p className="ml-auto btn" style={{ "marginBottom": '0' }} > Delete Channel </p> </div>

                            : who === 'blockedyou' ? <div style={{ display: "flex", justifyContent: "right", "backgroundColor": "#10422b", "padding": "20px" }}>
                                <p className="ml-auto btn roomname" style={{ "marginBottom": '0' }} > {roomName} </p> <p className="ml-auto " style={{ "marginBottom": '0', backgroundColor: 'yellow', color: 'red', fontSize: '19px', padding: '5px' }} > This user blocked you </p> </div> : who === 'stranger' ? <div style={{ display: "flex", justifyContent: "right", "backgroundColor": "#10422b", "padding": "20px" }}>
                                    <p className="ml-auto btn roomname" style={{ "marginBottom": '0' }} > {roomName} </p> <p className="ml-auto btn" style={{ "marginBottom": '0' }} onClick={() => { blockUser() }} > Block </p>  <p onClick={e => addFriend()} className="ml-auto btn" style={{ "marginBottom": '0', 'marginLeft': '5px' }} >  Add Friend </p> </div> : who === 'friend' ?
                                <div style={{ display: "flex", justifyContent: "right", "backgroundColor": "#10422b", "padding": "20px" }}>
                                    <p className="ml-auto btn roomname" style={{ "marginBottom": '0' }} > {roomName} </p> <p onClick={e => removeFriend()} className="ml-auto btn" style={{ "marginBottom": '0' }} >  Remove friend </p> </div> : who === 'requestsend' ?
                                    <div style={{ display: "flex", justifyContent: "right", "backgroundColor": "#10422b", "padding": "20px" }}>
                                        <p className="ml-auto btn roomname" style={{ "marginBottom": '0' }} > {roomName} </p>   <p onClick={e => cancelFriendRequest()} className="ml-auto btn" style={{ "marginBottom": '0' }} >  Cancel request </p> </div> : who === 'requestreceive' ?
                                        <div style={{ display: "flex", justifyContent: "right", "backgroundColor": "#10422b", "padding": "20px" }}>
                                            <p className="ml-auto btn roomname" style={{ "marginBottom": '0' }} > {roomName} </p>   <p onClick={e => acceptFriendRequest()} className="ml-auto btn" style={{ "marginBottom": '0', 'marginLeft': '5px' }} >  Accept request </p>
                                            <p className="ml-auto btn" style={{ "marginBottom": '0', 'marginLeft': '5px' }} onClick={e => rejectFriendRequest()} > Reject Friend request </p> </div> : who === 'blocked' ?
                                            <div style={{ display: "flex", justifyContent: "right", "backgroundColor": "#10422b", "padding": "20px" }}>
                                                <p className="ml-auto btn roomname" style={{ "marginBottom": '0' }} > {roomName} </p>
                                                <p className="ml-auto btn" style={{ "marginBottom": '0' }} onClick={() => { unBlockUser() }} > Un-Block </p>
                                            </div>
                                            : ''
                            : <div style={{ display: "flex", justifyContent: "right", "backgroundColor": "#10422b", "height": "78px" }}>

                            </div>}

                        <Messages msg={true} userDetails={userDetails} messages={messages} dm={dm} setDm={setDm} setMessages={setMessages} />
                    </div>
                </main>
                {room ? dm ? who !== 'blockedyou' ? who !== 'blocked' ? <ChatFrom userDetails={userDetails} socket message={message} /> : '' : '' :
                    <ChatFrom userDetails={userDetails} socket message={message} /> : ''}
            </div>
        </div>
    )
}
export default Chat
