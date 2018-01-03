import React, { Component } from 'react';
import Button from '../button/button';
import Input from '../input/input';
import './change-password.css';

export default class ChangePassword extends Component{

  constructor(props){
    super(props);
    this.state = {
      password: '',
      password_confirm: '',
      isUpdated: false,
      disabled: false
    }
    this.validationMessages = []
  }

  setPassword(value){
    this.setState({
      password: value
    });
  }

  setPasswordConfirm(value){
    this.setState({
      password_confirm: value
    });
  }

  cleanFields(){
    this.setState({
      password: '',
      password_confirm: ''
    })
  }

  changeDisabled(value)/*: void*/{
    this.setState({
      disabled: value
    })
  }

  changePassword(){
    this.setState({isUpdated: false})
    if(!this.state.disabled){
      this.changeDisabled(true);
      this.validate();
      this.cleanFields();
      if(this.isValid()){
        this.props.isAuthorized
          ? this.changePasswordRequest()
          : this.changeAfterResetRequest();
      } else {
        this.changeDisabled(false);
      }
    }
  }

  changePasswordRequest(){
    this.props.api('/api/accounts/changePassword', 'PUT',
      JSON.stringify({
        password: this.state.password,
        passwordConfirmation: this.state.password_confirm
      })).then((res) => {
        if(res.status === 200){
            this.setState({isUpdated: true})
          }
        this.changeDisabled(false);
      })
  }

  changeAfterResetRequest(){
    this.props.api('/api/changePasswordAfterReset', 'POST',
      JSON.stringify({
        password: this.state.password,
        passwordConfirmation: this.state.password_confirm,
        token: this.getDataFromUrl('token'),
        userId: this.getDataFromUrl('userId')
      })).then((res) => {
        if(res.status === 200){
          this.setState({
            isUpdated: true
          },() => {window.location = '/login?password_changed'})
        }
        this.changeDisabled(false);
      })
  }

  getDataFromUrl(name){
    const path = window.location.search;
    const tokenPos = path.indexOf('&t=');
    const userIdPos = path.indexOf('&i=');
    switch(name){
      case 'token':
        return tokenPos < userIdPos
          ? path.substring(tokenPos + 3, userIdPos)
          : path.substring(tokenPos + 3)
      case 'userId':
        return userIdPos < tokenPos
          ? path.substring(userIdPos + 3, tokenPos)
          : path.substring(userIdPos + 3)
      default:
        return '';
    }
  }

  haveDifferentRegister(){
    let haveUpperCase, haveLowerCase, password;
    password = this.state.password.replace(/[~`!@#$%^&*()+=_\-[\]\\';.,/{}|\\":<>?0-9]/g, '').split('');
    password.forEach((char) => {
      char === char.toUpperCase()
        ? haveUpperCase = true
        : haveLowerCase = true
      });
    if(!haveUpperCase) this.validationMessages.push('Password should contain at least 1 character in uppercase');
    if(!haveLowerCase) this.validationMessages.push('Password should contain at least 1 character in lowercase');
  }

  haveNumbers(){
    let count = 0;
    this.state.password.split('').forEach((char) => {
      if(!isNaN(char)) ++count;
    });
    if(count < 2){
      this.validationMessages.push('Password should contain at least 2 numbers');
    }
  }

  haveSymbols(){
    let password = this.state.password.replace(/[a-zA-Z0-9]/g, '').split('');
    if(password.length < 2){
      this.validationMessages.push('Password should contain at least 2 symbols');
    }
  }

  isEmpty(){
    if(!this.state.password || !this.state.password_confirm){
      this.validationMessages.push('Password can\'t be blank');
    };
  }

  isValidLength(){
    if(this.state.password.length < 8){
      this.validationMessages.push('Password should be a minimum of 8 characters long');
    };
  }

  isEqual(){
    if(this.state.password !== this.state.password_confirm){
      this.validationMessages.push('Passwords are not equal');
    };
  }

  validate(){
    this.validationMessages = [];
    this.isEmpty();
    this.isValidLength();
    this.haveDifferentRegister();
    this.haveNumbers();
    this.haveSymbols();
    this.isEqual();
  }

  isValid(){
    return this.validationMessages.length === 0;
  }

  showBackButton(){
    if(!this.props.isAuthorized){
      return <Button url='/login' label='Go back' color='orange' transparent={true} />
    }
  }

  showErrors(){
    if(!this.isValid()){
      return (
        <ul className='changePassword__errors'>
        {
          this.validationMessages.map((msg, i) => {
            return <li key={i}>{msg}</li>
          })
        }
        </ul>
      )
    }
  }

  showSuccessMsg(){
    if(this.state.isUpdated && this.isValid){
      return <div className='changePassword__msg-success'>Your password has been successfully changed. You can now login with your new password.</div>
    }
  }

  buttonStatus()/*: 'unclickable' | 'disabled' | 'loading' | ''*/{
    return this.state.disabled ? 'loading' : ''
  }

  render(){
    return(
      <div className='changePassword-form'>
        {this.showErrors()}
        {this.showSuccessMsg()}
        <div className='changePassword-form__label'>Enter New Password</div>
        <Input disabled={this.state.disabled} size='l' type='password' value={this.state.password} onChange={value => this.setPassword(value)} />
        <div className='changePassword-form__label'>Retype New Password</div>
        <Input disabled={this.state.disabled} size='l' type='password' value={this.state.password_confirm} onChange={value => this.setPasswordConfirm(value)} />
        <div className='changePassword-form__button'>
          <Button status={this.buttonStatus()} color={this.props.color} size='xxl' label='Continue' onClick={() => this.changePassword()} />
        </div>
        <div className='changePassword-form__links'>
          {this.showBackButton()}
        </div>
      </div>
    );
  };
};
