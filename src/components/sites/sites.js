// @flow
import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import SiteList from './site-list/site-list';
import SiteInfo from './site-info/site-info';

type Props = {
  api: Function
};

type State = {
  sites: Array<any>,
  loading: boolean
};

export default class Sites extends Component<Props, State>{

  header: Array<string>;

  constructor(props/*:Props*/){
    super(props);
    this.state = {
      sites: [],
      loading: true,
      search: ''
    }
    this.header = ['Cust Ref No.', 'Premise Address', 'Post Code', 'SPID(s)', 'SIC', 'Sensitive Customer'];
    this.getSites();
  }

  changeSearch(value){
    this.setState({
      search: value
    })
  }

  getSites()/*: void*/{
    this.props.api('/api/sites', 'GET')
    .then(res => {
      if(res.status === 200){
        res.json().then(response => {
          this.setSites(response)
        })
      }
    })
  }

  setSites(sites/*: Array<Object>*/)/*: void*/{
    const newData = sites.map(site => {
      return [site.customerRefNumber, site.premiseAddress, site.postCode, site.spid, site.sic, site.sensitiveCustomer];
    })
    this.setState({
      sites: newData,
      loading: false
    })
  }

  render(){
    return(
      <div>
        <Switch>
          <Route exact path='/premises'>
            <SiteList sites={this.state.sites} loading={this.state.loading} header={this.header} changeSearch={value => this.changeSearch(value)} search={this.state.search} />
          </Route>
          <Route path='/premises/:id'>
            <SiteInfo api={this.props.api} />
          </Route>
        </Switch>
      </div>
    );
  };
};
