import React, { Component } from 'react'
import Aux from './_Aux';
import Toolbar from './Toolbar';
import SideDrawer from './SideDrawer';
import style from './Layout.module.css';


export default class Layout extends Component {
   state = {
      showSideDrawer: false
   }

   sideDrawerClosedHandler = () => {
      this.setState({
         showSideDrawer: false
      })
   }

   sideDrawerToggleHandler = () => {
      this.setState((prevState) => {
         return { showSideDrawer: !prevState.showSideDrawer };
      });
   }

   render() {
      return (
         <Aux>
            <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
            <SideDrawer
               open={this.state.showSideDrawer}
               closed={this.sideDrawerClosedHandler} />
            <main className={style.Content}>
                  {this.props.children}
            </main>
         </Aux>
      )
   }
}