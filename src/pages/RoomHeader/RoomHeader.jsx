import React, { useContext } from 'react';
import { Context } from '../../Context';


function Main({ CreateC }) {
    const { room, dm, who, roomName, addFriend, rejectFriendRequest, removeFriend, acceptFriendRequest, blockUser, unBlockUser, cancelFriendRequest } = useContext(Context);

    if (room && !dm) {
        return (
            <div style={{ display: "flex", justifyContent: "right", "backgroundColor": "#10422b", "padding": "20px" }}>
                <p className="ml-auto btn roomname" style={{ "marginBottom": '0' }} > {roomName} </p> <p className="ml-auto btn" style={{ "marginBottom": '0' }} > Delete Channel </p> </div>
        )
    } else if (room) {
        if (who === 'blockedyou') {
            return (
                <div style={{ display: "flex", justifyContent: "right", "backgroundColor": "#10422b", "padding": "20px" }}>
                    <p className="ml-auto btn roomname" style={{ "marginBottom": '0' }} > {roomName} </p> <p className="ml-auto " style={{ "marginBottom": '0', backgroundColor: 'yellow', color: 'red', fontSize: '19px', padding: '5px' }} > This user blocked you </p> </div>
            )
        } else if (who === 'stranger') {
            return (
                <div style={{ display: "flex", justifyContent: "right", "backgroundColor": "#10422b", "padding": "20px" }}>
                    <p className="ml-auto btn roomname" style={{ "marginBottom": '0' }} > {roomName} </p> <p className="ml-auto btn" style={{ "marginBottom": '0' }} onClick={() => { blockUser() }} > Block </p>  <p onClick={e => addFriend()} className="ml-auto btn" style={{ "marginBottom": '0', 'marginLeft': '5px' }} >  Add Friend </p> </div>
            )
        } else if (who === 'friend') {
            return (
                <div style={{ display: "flex", justifyContent: "right", "backgroundColor": "#10422b", "padding": "20px" }}>
                    <p className="ml-auto btn roomname" style={{ "marginBottom": '0' }} > {roomName} </p> <p onClick={e => removeFriend()} className="ml-auto btn" style={{ "marginBottom": '0' }} >  Remove friend </p> </div>
            )
        } else if (who === 'requestsend') {
            return (
                <div style={{ display: "flex", justifyContent: "right", "backgroundColor": "#10422b", "padding": "20px" }}>
                    <p className="ml-auto btn roomname" style={{ "marginBottom": '0' }} > {roomName} </p>   <p onClick={e => cancelFriendRequest()} className="ml-auto btn" style={{ "marginBottom": '0' }} >  Cancel request </p> </div>
            )
        } else if (who === 'requestreceive') {
            return (
                <div style={{ display: "flex", justifyContent: "right", "backgroundColor": "#10422b", "padding": "20px" }}>
                    <p className="ml-auto btn roomname" style={{ "marginBottom": '0' }} > {roomName} </p>   <p onClick={e => acceptFriendRequest()} className="ml-auto btn" style={{ "marginBottom": '0', 'marginLeft': '5px' }} >  Accept request </p>
                    <p className="ml-auto btn" style={{ "marginBottom": '0', 'marginLeft': '5px' }} onClick={e => rejectFriendRequest()} > Reject Friend request </p> </div>
            )
        } else if (who === 'blocked') {
            return (
                <div style={{ display: "flex", justifyContent: "right", "backgroundColor": "#10422b", "padding": "20px" }}>
                    <p className="ml-auto btn roomname" style={{ "marginBottom": '0' }} > {roomName} </p>
                    <p className="ml-auto btn" style={{ "marginBottom": '0' }} onClick={() => { unBlockUser() }} > Un-Block </p>
                </div>
            )
        }
    } else if (CreateC) {
        return (
            <div style={{ display: "flex", justifyContent: "right", "backgroundColor": "#10422b", "height": "78px" }}>
                <h1 style={{ 'color': 'white', 'marginLeft': 'auto', 'marginRight': 'auto', 'marginBottom': 'auto', 'marginTop': 'auto' }} >Create New Channel </h1>
            </div>
        )
    } else {
        return (
            <div style={{ display: "flex", justifyContent: "right", "backgroundColor": "#10422b", "height": "78px" }}></div>
        )
    }
    return (
        <div />
    )
}
function RoomHeader({ CreateC }) {
    return (
        <Main CreateC={CreateC} />
    )
}

export default RoomHeader
