import React, { Component } from 'react';
import { Switch,Route } from 'react-router-dom';
import NavBar from '../nav-bar/nav-bar';
import AccountInfo from './account-info/account-info';
import BillingAddress from './billing-address/billing-address';
import ChangePassword from '../change-password/change-password';

export default class Info extends Component{

  getStatus(url){
    return window.location.pathname === url ? 'unclickable' : 'inactive';
  }

  getNavData(){
    return [
      {
        label: 'Account Information',
        url: '/info',
        color: this.props.setColor('/info', 'green'),
        status: this.getStatus('/info')
      },
      {
        label: 'Billing Address',
        url: '/info/bill',
        color: this.props.setColor('/info/bill', 'green'),
        status: this.getStatus('/info/bill')
      },
      {
        label: 'Change Password',
        url: '/info/change_password',
        color: this.props.setColor('/info/change_password', 'green'),
        status: this.getStatus('/info/change_password')
      }
    ];
  }

  render(){
    return(
      <div className='info__content'>
        <NavBar navigation={this.getNavData()} />
        <div>
          <Switch>
            <Route exact path='/info' render={() => (<AccountInfo api={this.props.api} />)} />
            <Route exact path='/info/bill' render={() => (<BillingAddress api={this.props.api} />)} />
            <Route exact path='/info/change_password' render={() => (<ChangePassword api={this.props.api} color='green' isAuthorized={this.props.isAuthorized} />)} />
          </Switch>
        </div>
      </div>
    );
  };
};
