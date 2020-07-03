import React from 'react'
import NavigationItem from './NavigationItem';
import style from './NavigationItems.module.css';

const NavigationItems = () => (
   <ul className={style.NavigationItems}>
      <NavigationItem link="/" exact>Burger Builder</NavigationItem>
      <NavigationItem link="/orders">Orders</NavigationItem>
      <NavigationItem link="/auth">Authenticate</NavigationItem>
   </ul>
)

export default NavigationItems