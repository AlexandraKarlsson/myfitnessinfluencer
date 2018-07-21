import React from 'react';
import './MainNavItem.css';

const mainNavItem = (props) => {
    return(
        <li className="mainNavLi" onClick={props.onclick}><a className="mainNavA" href="">{props.name}</a></li>
    );
}

export default mainNavItem;