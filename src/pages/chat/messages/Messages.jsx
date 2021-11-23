import React, { useEffect, useContext } from 'react';
import { Context } from '../../../Context';
import CreateChannel from '../CreateChannel/CreateChannel';

function Messages({hideall,CreateC}) {

    const { messages } = useContext(Context);

    useEffect(() => {
        var cm = document.querySelector('.chat-messages');
        cm.scrollTop = cm.scrollHeight;
    }, [messages]);

    return (
        <div className={hideall} >
            <div style={{ "paddingTop": "10px", "backgroundColor": "#007041" }} className='chat-messages' >
            {CreateC ? <CreateChannel/> : ''}
                {
                    messages.length >= 0 ? messages.map((message) => message.chats.map((mess, index) => (
                        <div key={index}>
                            <div className="message" key={index} >
                                <p className="meta" style={{ color: 'purple' }}> {mess.user} <span> {mess.time} </span> <span>{message.date}</span></p>
                                <p className="text" style={{ "maxWidth": "80ch", "overflowWrap": "break-word" }}> {mess.msg} </p>
                            </div>
                        </div>
                    ))


                    ) : ''

                }
            </div>
        </div>
    )

}

export default Messages