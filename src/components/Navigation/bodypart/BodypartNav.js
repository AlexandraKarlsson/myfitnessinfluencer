import React from 'react';
import BodypartItem from './BodypartItem';
import './BodypartNav.css';

const bodypartNav = (props) => {

    const bodypartItems = props.bodypartItems.map((bodypart, index) => {
            return (
                <BodypartItem
                    key={bodypart.id} 
                    name={bodypart.name}
                    clicked={bodypart.onclick}/>
            );
        }
    );

    return(
        <nav className="bodypartNav">
            <ul className="bodypartUl">
                {bodypartItems}
            </ul>
        </nav>
    );
}

export default bodypartNav;
