import React from 'react';
import MainNavItem from './MainNavItem';
import './MainNav.css';

const toggleNav = () => {
        console.log("Executing toggleNav");

        var mainNavUl = document.querySelector('.mainNavUl');
        console.log(mainNavUl);
        if(mainNavUl.classList.contains('hidden') === true) {
            mainNavUl.classList.remove('hidden');
        } else {
            mainNavUl.classList.add('hidden');
        }
};

const mainNav = (props) => {

    const mainNavItems = props.mainNavItems.map((item, index) => {
            return (
                <MainNavItem
                    key={item.id} 
                    name={item.name}
                    onclick={() => props.onclick(index)}/>
            );
        }
    );



    return(
        <div className="mainNav">
            <input type="button" onClick={toggleNav} className="mainNavButton" value="&#9776;"/>
            <ul className="mainNavUl hidden">
                {mainNavItems}
            </ul>
        </div>
    );
}

export default mainNav;