import React from 'react'
import style from './Toolbar.module.css';
import DrawerToggle from './DrawerToggle';
import Logo from './Logo';
import NavigationItems from './NavigationItems';

const toolbar = (props) => (
   <header className={style.Toolbar}>
      <DrawerToggle clicked={props.drawerToggleClicked} />
      <div className={style.Logo}>
         <Logo />
      </div>
      <nav className={style.DesktopOnly}>     
         <NavigationItems />
      </nav>
   </header>
)

export default toolbar