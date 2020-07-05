import React from 'react'
import NavigationItem from './NavigationItem';
import style from './NavigationItems.module.css';

const NavigationItems = (props) => (
   <ul className={style.NavigationItems}>
      <NavigationItem link="/" exact>Burger Builder</NavigationItem>
      <NavigationItem link="/orders">Orders</NavigationItem>
      {!props.isAuthenticated ?
         <NavigationItem link="/auth">Authenticate</NavigationItem> :
         <NavigationItem link="/logout">Logout</NavigationItem>}
   </ul>
)

export default NavigationItems;