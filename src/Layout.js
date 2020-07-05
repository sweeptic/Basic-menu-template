import React, { Component } from 'react'
import Aux from './_Aux';
import Toolbar from './Toolbar';
import SideDrawer from './SideDrawer';
import style from './Layout.module.css';
import { connect } from 'react-redux';


class Layout extends Component {
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
            <Toolbar
               isAuth={this.props.isAuthenticated}
               drawerToggleClicked={this.sideDrawerToggleHandler} />
            <SideDrawer
               isAuth={this.props.isAuthenticated}
               open={this.state.showSideDrawer}
               closed={this.sideDrawerClosedHandler} />
            <main className={style.Content}>
               {this.props.children}
            </main>
         </Aux>
      )
   }
}

const mapStateToProps = state => {
   return {
      isAuthenticated: state.auth.token !== null
   }
}


export default connect(mapStateToProps)(Layout);