import React from 'react';
import BodypartItem from './BodypartItem';
import './BodypartNav.css';

const bodypartNav = (props) => {

    const bodypartItems = props.bodypartItems.map((bodypart, bodypartIndex) => {
        return (
            <BodypartItem
                key={bodypart.id} 
                name={bodypart.name}
                onclick={()=>props.onclick(bodypartIndex, bodypart.id)}/>
        );
    });

    return(
        <nav className="bodypartNav">
            <ul className="bodypartUl">
                {bodypartItems}
            </ul>
        </nav>
    );
}

export default bodypartNav;