import React, { Component } from 'react';
import './App.css';
import Layout from './Layout';
import BurgerBuilder from './BurgerBuilder';
import { Switch, Route, withRouter } from 'react-router-dom'
import CheckOut from './CheckOut';
import Orders from './Orders';
import Auth from './Auth';
import Logout from './Logout';
import { connect } from 'react-redux';
import * as actions from './Redux_actions_index';

class App extends Component {

  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/checkout" component={CheckOut} />
            <Route path="/orders" component={Orders} />
            <Route path="/auth" component={Auth} />
            <Route path="/logout" component={Logout} />
            <Route path="/" exact component={BurgerBuilder} />
          </Switch>
        </Layout>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(null, mapDispatchToProps)(App));
