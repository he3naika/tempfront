// @flow
import React, { Component } from 'react';
import Button from '../button/button';
import Input from '../input/input';
import './login-form.css';

type Props = {
  api: Function
};

type State = {
  email:    string,
  password: string,
  status:   number | '',
  disabled: boolean
};

export default class Login extends Component<Props, State>{

  constructor(props/*: Props*/) {
    super(props);
    this.state = {
      email: '',
      password: '',
      status: '',
      disabled: false
    };
  }

  changeEmail(value/*: string*/)/*: void*/{
    this.setState({
      email: value
    })
  }

  changePassword(value/*: string*/)/*: void*/{
    this.setState({
      password: value
    })
  }

  changeStatus(value/*: number*/, callback/*: void*/)/*: void*/{
    this.setState({
      status: value
    }, callback);
  }

  changeDisabled()/*: void*/{
    this.setState({
      disabled: !this.state.disabled
    })
  }

  clearForm()/*: void*/{
    this.changePassword('');
    this.changeDisabled();
    if(this.state.status === 200){
      this.changeEmail('');
    }
  }

  showErrorMsg()/*: any*/{
    if(this.state.status && (this.state.status === 400 || this.state.status === 401)){
      return <div className='login__form__label_error'>The email address or password is incorrect.<p>Please try again.</p></div>
    } else if(this.state.status && this.state.status === 500){
      return <div className='login__form__label_error'>Please check your internet connection.<p>And try again later.</p></div>
    } else if (window.location.search ==='?password_changed' && !this.state.status) {
      return <div className='login__form__label_error'>You password has been successfully changed.<p>You can now login with new password.</p></div>
    } else if (window.location.search ==='?reset_password' && !this.state.status){
      return <div className='login__form__label_error'>Email has been successfully sent!</div>
    }
  }

  buttonStatus()/*: 'unclickable' | 'disabled' | 'loading' | ''*/{
    return this.state.disabled ? 'loading' : ''
  }

  onClick()/*: void*/{
    let body = JSON.stringify({
      password: this.state.password,
      username: this.state.email
    })
    if(!this.state.disabled){
      this.changeDisabled();
      this.props.api('/api/auth', 'POST', body)
      .then((res) => {this.changeStatus(res.status, this.clearForm())})
      .catch((err) => {});
    }
  }

  render(){
    return(
      <div className='login__form'>
        {this.showErrorMsg()}
        <div className='login__form__label'>Email Address</div>
        <Input size='l' disabled={this.state.disabled} type='email' onChange={e => this.changeEmail(e)} value={this.state.email}/>
        <div className='login__form__label'>Password</div>
        <Input size='l' disabled={this.state.disabled} type='password' onChange={e => this.changePassword(e)} value={this.state.password} />
        <div className='login__form__submit_button'>
          <Button size='xxl' shape='rounded' status={this.buttonStatus()} label='Login' color='orange' onClick={e => this.onClick()} />
        </div>
        <div className='login__form_links'>
          <Button url='/reset_password' transparent={true} label='Forgot your Password?' color='orange' />
        </div>
      </div>
    );
  };
};
