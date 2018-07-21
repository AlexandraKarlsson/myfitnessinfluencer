import React from 'react';
import './BodypartItem.css';

const bodypartItem = (props) => {
    return(
        <li className="bodypartLi" onClick={props.onclick}><a className="bodypartA" href="">{props.name}</a></li>
    );
}

export default bodypartItem;