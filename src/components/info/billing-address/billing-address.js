import React, { Component } from 'react';
import Table from '../../table/table';
import Spinner from '../../spinner/spinner';
import './billing-address.css'

const bill_header=[
  'Street Address',
  'Street Address 2',
  'Town/City',
  'County',
  'Postcode'
];

export default class BillingAddress extends Component{

  constructor(props){
    super(props);
    this.state = {
      billings: [],
      loading: true
    }
    this.getBillings();
  }

  getBillings(){
    this.props.api('/api/accounts/billingAddresses', 'GET')
    .then(res => {
      if (res.status === 200){
        res.json().then(res => this.setData(res));
      }
    });
  }

  setData(res){
    let billings = [];
    for(let i = 0; i < res.length; i++){
        billings.push([])
      }
    res.map((billing, i) => {
        billings[i][0] = billing.streetAddresses[0];
        billings[i][1] = billing.streetAddresses[1];
        billings[i][2] = billing.city
        billings[i][3] = billing.county;
        billings[i][4] = billing.postCode;
        return billings;
      })
    this.setState({
      billings: billings,
      loading: false
    })
  }

  showTable(){
    return this.state.loading === true ?
      <div className='spinner__container'><Spinner size='xxl' color='green' /></div> : 
      <Table data={this.state.billings} headers={bill_header} stripped={true} headerColor='green' headerType='dark' textColor='black' />
  }

  render() {
    return(
    <div>
      <div className='table__label'>Billing Addresses</div>
      {this.showTable()}
    </div>
  )}
}
