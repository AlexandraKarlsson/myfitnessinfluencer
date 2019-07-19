import React from 'react'
import MainNavItem from './MainNavItem'
import './MainNav.css'

const mainNav = (props) => {

    let class_name = "mainNav_ItemContainer"
    if(props.mainNavHidden === true) {
        class_name = class_name + " mainNav_ItemContainerHidden"
    }

    

    const mainNavItems = props.mainNavItems.map( (menuItem, menuItemIndex) => {
        return(
            <MainNavItem
                key={menuItem.id}
                id={menuItem.id}
                name={menuItem.name}
                currentMainNavItem={props.currentMainNavItem}
                onclick={()=>props.onclick(menuItemIndex)}/>
        )
    })

    return(
        <div>
            <div className="mainNav_MenuContainer">
                <button onClick={props.toggleMainNav}>MENU</button>
                <p>{props.mainNavItems[props.currentMainNavItem].name}</p>
            </div>

            <nav className={class_name}>
                <ol>
                    {mainNavItems}
                </ol>
            </nav>
        </div>
    )
}

export default mainNav