import React from 'react'
import './MainNavItem.css'

const mainNavItem = (props) => {

    let class_name = "mainNavItemInput"

    if(props.currentMainNavItem === (props.id - 1)) {
        class_name = class_name + " mainNavItemSelected"
    }
    //<a className={class_name} onClick={props.onclick} href="#">{props.name}</a>

    return(

        <li>
            <input className={class_name} type="button" onClick={props.onclick} value={props.name}/>
            
        </li>

    )
}

export default mainNavItem