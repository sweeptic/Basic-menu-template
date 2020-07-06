import React, { Component } from 'react'
import style from './ContactData.module.css';
import Button from './Button';
import Spinner from './Spinner';
import axios from './axios-orders'
import Input from './Input';
import { connect } from 'react-redux';
import withErrorHandler from './withErrorHandler';
import * as actions from './Redux_actions_index';
import { checkValidity } from './utility'

class ContactData extends Component {
   state = {
      orderForm: {
         name: {
            elementType: 'input',
            elementConfig: {
               type: 'text',
               placeholder: 'Your Name'
            },
            value: '',
            validation: {
               required: true
            },
            valid: false,
            touched: false
         },
         street: {
            elementType: 'input',
            elementConfig: {
               type: 'text',
               placeholder: 'Your Street'
            },
            value: '',
            validation: {
               required: true
            },
            valid: false,
            touched: false
         },
         zipCode: {
            elementType: 'input',
            elementConfig: {
               type: 'text',
               placeholder: 'ZIP Code'
            },
            value: '',
            validation: {
               required: true,
               minLength: 5,
               maxLength: 5
            },
            valid: false,
            touched: false
         },
         country: {
            elementType: 'input',
            elementConfig: {
               type: 'text',
               placeholder: 'Country'
            },
            value: '',
            validation: {
               required: true
            },
            valid: false,
            touched: false
         },
         email: {
            elementType: 'input',
            elementConfig: {
               type: 'email',
               placeholder: 'Your E-mail'
            },
            value: '',
            validation: {
               required: true,
               isEmail: true
            },
            valid: false,
            touched: false
         },
         deliveryMethod: {
            elementType: 'select',
            elementConfig: {
               options: [
                  { value: 'fastest', displayValue: 'Fastest' },
                  { value: 'cheapest', displayValue: 'Cheapest' }
               ]
            },
            value: 'fastest',
            validation: {
               required: false
            },
            valid: true
         }
      },
      formIsValid: false
   }

   orderHandler = (event) => {
      event.preventDefault();
      this.setState({ loading: true });
      const formData = {};
      for (let formElementIdentifier in this.state.orderForm) {
         formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
      }
      const order = {
         ingredients: this.props.ings,
         price: this.props.price,
         orderData: formData,
         userId: this.props.userId
      }

      this.props.onOrderBurger(order, this.props.token);
   }


   inputChangedHandler = (event, inputIdentifier) => {
      const updatedOrderForm = {
         ...this.state.orderForm
      };
      const updatedFormElement = {
         ...updatedOrderForm[inputIdentifier]
      };

      updatedFormElement.value = event.target.value;
      updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation)
      updatedFormElement.touched = true;
      updatedOrderForm[inputIdentifier] = updatedFormElement;

      let formIsValid = true;
      for (let inputIdentifier in updatedOrderForm) {
         formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid
      }

      this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid })
   }

   render() {
      const formElementsArray = [];
      for (let key in this.state.orderForm) {
         formElementsArray.push({
            id: key,
            config: this.state.orderForm[key]
         })
      }
      let form = (
         <form onSubmit={this.orderHandler}>
            {formElementsArray.map(item => (
               <Input
                  key={item.id}
                  elementType={item.config.elementType}
                  elementConfig={item.config.elementConfig}
                  value={item.config.value}
                  invalid={!item.config.valid}
                  shouldValidate={item.config.validation}
                  touched={item.config.touched}
                  changed={(event) => this.inputChangedHandler(event, item.id)}
               />
            )
            )}
            <Button btnType="Success" disabled={!this.state.formIsValid} clicked={this.orderHandler}>ORDER</Button>
         </form>
      )

      if (this.props.loading) {
         form = <Spinner />
      }

      return (
         <div className={style.ContactData}>
            <h4>Enter your Contact Data</h4>
            {form}
         </div>
      )
   }
}

const mapStateToProps = state => {
   return {
      ings: state.burgerBuilder.ingredients,
      price: state.burgerBuilder.totalPrice,
      loading: state.order.loading,
      token: state.auth.token,
      userId: state.auth.userId
   }
};

const mapDispatchToProps = dispatch => {
   return {
      onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
