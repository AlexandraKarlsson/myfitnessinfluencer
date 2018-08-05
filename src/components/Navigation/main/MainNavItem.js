import React from 'react';
import './MainNavItem.css';

const mainNavItem = (props) => {
    return(
        <li className="mainNavLi">
            <input type="button" className="mainNavA" onClick={props.onclick} value={props.name}/>
        </li>
    );
}

export default mainNavItem;