import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import Header from './header/Header';
import '../../Style.css';
import Messages from './messages/Messages';
import Sidebar from './sideBar/Sidebar';
import ChatFrom from './chat-form/ChatFrom';
import { Context } from '../../Context';
import RoomHeader from '../RoomHeader/RoomHeader';


const socket = io('http://localhost:9000');

function Chat() {



    const { setMessages, room, dm, dmuser, who, setWho, setchannels,
        setusers, setFriendRequests, roomName, setFriends, userDetails, setlogout, setuserDetails, setlogin, setdmuser } = useContext(Context);

    const [className, setclassName] = useState({ sidebar: "chat-sidebar", showmc: 'hidemsg', hideall: 'hide-all' });
    const [side, setside] = useState(true);
    const [CreateC, setCreateC] = useState(false);


    function message(msg) {
        var ms = {
            msg: msg,
            userName: userDetails.userName,
            room: room,
            userId: userDetails.id
        }
        if (dm) {
            ms.receiver = dmuser._id;
            socket.emit('dmMessage', ms);
        } else {
            socket.emit("message", ms);
        }
    }

    function changeDisplay() {
        setside(true);
    }

    useEffect(() => {
        if (!side) {
            setclassName({ sidebar: "hide", showmc: 'chat-messages', hideall: '' });
        } else if (side) {
            setclassName({ sidebar: "chat-sidebar", showmc: 'hidemsg', hideall: 'hide-all' });
        }
    }, [side]);

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
        if (dm && dmuser._id) {
            axios.get(`/getwho?user=${userDetails.id}&otheruser=${dmuser._id}`).then((res) => {
                setWho(res.data);
            });
        }
    }, [dmuser])

    useEffect(() => {
        socket.on(room, (msg) => {
            setMessages(message => [...message, msg]);
        });
        if (userDetails) {
            if (dmuser) {
                socket.on(userDetails.id + dmuser._id, (msg) => {
                    setMessages(message => [...message, msg]);
                });
                socket.on(dmuser._id + userDetails.id, (msg) => {
                    setMessages(message => [...message, msg]);
                });
            }
        }
        return () => { socket.off(room); if (userDetails ) { socket.off(userDetails.id + dmuser._id); socket.off(dmuser._id + userDetails.id); } };

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
        if (!dmuser) return ;
        if (dmuser._id && room && dm) {
            axios.get(`/dmuser?senter=${userDetails.id}&receiver=${dmuser._id}`).then((message) => {
                setMessages(message.data);
            })
        }
    }, [dmuser, dm]);

    function addFriend() {
        axios.patch(`/addFriend?user=${userDetails.id}&friend=${dmuser._id}`).then(() => {
            axios.get(`/getwho?user=${userDetails.id}&otheruser=${dmuser._id}`).then((res) => {
                setWho(res.data);
                socket.emit('changeOnWho', { 'sent': userDetails.id, 'receive': dmuser._id });
            });

        });
    }

    function removeFriend() {
        axios.patch(`/removefriend?user=${userDetails.id}&friend=${dmuser._id}`).then(() => {
            axios.get(`/getwho?user=${userDetails.id}&otheruser=${dmuser._id}`).then((res) => {
                setWho(res.data);
                socket.emit('changeOnWho', { 'sent': userDetails.id, 'receive': dmuser._id });
                axios.get(`/getfriends?user=${userDetails.id}`).then((friends) => {
                    setFriends(friends.data);
                });
            });
        })

    }
    useEffect(() => {
        if (!userDetails || !dmuser) return;
        socket.on('whochanged' + userDetails.id + dmuser._id, () => {
            axios.get(`/getwho?user=${userDetails.id}&otheruser=${dmuser._id}`).then((res) => {
                setWho(res.data);
            });
        });
    }, [dmuser, userDetails])

    function cancelFriendRequest() {
        axios.patch(`/cancelfriendrequest?user=${userDetails.id}&friend=${dmuser._id}`).then(() => {
            axios.get(`/getwho?user=${userDetails.id}&otheruser=${dmuser._id}`).then((res) => {
                setWho(res.data);
                socket.emit('changeOnWho', { 'sent': userDetails.id, 'receive': dmuser._id });
            });
        });
    }

    function acceptFriendRequest() {
        axios.patch(`acceptfriendrequest?user=${userDetails.id}&friend=${dmuser._id}`).then(() => {
            axios.get(`/getwho?user=${userDetails.id}&otheruser=${dmuser._id}`).then((res) => {
                setWho(res.data);
                socket.emit('changeOnWho', { 'sent': userDetails.id, 'receive': dmuser._id });
                axios.get(`/getfriendrequests?user=${userDetails.id}`).then((friendReq) => {
                    setFriendRequests(friendReq.data);
                });
                axios.get(`/getfriends?user=${userDetails.id}`).then((friends) => {
                    setFriends(friends.data);
                });
                axios.get(`/getuserdetails?user=${dmuser._id}`).then((userDetails) => {
                    setdmuser(userDetails);
                });
            });
        });
    }

    function rejectFriendRequest() {
        axios.patch(`/rejectfriendrequest?user=${userDetails.id}&friend=${dmuser._id}`).then(() => {
            axios.get(`/getwho?user=${userDetails.id}&otheruser=${dmuser._id}`).then((res) => {
                setWho(res.data);
                socket.emit('changeOnWho', { 'sent': userDetails.id, 'receive': dmuser._id });
                axios.get(`/getfriendrequests?user=${userDetails.id}`).then((friendReq) => {
                    setFriendRequests(friendReq.data);
                });
                axios.get(`/getfriends?user=${userDetails.id}`).then((friends) => {
                    setFriends(friends.data);
                });
                axios.get(`/getuserdetails?user=${dmuser._id}`).then((userDetails) => {
                    setdmuser(userDetails.data);
                });
            });
        })
    }

    function blockUser() {
        if (window.confirm(`Are you sure to block ${roomName} ?  `)) {
            axios.patch(`/blockuser?user=${userDetails.id}&block=${dmuser._id}`).then(() => {
                axios.get(`/getwho?user=${userDetails.id}&otheruser=${dmuser._id}`).then((res) => {
                    setWho(res.data);
                    socket.emit('changeOnWho', { 'sent': userDetails.id, 'receive': dmuser._id });
                });
                axios.get(`/getfriendrequests?user=${userDetails.id}`).then((friendReq) => {
                    setFriendRequests(friendReq.data);
                });
            });
        }
    }

    function unBlockUser() {
        if ((window.confirm(`Are you sure to Unblock ${roomName} ? `))) {
            axios.patch(`unblockuser?user=${userDetails.id}&block=${dmuser._id}`).then(() => {
                axios.get(`/getwho?user=${userDetails.id}&otheruser=${dmuser._id}`).then((res) => {
                    setWho(res.data);
                    socket.emit('changeOnWho', { 'sent': userDetails.id, 'receive': dmuser._id });
                });
            });
        }
    }

    return (
        <div>
            <div className="chat-container">
                <Header setclassName={setclassName} side={side} setside={setside} changeDisplay={changeDisplay} />
                <main className="chat-main">
                    <Sidebar className={className} setCreateC={setCreateC} CreateC={CreateC} setside={setside} side={side} />
                    <div>
                        <div className={className.hideall}>
                            <RoomHeader CreateC={CreateC} removeFriend={removeFriend} rejectFriendRequest={rejectFriendRequest} addFriend={addFriend} blockUser={blockUser} unBlockUser={unBlockUser} acceptFriendRequest={acceptFriendRequest} cancelFriendRequest={cancelFriendRequest} />
                        </div>
                        <Messages CreateC={CreateC} hideall={className.hideall} />
                    </div>
                </main>
                <div className={className.hideall} >
                    {room ? dm ? who !== 'blockedyou' ? who !== 'blocked' ? <ChatFrom message={message} /> : '' : '' :
                        <ChatFrom message={message} /> : ''}
                </div>

            </div>
        </div>
    )
}
export default Chat
