import React, { Component } from 'react';
import Button from '../button/button';
import NavBar from '../nav-bar/nav-bar';
import './layout.css';

const settings = {
  info:
  {
    name: 'info',
    color: 'green',
    icon: 'info',
    label: 'My Information',
    description: 'View your account information'
  },
  premises:
  {
    name: 'premises',
    color: 'blue',
    icon: 'premises',
    label: 'My Premises',
    description: 'View your premises details'
  },
  meters:
  {
    name: 'meters',
    color: 'orange',
    icon: 'meters',
    label: 'My Meters',
    description: 'View and submit your meter readings'
  },
  invoices:
  {
    name: 'invoices',
    color: 'purple',
    icon: 'invoices',
    label: 'My Invoices',
    description: 'View your previous and outstanding bills'
  },
  login:
  {
    name: 'login',
    color: 'orange',
    icon:'login',
    label: 'Sign in to your Account',
    description: 'Please login to your Castle Water account'
  },
  resetPassword:
  {
    name: 'resetPassword',
    color: 'orange',
    icon: 'login',
    label: 'Forgotten Password',
    description: 'Please enter your registered email address. When you receive the verification email, simply click the link provided to reset your password'
  },
  changePassword:
  {
    name: 'changePassword',
    color: 'orange',
    icon: 'login',
    label: 'Change Password',
    description: 'Please create a new password. This should be a minimum of 8 characters long and include the following: both upper and lower case lettering, no fewer than 2 numbers and have at least 2 symbols (for example: @£!)'
  },
  default:{}
};

export default class Layout extends Component{

  calcClass(name){
    return name + ' ' + name + '_theme_' + settings[this.props.page].name;
  }

  isCurrentPage(url){
    return window.location.pathname.startsWith(url);
  }

  getNavData(){
    return [
      {color: 'green', icon: 'info', url: '/info', label: 'My Info', inverse: this.isCurrentPage('/info')},
      {color: 'blue', icon: 'premises', url: '/premises', label: 'My Premises', inverse: this.isCurrentPage('/premises')},
      {color: 'orange', icon: 'meters', url: '/meters', label: 'My Meters', inverse: this.isCurrentPage('/meters')},
      {color: 'purple', icon: 'invoices', url: '/invoices', label: 'My Invoices', inverse: this.isCurrentPage('/invoices')},
      {color: 'red', icon: 'faq', url: 'https://www.castlewater.co.uk/faq/', label: 'FAQs'},
      {color: 'grey', icon: 'movingPremises', url: 'https://www.castlewater.co.uk/moving-in-moving-out/', label: 'Moving Premises'}
    ];
  }

  showAccountName(){
    let array = ['info','premises','meters','invoices']
    if(array.includes(this.props.page)){
      return <div className='layout__account-name'>{this.props.accountName}</div>;
    }
  }

  render(){
    const page = settings[this.props.page];
    return(
      <div className='layout__container'>
        <div className={this.calcClass('layout__sidebar')}>
          <div className='layout__sidebar__header'>{page.label}</div>
          <div className='layout__sidebar__description'>{page.description}</div>
          <Button size='xxl' shape='circle' icon={page.icon} color='grey' status='unclickable' />
        </div>
        <div className={this.calcClass('layout__content')}>
          {this.showAccountName()}
          {this.props.children}
          <div className='layout__navbar'>
            <NavBar navigation={this.getNavData()} shape='circle' size='m' labeled={true}/>
          </div>
        </div>
      </div>
    );
  };
};
