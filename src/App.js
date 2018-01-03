import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import NavBar from './components/nav-bar/nav-bar';
import Info from './components/info/info';
import Sites from './components/sites/sites';
import Meters from './components/meters/meters';
import Dashboard from './components/dashboard/dashboard';
import Invoices from './components/invoices/invoices';
import Layout from './components/layout/layout';
import Login from './components/login-form/login-form';
import Button from './components/button/button';
import Toaster from './components/toaster/toaster';
import ForgotPassword from './components/forgot-password/forgot-password';
import ChangePassword from './components/change-password/change-password';
import './App.css';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      user: this.getCookie('user'),
      showToaster: false,
      accountName: this.getCookie('accountName')
    }
    this.interval = null;
  }

  apiBody(method, body){
    if(method !== 'GET'){
      return body
    }
  }

  api(url, method = 'GET', body = {}){
    return fetch(url, {
      method,
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.getCookie('token'),
      }, body: (this.apiBody(method, body))
    }).then(res => {
      this.setState({
          showToaster: false
        },() => {
          if(res.status !== 200 && res.status !== 400 && res.status !== 401){
            this.setState({
              showToaster: true
            }, this.toasterInterval())
          }
          if(res.status === 401 && this.isAuthorized()){
            this.logout();
          }
        }
      )
      if(url === '/api/auth' && res.status === 200){
        res.json().then((response) => {
          document.cookie = `accountName=${response.name}`;
          document.cookie = `user=${response.contact.name}`;
          document.cookie = `token=${response.token}`;
          window.location.replace('/');
        })
      } else if (url === '/api/changePasswordAfterReset' && res.status === 400){
        this.setState({
          showToaster: true
        }, this.toasterInterval())
      }
      return res;
    });
  }

  getNavData(){
    return [
      {label: 'My Information', url: '/info', color: this.setColor('/info', 'green')},
      {label: 'My Premises', url: '/premises', color: this.setColor('/premises', 'blue')},
      {label: 'My Meters', url: '/meters', color: this.setColor('/meters', 'orange')},
      {label: 'My Invoices', url: '/invoices', color: this.setColor('/invoices', 'purple')}
    ]
  }

  toasterInterval(){
    this.interval = setTimeout(() => {
      this.setState({
        showToaster: false
      })
    }, 4000);
  }

  showToaster(){
    if(this.state.showToaster) {
      return <Toaster onmouseover={clearTimeout(this.interval)}/>
    }
    clearTimeout(this.interval)
  }

  getCookie(key){
    let cookies = document.cookie;
    let result = '';
    if(cookies){
      cookies.split('; ').map(cookie => {
        if(cookie.split('=')[0] === key){
          result = cookie.split('=')[1];
        }
        return result;
      })
    }
    return result;
  }

  setColor(url, color){
    if(window.location.pathname.startsWith(url)){
      return color;
    } else {
      return 'white';
    }
  }

  setPage(){
    const path = window.location.pathname;
    let page = 'default';
    if(this.isAuthorized()){
      if(path.includes('/info')) {
        page = 'info';
      } else if(path.includes('/premises')) {
        page = 'premises';
      } else if(path.includes('/meters')){
        page = 'meters';
      } else if(path.includes('/invoices')) {
        page = 'invoices';
      } else if(path.includes('/login')) {
        window.location.replace('/');
      } 
      else if(!path.includes('/login') && path !== '/') {
        window.location.replace('/');
      }

      return page;
    } else {
      if(path.includes('/login')) {
        return 'login';
      } else if(path.includes('/change_password')) {
        return 'changePassword';
      } else if(path.includes('/reset_password')) {
        return 'resetPassword';
      } else {
        window.location.replace('/login');
      }
    }
  }

  showLayout(){
    return this.setPage() !== 'default';
  }

  isAuthorized(){
    return (this.state.user && this.getCookie('token')) ? true : false
  }

  logout(){
    document.cookie.split(";").forEach((c) => { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
    window.location.replace('/login');
  }

  render() {
    return (
      <div className='app__container'>
        {this.showToaster()}
        <div className='status-bar__container'>
          {this.isAuthorized() && <div className='status-bar__link'>You are currently logged in as&nbsp;<b>{this.state.user} <Button label='LOGOUT' color='blue' onClick={e => this.logout()} /></b><Button onClick={e => this.logout()} color='blue' size='s' icon='logout' /></div>}
        </div>
        <div className='menu__wrapper'>
          <div className='menu__container'>
            <a href='/'><div className='menu__logo'></div></a>
            <div className='menu'>
              {this.isAuthorized() && <NavBar navigation={this.getNavData()} size='m' />}
            </div>
          </div>
        </div>
        <Route exact path='/' component={Dashboard} />
        {
          this.showLayout() && <Layout accountName={this.state.accountName} page={this.setPage()}>
            <Route path='/login' render={() => (<Login api={(url, method, body) => this.api(url, method, body)} />)} />
            <Route exact path='/change_password' render={() => (<ChangePassword api={(url, method, body) => this.api(url, method, body)} isAuthorized={this.isAuthorized()} color='orange' />)} />
            <Route exact path='/reset_password' render={() => (<ForgotPassword api={(url, method, body) => this.api(url, method, body)} />)} />
            <Route path='/info' render={() => (<Info api={(url, method, body) => this.api(url, method, body)} setColor={(url, color) => this.setColor(url, color)} isAuthorized={this.isAuthorized()} />)} />
            <Route path='/premises' render={() => (<Sites api={(url, method, body) => this.api(url, method, body)} />)} />
            <Route exact path='/meters' render={() => (<Meters api={(url, method, body) => this.api(url, method, body)} />)} />
            <Route exact path='/invoices' render={() => (<Invoices api={(url, method, body) => this.api(url, method, body)} />)} />
          </Layout>
        }
      </div>
    );
  }
}

export default App;
