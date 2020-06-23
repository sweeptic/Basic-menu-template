
import React, { Component } from 'react'
import Aux from './_Aux';
import Burger from './Burger';
import axios from './axios-orders';
import BuildControls from './BuildControls';
import Spinner from './Spinner';
import Modal from './Modal';
import OrderSummary from './OrderSummary';
import { connect } from 'react-redux';
import withErrorHandler from './withErrorHandler';
import * as actionTypes from './actions'

// const INGREDIENT_PRICES = {
//    salad: 0.5,
//    cheese: 0.4,
//    meat: 1.3,
//    bacon: 0.7
// }


class BurgerBuilder extends Component {

   state = {
      // ingredients: null,
      error: false,
      // purchasable: false,
      // totalPrice: 4,
      purchasing: false,
      loading: false
   }

   componentDidMount() {
      // axios.get('https://react-my-burger-3a440.firebaseio.com//ingredients.json')
      //    .then(response => {
      //       this.setState({ ingredients: response.data });
      //    })
      //    .catch(error => {
      //       this.setState({ error: true });
      //    })
   }

   // addIngredientHandler = (type) => {
   //    const oldCount = this.state.ingredients[type];
   //    const updatedCount = oldCount + 1;
   //    const updatedIngredients = { ...this.state.ingredients };
   //    const oldPrice = this.state.totalPrice;
   //    const priceAddition = INGREDIENT_PRICES[type];
   //    const newPrice = oldPrice + priceAddition;

   //    updatedIngredients[type] = updatedCount;
   //    this.setState({ ingredients: updatedIngredients, totalPrice: newPrice })
   //    this.updatePurchaseState(updatedIngredients);
   // }

   // removeIngredientHandler = (type) => {
   //    const oldCount = this.state.ingredients[type];
   //    const updatedCount = oldCount - 1;
   //    const updatedIngredients = { ...this.state.ingredients };
   //    const oldPrice = this.state.totalPrice;
   //    const priceDeduction = INGREDIENT_PRICES[type];
   //    const newPrice = oldPrice - priceDeduction;

   //    updatedIngredients[type] = updatedCount;
   //    this.setState({ ingredients: updatedIngredients, totalPrice: newPrice })
   //    this.updatePurchaseState(updatedIngredients);
   // }


   updatePurchaseState(ingredients) {
      const sum = Object.keys(ingredients)
         .map(igKey => {
            return ingredients[igKey];
         })
         .reduce((sum, el) => {
            return sum + el;
         }, 0);
      return sum > 0;
   }

   purchaseHandler = () => {
      this.setState({ purchasing: true })
   }

   purchaseCancelHandler = () => {
      this.setState({ purchasing: false })
   }

   purchaseContinueHandler = () => {
      // const queryParams = [];
      // for (let i in this.state.ingredients) {
      //    queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
      // }
      // queryParams.push('price=' + this.state.totalPrice);
      // const queryString = queryParams.join('&');
      this.props.history.push({
         pathname: '/checkout'
         // ,search: '?' + queryString
      })
   }


   render() {
      const disabledInfo = {
         ...this.props.ings
      }
      for (let key in disabledInfo) {
         disabledInfo[key] = disabledInfo[key] <= 0;
      }

      let orderSummary = null;
      let burger = this.state.error ? <p>Ingredients can not be loaded!</p> : <Spinner />

      if (this.props.ings) {
         burger = (
            <Aux>
               <Burger ingredients={this.props.ings} />
               <BuildControls
                  ingredientAdded={this.props.onIngredientAdded}
                  ingredientRemoved={this.props.onIngredientRemoved}
                  disabled={disabledInfo}
                  purchasable={this.updatePurchaseState(this.props.ings)}
                  price={this.props.price}
                  ordered={this.purchaseHandler}  
               />
            </Aux>
         );
         orderSummary = <OrderSummary
            ingredients={this.props.ings}
            price={this.props.price}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler} />
      }

      if (this.state.loading) {
         orderSummary = <Spinner />
      }

      return (
         <Aux>
            <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
               {orderSummary}
            </Modal>
            {burger}
         </Aux>
      )
   }
}


const mapStateToProps = state => {
   return {
      ings: state.ingredients,
      price: state.totalPrice
   }
}

const mapDispatchToProps = dispatch => {
   return {
      onIngredientAdded: (ingName) => dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingName }),
      onIngredientRemoved: (ingName) => dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName })
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));