import React, { createContext, useState } from 'react';

export const Context = createContext();

export const ContextProvider = function (props) {

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

    const [login, setlogin] = useState(false);
    const [logeout, setlogout] = useState(false);
    const [userDetails, setuserDetails] = useState(null);

    return (
        <div>
            <Context.Provider value={{
                messages, setMessages, room, setroom, dm, setDm, dmuser, setdmuser, who, setWho, channels,
                setchannels, users, setusers, friendRequests, setFriendRequests, roomName, setRoomName, friends,
                setFriends, login, logeout, setlogin, setlogout,userDetails,setuserDetails
            }} >
                {props.children}
            </Context.Provider>
        </div>
    )
}


