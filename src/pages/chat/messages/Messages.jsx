import axios from 'axios';
import React, { useEffect, useContext, useState } from 'react';
import { Context } from '../../../Context';
import CreateChannel from '../CreateChannel/CreateChannel';

function Messages({ hideall, CreateC, setside }) {

    const { messages, showProfile, dmuser, setShowProfile, setRoomName, setdmuser, setDm, setroom, userDetails } = useContext(Context);
    const [dmuserfriend, setdmuserfriend] = useState([]);

    useEffect(() => {
        var cm = document.querySelector('.chat-messages');
        cm.scrollTop = cm.scrollHeight;
    }, [messages]);

    useEffect(() => {

    }, [dmuser]);

    useEffect(() => {

        if (!dmuser) return;
        if (showProfile) {
            if (dmuser.friends) {
                setdmuserfriend([]);
                dmuser.friends.map((id, index) => {
                    axios.get(`/getuserdetails?user=${id}`).then((details) => {
                        setdmuserfriend([dmuserfriend, details.data]);
                    });
                });
            }
        }

    }, [showProfile, dmuser]);

    return (
        <div className={hideall} >
            <div style={{ "paddingTop": "10px", "backgroundColor": "#007041" }} className='chat-messages' >
                {CreateC ? <CreateChannel /> : ''}
                {
                    !showProfile ?
                        messages.length >= 0 ? messages.map((message) => message.chats.map((mess, index) => (
                            <div key={index}>
                                <div className="message" key={index} >
                                    <p className="meta" style={{ color: 'purple' }}> {mess.user} <span> {mess.time} </span> <span>{message.date}</span></p>
                                    <p className="text" style={{ "maxWidth": "80ch", "overflowWrap": "break-word" }}> {mess.msg} </p>
                                </div>
                            </div>
                        ))
                        ) : '' : <div>
                            <div>
                                <div style={{ backgroundColor: 'lime' }} >
                                    <h1 style={{ textAlign: 'center' }} >User Name : <span style={{ color: 'red' }}  >{dmuser.userName}</span> </h1>
                                    <h1 style={{ textAlign: 'center' }}  >Friends</h1>
                                    {dmuserfriend.length === 0 ? <h1 style={{ textAlign: 'center', color: 'purple' }} > This user dont have any friends </h1> : dmuserfriend.map((user, index) => {

                                        return (
                                            user._id !== userDetails.id ? <h1 style={{ textAlign: 'center', color: 'blue' }} key={index} onClick={() => { setroom(user._id); setside(false); setDm(true); setdmuser(user); setRoomName(user.userName); setShowProfile(false); }}  >{user.userName}</h1>
                                            : <h1 style={{textAlign:'center',color:'purple'}} >You</h1>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                }
            </div>
        </div>
    )

}

export default Messages
