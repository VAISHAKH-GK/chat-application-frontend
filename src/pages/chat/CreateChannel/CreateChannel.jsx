import React, { useState,useContext } from 'react';
import axios from 'axios';
import { Context } from '../../../Context';

function CreateChannel() {

    const [channelName, setChannelName] = useState('');
    const {createChannel} = useContext(Context);

    function submit (e) {
        e.preventDefault();
        createChannel(channelName);
        setChannelName('');
    }

    return (
        <div>
            <form onSubmit={submit} >
                <div className="mb-3">
                    <label className="form-label" style={{'color':'yellow'}} >Create Channel</label>
                    <input type="text" className="form-control" id="channel-name" value={channelName} autoComplete="off" onChange={e => setChannelName(e.target.value)} placeholder="Channel-Name" name="channel-name" />
                    <button className="btn" style={{'marginTop':'5px'}} >Create Channel</button>
                </div>
            </form>
        </div>
    )
}

export default CreateChannel
