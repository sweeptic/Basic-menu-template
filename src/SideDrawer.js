import style from './SideDrawer.module.css';
import React from 'react'
import Aux from './_Aux';
import Backdrop from './BackDrop';


const SideDrawer = (props) => {
   let attachedClasses = [style.SideDrawer, style.Close];
   if(props.open) {
      attachedClasses =  [style.SideDrawer, style.Open];
   }

   return (
      <Aux>
         <Backdrop show={props.open} clicked={props.closed} />

         <div className={attachedClasses.join(' ')}>


            navcontent

         </div>

      </Aux>
   )
}

export default SideDrawer

