// @flow
import React, { Component } from 'react';
import Table from '../../table/table';
import Input from '../../input/input';
import './site-list.css';
import Spinner from '../../spinner/spinner';
import { Redirect } from 'react-router-dom';

type Props = {
  sites: Array<string>,
  loading: boolean,
  header: Array<string>
};

type State = {
  isNewSite: boolean,
  site: string,
  search: string
};

export default class SiteList extends Component<Props, State>{

  constructor(props/*: Props*/){
    super(props);
    this.state = {
      site: ''
    }
  }

  changeSite(value/*: string*/)/*: void*/{
    this.setState({
      site: value
    });
  }

  setSite(e/*: any*/)/*: void*/{
    let id = e.currentTarget.cells[3].innerText;
    this.setState({site: id})
  }

  openSite(){
    if(this.state.site){
      return <Redirect to={'/premises/' + this.state.site}/>
    }
  }

  changeSearch(value){
    this.props.changeSearch(value);
  }

  filterData()/*: Array<string>*/{
    let data = this.props.sites;
    let search = this.props.search.toUpperCase();
    if(search){
      data = data.filter((element/*: any*/) => (
        element.join(' ').toUpperCase().includes(search)
      ))
    }
    return data
  }

  showTable(){
    return this.props.loading
    ? <div className='spinner__container'><Spinner size='xxl' color='blue' /></div>
    : <Table textColor='black' headers={this.props.header} data={this.filterData()} stripped={true} headerType='dark' headerColor='blue' onClick={e => this.setSite(e)}/>
  }

  render(){
    return(
      <div className='sites__content'>
        <div className='sites__content__header'>
          {this.openSite()}
          <div>List of Premises</div>
          <Input
            onChange={value => this.changeSearch(value)}
            value={this.props.search}
            type='search'
            placeholder='Search for premise'
            size='m' />
        </div>
        {this.showTable()}
      </div>
    );
  };
}
