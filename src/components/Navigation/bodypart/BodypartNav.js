import React from 'react';
import BodypartItem from './BodypartItem';
import './BodypartNav.css';

const bodypartNav = (props) => {

    const bodypartItems = props.bodypartItems.map((bodypart, bodypartIndex) => {
        return (
            <BodypartItem
                key={bodypart.id} 
                name={bodypart.name}
                clicked={()=>props.clicked(bodypartIndex)}/>
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
