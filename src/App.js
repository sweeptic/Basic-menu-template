import React, { Component } from 'react';
import './App.css';
import Layout from './Layout';
import BurgerBuilder from './BurgerBuilder';
import { Switch, Route } from 'react-router-dom'


class App extends Component {
  
  render() {
    return (
      <div>
        <Layout>
          <Switch>      
            <Route path="/checkout" /*component={Checkout}*//>
            <Route path="/orders" /*component={Orders}*//>
            <Route path="/" exact component={BurgerBuilder}/>
          </Switch>
        </Layout>
      </div>
    )
  }
}

export default App;
