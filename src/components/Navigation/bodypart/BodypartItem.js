import React from 'react';
import './BodypartItem.css';

const bodypartItem = (props) => {

    
    let class_name = "bodypartItemInput "
    
    //adapt className list depended on selected item
    if(props.id === props.currentBodypart) {
        class_name = class_name + "bodypartItemInputSelected"
    }
    

    return(
        <li className="bodypartLi">
            <input className={class_name} type="button" onClick={props.onclick} value={props.name}/>
        </li>
    );
}

export default bodypartItem;