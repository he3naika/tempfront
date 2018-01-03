// @flow
import React, { Component } from 'react';
import Table from '../../table/table';
import './account-info.css';

type Props = {
  api: Function
};

type State = {
  accountName:   string,
  contactName:   string,
  contactNumber: string,
  mobile:        string,
  email:         string
};

export default class AccountInfo extends Component<Props, State>{

  infoHeader: Array<string>

  constructor(props/*: Props*/){
    super(props);
    this.state = {
      accountName: '',
      contactName: '',
      contactNumber: '',
      mobile: '',
      email: ''
    };
    this.infoHeader = [
      'Account Name',
      'Contact Name',
      'Contact Number',
      'Mobile',
      'Email'
    ];
    this.accountInfoRequest();
  }

  accountInfoRequest()/*: void*/{
    this.props.api('/api/accounts/info', 'GET')
      .then((res) => {
        if(res.status === 200){
          res.json().then((response) => {
            this.setAccountInfo(response);
            window.localStorage.setItem('accountInfo', JSON.stringify({
              name: response.name,
              contact: {
                name: response.contact.name,
                number: response.contact.number,
              },
              mobile: response.mobile,
              email: response.email
            }));
          });
        } else if (window.localStorage.getItem('accountInfo')) {
          this.setAccountInfo(JSON.parse(window.localStorage.getItem('accountInfo')));
        }
      })
  }

  setAccountInfo(data/*: Object*/)/*: void*/{
    this.setState({
      accountName: data.name,
      contactName: data.contact.name,
      contactNumber: data.contact.number,
      mobile: data.mobile,
      email: data.email
    });
  }

  getAccountInfo()/*: Array<any>*/{
    return [
      [this.state.accountName],
      [this.state.contactName],
      [this.state.contactNumber],
      [this.state.mobile],
      [this.state.email]
    ]
  }

  render(){
    return(
      <div className='account-info'>
        <div className='account-info__label'>Account information</div>
        <Table
          data={this.getAccountInfo()}
          headers={this.infoHeader}
          vertical={true}
          headerColor='green'
          headerType='dark'
          textColor='black'
        />
      </div>
    )
  }
}
