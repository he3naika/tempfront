// @flow
import React, { Component } from 'react';
import Table from '../../table/table';
import Button from '../../button/button';
import './site-info.css';
import Spinner from '../../spinner/spinner'

type Props = {
  api: Function
};

type State = {
  site: Array<string>,
  loading: boolean
};

export default class SiteInfo extends Component<Props, State>{

  header:Array<string>;

  constructor(props/*:Props*/){
    super(props);
    this.state = {
      site: [],
      loading: true
    }
    this.header = ['Cust Ref No.', 'Premise Address', 'Post Code', 'SPID(s)', 'SIC', 'Sensitive Customer'];
    this.getSite();
  }

  getSite()/*: void*/{
    this.props.api('/api' + window.location.pathname.replace('premises','sites'), 'GET')
    .then(res => {
      if(res.status === 200){
        res.json().then(response => {
          this.setSite(response)
        })
      }
    })
  }

  setSite(site/*: Object*/)/*: void*/{
    site = site[0];
    const newData = [site.customerRefNumber, site.premiseAddress, site.postCode, site.spid, site.sic, site.sensitiveCustomer];
    this.setState({
      site: newData,
      loading: false
    })
  }

  showTable(){
    return this.state.loading ?
      <div className='spinner__container'><Spinner size='l' color='blue' /></div>
      : <div>
          <Table headerType='dark' textColor='black' vertical={true} headerColor='blue' headers={this.header} data={this.state.site} />
          <Button color='blue' label='Back to premises' url='/premises' />
        </div>
  }

  render(){
    return(
      <div>
        <div className='site-info__table-wrapper'>
          <div className='site-info__table-wrapper__header'>Premises Address</div>
          {this.showTable()}
        </div>
      </div>
    );
  };
};
