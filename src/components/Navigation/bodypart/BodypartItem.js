import React from 'react';
import './BodypartItem.css';

const bodypartItem = (props) => {
    return(
        <li className="bodypartLi">
            <input className="bodypartItemInput" type="button" onClick={props.onclick} value={props.name}/>
        </li>
    );
}

export default bodypartItem;