// @flow
import React, { Component } from 'react';
import Table from '../table/table';
import Button from '../button/button';
import Input from '../input/input';
import Modal from '../modal/modal';
import './meters.css';
import Spinner from '../spinner/spinner'

type Props = {
  api: Function
};

type State = {
  isOpen: boolean,
  disabled: boolean,
  isModalConfirmOpen: boolean,
  loading: boolean,
  modalLoading: boolean,
  search: string,
  meterNumber: string,
  meterSpid: string,
  meterReading: string,
  meterDate: string,
  meters: Array<any>,
  modalData: Array<any>
};

export default class Meters extends Component<Props, State>{

  header: Array<string>;
  modalHeader: Array<string>;

  constructor(props/*:Props*/) {
    super(props)
    this.state = {
      isOpen: false,
      disabled: false,
      isModalConfirmOpen: false,
      loading: true,
      modalLoading: true,
      meterNumber: '',
      meterSpid: '',
      meterReading: '',
      meterDate: '',
      search:'',
      meters: [],
      modalData: []
    };
    this.header = ['SPID','Address','Meter Serial Number','Meter Manufacturer','View','Add'];
    this.modalHeader =  ['Date','Reading'];
    this.getMeters();
  }

  setMeters(meters/*: Array<any>*/)/*: void*/{
    let view, addForm, add, spid, number, address, manufactured;
    view = <span className='icon_eye'>
      <Button
        size='s'
        color=''
        icon='show'
        onClick={e => this.toggleModal(e)} />
    </span>
    addForm = <span className='meter__add' onClick={e => this.addClass(e)} >add</span>
    const newData = meters.map(meter => {
      add = meter.isAutomatic ? 'AMR' : addForm;
      spid = meter.spid ? meter.spid : '';
      number = meter.meterSerialNumber ? meter.meterSerialNumber : '';
      address = meter.address ? meter.address : '';
      manufactured = meter.meterManufacturer ? meter.meterManufacturer : '';
      return [spid, address, number, manufactured, view, add]
    })
    this.setState({
      meters: newData,
      loading: false
    })
  }

  checkMeterDate(){
    let pattern =/^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
    let isDateCorrect = pattern.test(this.state.meterDate);
    if(!this.state.meterReading){
      alert('Enter the meter reading')
    } else if (!isDateCorrect){
      alert('Invalid meter reading date')
    }
    return this.state.meterReading && isDateCorrect ? true : false;
  }

  sendMeterReading(e/*: any*/)/*: void*/{
    if(this.checkMeterDate() && !this.state.disabled){
      this.changeDisabled();
      let body = JSON.stringify({
        spid: this.state.meterSpid,
        value: this.state.meterReading,
        date: this.state.meterDate
      })
      this.props.api('/api/meters/' + this.state.meterNumber + '/meterReadings', 'POST', body)
      .then(res => {
        if(res.status === 200){
          this.removeClass();
          this.setState({
            meterReading: '',
            meterDate: '',
            disabled: false,
            isModalConfirmOpen: true
          })
        } else if (res.status === 400) {
          alert('Invalid meter reading date')
          this.setState({
            disabled: false
          })
        } else {
          this.setState({
            disabled: false
          })
        }
      })
    }
  }

  getMeters()/*: void*/{
    this.props.api('/api/meters', 'GET')
    .then(res => {
      if(res.status === 200){
        res.json().then(response => {
          this.setMeters(response)
        })
      }
    })
  }

  getModalData(number/*: string*/)/*: void*/{
    this.props.api('/api/meters/' + number + '/meterReadings', 'GET')
    .then(res => {
      if(res.status === 200){
        res.json().then(response => {
          this.setModalData(response)
        })
      }
    })
  }

  setModalData(response/*: Array<any>*/)/*: void*/{
    const readings = response.map(reading => {
      return [reading.date, reading.value]
    })
    this.setState({
      modalData: readings,
      modalLoading: false
    })
  }

  toggleModal(e/*: any*/)/*: void*/{
    this.removeClass();
    this.setState({
      isOpen: !this.state.isOpen
    });
    if(!this.state.isOpen){
      let number = e.currentTarget.parentNode.parentNode.parentNode.cells[2].innerText
      this.getModalData(number);
      this.setState({
        meterNumber: number
      })
    } else {
      this.setState({
        meterNumber: '',
        modalData: [],
        modalLoading: true
      })
    }
  }

  closeModalConfirm()/*: void*/{
    this.setState({
      isModalConfirmOpen: false
    });
  }

  addClass(e/*: any*/)/*: void*/{
    e.stopPropagation();
    this.removeClass();
    let number, data, addForm;
    let meterSpid = '';
    number = e.currentTarget.parentNode.parentNode.childNodes[2].innerText;
    data = this.state.meters;
    addForm = <span className='meter__reading-form'>
      <span className='meter__reading-form_cancel' onClick={e => this.removeClass()}>Cancel</span>
      <span className='meter__reading-add'>
        <span className='meter__reading_inputs'>
          <Input
            placeholder='Enter meter reading'
            size='s'
            value={this.state.meterReading}
            onChange={e => this.changeMeterReading(e)}
            type='text'
            validation='meterReading' />
          <Input
            placeholder='Enter date dd/mm/yyyy'
            size='s'
            value={this.state.meterDate}
            onChange={e => this.changeMeterDate(e)}
            type='text'
            validation='meterDate' />
          </span>
        <span className='meter__submit_button'>
          <Button
            onClick={e => this.sendMeterReading(e)}
            label='Submit'
            color='orange'
            shape='rounded'
          />
        </span>
      </span>
    </span>
    data = data.map(meter => {
      if(meter[2] === number){
        meter.splice(5, 1, addForm);
        meterSpid = meter[0]
      }
      return meter
    })
    this.setState({
      meterNumber: number,
      meters: data,
      meterSpid: meterSpid
    })
  }

  removeClass()/*: void*/{
    if(this.state.meterNumber){
      let data, add;
      data = this.state.meters;
      add = <span className='meter__add' onClick={e => this.addClass(e)} >add</span>
      data = data.map(meter => {
        if(meter[2] === this.state.meterNumber){
          meter.splice(5, 1, add)
        }
        return meter
      })
      this.setState({
        meterNumber: '',
        meters: data,
        meterSpid: ''
      })
    }
  }

  changeSearch(value/*: string*/)/*: void*/{
    this.setState({
      search: value
    })
  }

  changeDisabled()/*: void*/{
    this.setState({
      disabled: !this.state.disabled
    })
  }

  changeMeterReading(value/*: number*/)/*: void*/{
    this.setState({
      meterReading: value
    })
  }

  changeMeterDate(value/*: number*/)/*: void*/{
    this.setState({
      meterDate: value
    })
  }

  filterMeters()/*: Array<any>*/{
    let data = this.state.meters;
    let search = this.state.search.toUpperCase();
    if(search){
      data = data.filter(element => (
        element[0].toUpperCase().includes(search)
        || element[1].toUpperCase().includes(search)
        || element[2].toUpperCase().includes(search)
        || element[3].toUpperCase().includes(search)
      ))
    }

    return data
  }

  showTable(){
    return this.state.loading ?
      <div className='spinner__container'><Spinner size='xxl' color='orange' /></div>
      : <Table
          textColor='black'
          data={this.filterMeters()}
          headers={this.header}
          headerColor='orange'
          headerType='dark'
          stripped={true} />
  }

  showModalTable(){
    return this.state.modalLoading ?
      <div className='meters__modal__spinner'><Spinner size='l' color='orange' /></div> 
      : <Table
          textColor='black'
          data={this.state.modalData}
          headers={this.modalHeader}
          headerColor='orange'
          headerType='dark'
          stripped={true} />
  }

  render(){
    return(
      <div>
        <div className='meters__table__container'>
          <div className='meters__table__header'>
            <div>Submit Meter Read</div>
            <Input
              size='m'
              type='search'
              placeholder='Search for meter'
              value={this.state.search}
              onChange={e => this.changeSearch(e)} />
          </div>
          {this.showTable()}
        </div>
        <Modal
          show={this.state.isOpen}
          scrollable={true}
          onClose={e => this.toggleModal(e)}>
          <div>
            <h3>Data for Meter Number {this.state.meterNumber}</h3>
            {this.showModalTable()}
          </div>
        </Modal>
        <Modal
          show={this.state.isModalConfirmOpen}
          scrollable={false}
          onClose={e => this.closeModalConfirm()}>
          <div className="meters__modal_confirmation">
            <p>Thank you for submitting your meter read.</p>
            You will recieve a confirmation email shortly
          </div>
        </Modal>
      </div>
    );
  };
};
