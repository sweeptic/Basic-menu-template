
import React, { Component } from 'react'
import Aux from './_Aux';
import Burger from './Burger';
import BuildControls from './BuildControls';
import Spinner from './Spinner';
import Modal from './Modal';
import OrderSummary from './OrderSummary';
import { connect } from 'react-redux';
import withErrorHandler from './withErrorHandler';
import * as actions from './Redux_actions_index'
import axios from './axios-orders';

class BurgerBuilder extends Component {

   state = {
      purchasing: false,
   }

   componentDidMount() {
      this.props.onInitIngredient();
   }


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
      if (this.props.isAuthenticated) {
         this.setState({ purchasing: true })
      } else {
         this.props.onSetAuthRedirectPath('/checkout');
         this.props.history.push('/auth');
      }
   }

   purchaseCancelHandler = () => {
      this.setState({ purchasing: false })
   }

   purchaseContinueHandler = () => {
      this.props.onInitPurchase();
      this.props.history.push({
         pathname: '/checkout'
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
      let burger = this.props.error ? <p>Ingredients can not be loaded!</p> : <Spinner />

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
                  isAuth={this.props.isAuthenticated}
               />
            </Aux>
         );
         orderSummary = <OrderSummary
            ingredients={this.props.ings}
            price={this.props.price}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler} />
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
      ings: state.burgerBuilder.ingredients,
      price: state.burgerBuilder.totalPrice,
      error: state.burgerBuilder.error,
      isAuthenticated: state.auth.token !== null
   }
}

const mapDispatchToProps = dispatch => {
   return {
      onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
      onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
      onInitIngredient: () => dispatch(actions.initIngredients()),
      onInitPurchase: () => dispatch(actions.purchaseInit()),
      onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));