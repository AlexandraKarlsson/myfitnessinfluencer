import React from 'react';
import MainNavItem from './MainNavItem';
import './MainNav.css';

const mainNav = (props) => {

    const mainNavItems = props.mainNavItems.map((item, index) => {
            return (
                <MainNavItem
                    key={item.id} 
                    name={item.name}
                    clicked={item.onclick}/>
            );
        }
    );

    return(
        <nav className="mainNav">
            <ul className="mainNavUl">
                {mainNavItems}
            </ul>
        </nav>
    );
}

export default mainNav;