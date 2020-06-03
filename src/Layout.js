import React, { Component } from 'react'
import Aux from './_Aux';
import Toolbar from './Toolbar';
import SideDrawer from './SideDrawer';


export default class Layout extends Component {
   state = {
      showSideDrawer: false
   }

   sideDrawerClosedHandler = () => {
      // console.log('closed');
      this.setState({
         showSideDrawer: false
      })
   }

   sideDrawerToggleHandler = () => {
      this.setState((prevState) => {
         // console.log('open')
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

         </Aux>
      )
   }
}


