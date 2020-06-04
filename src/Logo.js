import React from 'react';
import burgerLogo from "../src/assets/burger-logo.png";
import style from "../src/Logo.module.css"

const Logo = (props) => {
   return (
      <div className={style.Logo} /*style={{ height: props.height }}*/ >
         <img src={burgerLogo} alt="MyBurger" />
      </div>
   )
}

export default Logo