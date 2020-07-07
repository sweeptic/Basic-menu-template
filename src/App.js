import React, { Component } from 'react';
import './App.css';
import Layout from './Layout';
import BurgerBuilder from './BurgerBuilder';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom'
import Auth from './Auth';
import Logout from './Logout';
import { connect } from 'react-redux';
import * as actions from './Redux_actions_index';
import asyncComponent from './asyncComponent'


const asyncCheckout = asyncComponent(() => {
  return import('./CheckOut')
})

const asyncOrders = asyncComponent(() => {
  return import('./Orders')
})

const asyncAuth = asyncComponent(() => {
  return import('./Auth')
})


class App extends Component {

  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {

    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/orders" component={asyncOrders} />
          <Route path="/logout" component={Logout} />
          <Route path="/auth" component={asyncAuth} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));