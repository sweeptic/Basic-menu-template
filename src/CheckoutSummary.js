import React from 'react'
import style from './CheckoutSummary.module.css';
import Burger from './Burger';
import Button from './Button';


export const CheckoutSummary = (props) => {
   return (
      <div className={style.CheckoutSummary} >
         <h1>We hope it tastes well!</h1>
         <div style={{ width: '100%', margin: 'auto' }}>
            <Burger ingredients={props.ingredients} />
         </div>
         <Button btnType="Danger" clicked={props.checkoutCancelled}>CANCEL</Button>
         <Button btnType="Success" clicked={props.checkoutContinued}>CONTINUE</Button>
      </div>
   )
}
