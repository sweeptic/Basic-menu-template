import style from './SideDrawer.module.css';
import React from 'react'
import Aux from './_Aux';
import Backdrop from './BackDrop';
import NavigationItems from './NavigationItems';
import Logo from './Logo';

const SideDrawer = (props) => {
   let attachedClasses = [style.SideDrawer, style.Close];
   if (props.open) {
      attachedClasses = [style.SideDrawer, style.Open];
   }


   return (
      <Aux>
         <Backdrop show={props.open} clicked={props.closed} />

         <div className={attachedClasses.join(' ')} onClick={props.closed}>
            <div className={style.Logo}>
               <Logo />
            </div>

            <nav>
               <NavigationItems isAuthenticated={props.isAuth} />
            </nav>

         </div>

      </Aux>
   )
}

export default SideDrawer