import React from 'react'
import BurgerIngredient from './BurgerIngredient';
import style from './Burger.module.css';



const Burger = (props) => {

   let transformedIngredients = Object.keys(props.ingredients)
      .map(igKey => {
         return [...Array(props.ingredients[igKey])].map((_, i) => {
            return <BurgerIngredient key={igKey + i} type={igKey} />
         })
      })
      .reduce((arr, el) => {
         return arr.concat(el)
      }, []);




   return (
      <div className={style.Burger}>
         <BurgerIngredient type="bread-top" />
         {transformedIngredients}
         <BurgerIngredient type="bread-bottom" />
      </div>
   )

}


export default Burger;
