import React, { Component } from 'react';
import Table from '../table/table';
import Button from '../button/button';
import Input from '../input/input';
import Modal from '../modal/modal';
import Spinner from '../spinner/spinner';
import './invoices.css';

const header = [
  'Invoice number',
  'Download'
];

export default class Invoices extends Component{

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      search: '',
      invoices: [],
      loading: true
    };
    this.getInvoices();
  }

  toggleModal = (e) => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  changeSearch(value){
    this.setState({
      search: value
    })
  }

  filterData(){
    let data = this.state.invoices;
    let search = this.state.search.toUpperCase();
    if(search){
      data = data.filter(element => {
        return element[0].includes(search);
      })
    }
    return data;
  }

  getInvoices(){
    let invoices = [];
    this.props.api('/api/invoices', 'GET')
    .then(res => res.json())
    .then(res => {
      invoices = Object.values(res);
      invoices.map((invoice, i) => {
        invoices[i] = [invoice.id];
        return invoices;
      })
      this.addButtons(invoices);
      this.setState({
        invoices: invoices,
        loading: false
      })
    })
  }

  addButtons(data){
    data.map(tr => 
      tr.push(
        <Button onClick={(e) => this.downloadInvoices(e)} size='s' color='' icon='pdf'/>
      )
    )
    return data;
  }

  getInvoiceNumber(e){
    return e.currentTarget.parentNode.parentNode.cells[0].innerText;
  }

  downloadInvoices(e){
    let number = this.getInvoiceNumber(e);
    
    this.props.api('/api/invoices/' + number + '/download', 'GET')
    .then(res => res.blob())
    .then(res => {
      let a = document.createElement('a');
      a.href = URL.createObjectURL(res);
      a.target = '_blank';
      a.download = 'invoice_' + number + '.xlsx';
      document.body.appendChild(a);
      a.click();
    })
  }

  showTable(){
    return this.state.loading === true ?
      <div className='spinner__container'>
        <Spinner size='xxl' color='purple' />
      </div> : 
      <Table textColor='black' className='invoices_table' data={this.filterData()} headers={header} headerColor='purple' headerType='dark' stripped={true} />
  }

  render(){
    return(
      <div>
        <div className='invoices__table__container'>
          <div className='invoices__table__header'>
            <div>View / Download invoice</div>
            <Input size='m' placeholder='Search for invoice' onChange={e => this.changeSearch(e)} type='search' value={this.state.search} />
          </div>
          {this.showTable()}
        </div>
        <Modal show={this.state.isOpen} onClose={this.toggleModal}>
          <div>
            <h3>Invoice</h3>
            <div className='invoice__container' />
          </div>
        </Modal>
      </div>
    );
  };
};
