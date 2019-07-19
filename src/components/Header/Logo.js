import React from 'react'
import './Logo.css'

const logo = (props) => {

    const imagePath = require("../../assets/images/logo_heart.png")

    return(
        <div id="logo_Container">
            <img id="logo_Image" src={imagePath} alt="LOGO"/>
            <h1 id="logo_Name">Fitness Influencer</h1>
        </div>
    )
}

export default logo