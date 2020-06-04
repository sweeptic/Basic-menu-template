
import React, { Component } from 'react'
import Aux from './_Aux';
import Burger from './Burger';
import axios from './axios-orders';

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


   render() {

      let burger = "";

      if (this.state.ingredients) {
         burger = (
            <Aux>
               <Burger ingredients={this.state.ingredients} />
               {/* <BuildControls /> */}
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