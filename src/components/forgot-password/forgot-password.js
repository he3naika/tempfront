import React, { Component } from 'react';
import Button from '../button/button';
import Input from '../input/input';
import './forgot-password.css';

export default class ForgotPassword extends Component{

  constructor(props){
    super(props);
    this.state = {
      email: '',
      status: ''
    };
  }

  setEmail(value){
    this.setState({
      email: value
    })
  }

  showMessage(){
    let message = ''
    switch(this.state.status){
      case 500: message = 'Such email is not exists';
        break;
      case 400: message = 'Invalid email entered';
        break;
      default: return false;
    }
    return (<div className='reset-password_message'>{message}</div>);
  }

  resetPassword(){
    let body = JSON.stringify({
      email: this.state.email,
      url: window.location.origin + '/change_password'
    })

    this.props.api('/api/resetPassword', 'POST', body)
    .then(res => {
      if(res.status === 200){
        window.location = '/login?reset_password'
      }
      this.setState({
        status: res.status
      })
    })
    .catch(err => {
      console.log(err)
    })
    this.setState({
      email: ''
    })

  }

  render(){
    return(
      <div className='forgot_form'>
        {this.showMessage()}
        <div className='forgot_form__label'>Email Address</div>
        <Input type='email' size='l' value={this.state.email} onChange={value => this.setEmail(value)} />
        <div className='forgot_form__verify_button'>
          <Button size='xxl' color='orange' shape='rounded' label='Verify' onClick={() => this.resetPassword()}/>
        </div>
        <div className='forgot_form__links'>
          <Button url='/login' size='s' color='orange' transparent={true} label='Go back' />
        </div>
      </div>
    );
  };
};
