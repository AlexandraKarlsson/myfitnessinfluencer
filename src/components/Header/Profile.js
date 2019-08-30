import React from 'react'
import './Profile.css'

const profile = (props) => {
    const imagePath = require("../../assets/images/profile_head.png")
    console.log(props.username)
    return(
        <form>
            <div id="profile_Container">
                <img id="profile_Image" src={imagePath} alt="User img"/>
                <button id="profile_Settings" onClick={props.onclickSettings}>Settings</button>
                <button id="profile_Logout" onClick={props.onclickLogout}>Log out</button>
                <p id="profile_Username">{props.username}</p>
            </div>
        </form>
    )
}

export default profile