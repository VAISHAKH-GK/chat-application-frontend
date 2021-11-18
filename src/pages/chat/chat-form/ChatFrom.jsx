import React, { useEffect, useState } from 'react';
import { TextField, Button } from '@material-ui/core';
// import { makeStyles } from '@material-ui/core/styles';

function ChatFrom(props) {

    const [message, setmessage] = useState();
    function sendMessage(e) {
        e.preventDefault();
        if (message !== '') {
            props.message(message);
        }
        setmessage('');
        document.getElementById('message').focus();

    }

    useEffect(() => {

        var input = document.getElementById('message');
        input.addEventListener('keypress', (e) => {
            if (e.code === "Enter" && !e.shiftKey) {
                e.preventDefault();
                document.getElementById('submit').click();
                setmessage('');
            }
        });
    });

    return (
        <div>
            <div className="chat-form-container" style={{ backgroundColor: '#707070' }}>
                <form id="chat-form" onSubmit={(e) => sendMessage(e)}>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                        <div style={{ width: '80%', float: 'left' }}>
                            <TextField id="message"  label="Message" variant="filled"
                                value={message} onChange={(e) => setmessage(e.target.value)} fullWidth multiline placeholder="Message" size='small' color='secondary'  />
                        </div>
                        <div>
                            <Button variant="contained" style={{ float: 'left', height: "48px", widtdh: 'auto' ,backgroundColor:'#feffbc' }} id="submit" type="submit" >Send</Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ChatFrom
