
import React, { Component } from 'react'
import Aux from './_Aux';
import Burger from './Burger';
import axios from './axios-orders';
import BuildControls from './BuildControls';

class BurgerBuilder extends Component {


   state = {
      ingredients: null,
      error: false
   }

   componentDidMount() {
      axios.get('https://react-my-burger-3a440.firebaseio.com//ingredients.json')
         .then(response => {
            this.setState({ ingredients: response.data });
         })
         .catch(error => {
            this.setState({ error: true });
         })
   }

   addIngredientHandler = (type) => {
      const oldCount = this.state.ingredients[type];
      const updatedCount = oldCount + 1;
      const updatedIngredients = { ...this.state.ingredients };

      updatedIngredients[type] = updatedCount;
      this.setState({ ingredients: updatedIngredients })
   }

   removeIngredientHandler = (type) => {
      const oldCount = this.state.ingredients[type];
      const updatedCount = oldCount - 1;
      const updatedIngredients = { ...this.state.ingredients };

      updatedIngredients[type] = updatedCount;
      this.setState({ ingredients: updatedIngredients })
   }



   render() {

      let burger = "";

      if (this.state.ingredients) {
         burger = (
            <Aux>
               <Burger ingredients={this.state.ingredients} />
               <BuildControls
                  ingredientAdded={this.addIngredientHandler}
                  ingredientRemoved={this.removeIngredientHandler}
               />
            </Aux>
         )
      }




      return (
         <Aux>
            {burger}
         </Aux>
      )
   }





}


export default BurgerBuilder;