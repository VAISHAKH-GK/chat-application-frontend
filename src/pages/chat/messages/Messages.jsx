import React, { useEffect, useContext, useState } from 'react';
import { Context } from '../../../Context';
import CreateChannel from '../CreateChannel/CreateChannel';

function Messages({ hideall, CreateC }) {

    const { messages, showProfile, dmuser } = useContext(Context);

    useEffect(() => {
        var cm = document.querySelector('.chat-messages');
        cm.scrollTop = cm.scrollHeight;
    }, [messages]);

    useEffect(() => {
        if (!dmuser) return ;
        if (dmuser.friends) {
            dmuser.friends.map((friend, index) => {
                setdmuserfriend(friend);
            })
        } 
    }, [dmuser]);

    const [dmuserfriend,setdmuserfriend] = useState('');

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
                                    <h1 style={{ textAlign: 'center' }} >User Name : <span style={{ color: 'red' }} >{dmuser.userName}</span> </h1>
                                    <h1>{dmuserfriend}</h1>
                                </div>
                            </div>
                        </div>
                }
            </div>
        </div>
    )

}

export default Messages