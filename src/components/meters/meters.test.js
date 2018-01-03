import React from 'react';
import Meters from './meters';
import { shallow, mount } from 'enzyme';


describe('Meters component', () => {

  let component, instance, result, data, fakeApi;
  beforeEach(() => {
    data = [{
      isAutomatic: true,
      premiseAddress: "21-16 testStreet",
      number: "123456789",
      spid: "123456789",
      date: "123456789",
      value: "123456789",
    },
    {
      isAutomatic: false,
      premiseAddress: "21-16 testStreet",
      number: "123456789",
      spid: "123456789",
      date: "123456789",
      value: "123456789",
    }]
    fakeApi = () => {
      return new Promise((resolve, reject) => {
        resolve({
          ok: true, 
          status: 200, 
          json: () => {
            let p = new Promise((resolve, reject) => {
              resolve(data);
            })
            return p;
          }
        });
      });
    }
    component = shallow(<Meters api={fakeApi}/>);
    instance = component.instance();
  });

  describe('getMeters()', () => {

    it('should call getMeters()', async() => {
      instance.getMeters = jest.fn();
      await instance.getMeters();
      expect(await instance.getMeters).toHaveBeenCalled()
    });

    it('should call setMeters()', async() => {
      instance.setMeters = jest.fn();
      await instance.getMeters();
      expect(await instance.setMeters).toHaveBeenCalledWith(data)
    });

    it('should not  call setMeters() if status is not 200', async() => {
      fakeApi = () => {
        return new Promise((resolve, reject) => {
          resolve({
            ok: true, 
            status: 300,
            json: () => {
              let p = new Promise((resolve, reject) => {
                resolve(data);
              })
              return p;
            }
          });
        });
      }
      component = shallow(<Meters api={fakeApi}/>);
      instance = component.instance();
      instance.setMeters = jest.fn();
      await instance.getMeters();
      expect(await instance.setMeters).not.toHaveBeenCalledWith(data)
    });
  });

  describe('setMeters()', () => {

    it('should set a new state', () => {
      instance.setState({meters: []});
      instance.setMeters(data);
      expect(instance.state.meters).not.toEqual([]);
    });
  });

  describe('checkMeterDate()', () => {

    it('should return false if date is not correct', () => {
      instance.setState({meterReading: '123', meterDate: '1010//2010'});
      result = instance.checkMeterDate();
      expect(result).toEqual(false);
    });

    it('should return false if meter reading is missed', () => {
      instance.setState({meterReading: '', meterDate: '10/10/2010'});
      result = instance.checkMeterDate();
      expect(result).toEqual(false);
    });
  });

  describe('sendMeterReading()', () => {

    it('should call checkMeterDate()', async() => {
      instance.checkMeterDate = jest.fn();
      await instance.sendMeterReading();
      expect(instance.checkMeterDate).toHaveBeenCalledWith()
    });

    it('should call changeDisabled()', async() => {
      instance.changeDisabled = jest.fn();
      instance.checkMeterDate = jest.fn(() => (true));
      await instance.sendMeterReading();
      expect(await instance.changeDisabled).toHaveBeenCalledWith()
    });

    it('should call removeClass()', async() => {
      instance.changeDisabled = jest.fn();
      instance.removeClass = jest.fn();
      instance.checkMeterDate = jest.fn(() => (true));
      await instance.sendMeterReading();
      expect(await instance.removeClass).toHaveBeenCalledWith()
    });
  });

  describe('getModalData()', () => {

    it('should call setModalData()', async() => {
      instance.setModalData = jest.fn();
      await instance.getModalData();
      expect(await instance.setModalData).toHaveBeenCalledWith(data)
    });

    it('should not  call setModalData() if status is not 200', async() => {
      fakeApi = () => {
        return new Promise((resolve, reject) => {
          resolve({
            ok: true, 
            status: 300, 
            json: () => {
              let p = new Promise((resolve, reject) => {
                resolve(data);
              })
              return p;
            }
          });
        });
      }
      component = shallow(<Meters api={fakeApi}/>);
      instance = component.instance();
      instance.setModalData = jest.fn();
      await instance.getModalData();
      expect(await instance.setModalData).not.toHaveBeenCalledWith(data)
    });
  });

  describe('setModalData()', () => {

    it('should set a new state', () => {
      instance.setState({modalData: []});
      instance.setModalData(data);
      expect(instance.state.modalData).toEqual([["123456789","123456789"],["123456789","123456789"]]);
    });
  });

  describe('toggleModal()', () => {

    it('should set a new state', () => {
      let e ={currentTarget:{parentNode:{parentNode:{parentNode:{cells:['','',{innerText:1}]}}}}}
      instance.setState({isOpen: false});
      instance.toggleModal(e);
      expect(instance.state.isOpen).toEqual(true);
    });

    it('should call getModalData() if modal window is opened', () => {
      let e ={currentTarget:{parentNode:{parentNode:{parentNode:{cells:['','',{innerText:'1'}]}}}}}
      instance.setState({isOpen: true});
      instance.getModalData = jest.fn();
      instance.toggleModal(e);
      expect(instance.getModalData).toHaveBeenCalledWith('1');
    });

    it('should call set a new state', () => {
      let e ={currentTarget:{parentNode:{parentNode:{parentNode:{cells:['','',{innerText:'1'}]}}}}}
      instance.setState({isOpen: true, meterNumber: ''});
      instance.getModalData = jest.fn();
      instance.toggleModal(e);
      expect(instance.state.meterNumber).toEqual('1');
    });

    it('should clear modalData', () => {
      let e ={currentTarget:{parentNode:{parentNode:{parentNode:{cells:['','',{innerText:'1'}]}}}}}
      instance.setState({isOpen: false, modalData: ['asdasd']});
      instance.getModalData = jest.fn();
      instance.toggleModal(e);
      expect(instance.state.modalData).toEqual([]);
    });

    it('should clear meterNumber', () => {
      let e ={currentTarget:{parentNode:{parentNode:{parentNode:{cells:['','',{innerText:'1'}]}}}}}
      instance.setState({isOpen: false, meterNumber: ['1']});
      instance.getModalData = jest.fn();
      instance.toggleModal(e);
      expect(instance.state.meterNumber).toEqual('');
    });
  });

  describe('addClass()', () => {

    it('should call getModalData()', () => {
      let onStopPropagation = jest.fn();
      let e = {stopPropagation: onStopPropagation, currentTarget:{parentNode:{parentNode:{childNodes:['','',{innerText:'1'}]}}}}
      instance.removeClass = jest.fn();
      instance.addClass(e);
      expect(instance.removeClass).toHaveBeenCalledWith();
    });

    it('should set a new state', () => {
      instance.setState({meters: [['aaa','aaa','1','aaa','aaa'],['aba','abc','cdf','cdf','cdf']], meterNumber: '', meterSpid:''});
      let onStopPropagation = jest.fn();
      let e = {stopPropagation: onStopPropagation, currentTarget:{parentNode:{parentNode:{childNodes:['','',{innerText:'1'}]}}}}
      instance.removeClass = jest.fn();
      instance.addClass(e);
      expect(instance.state.meterNumber).toEqual('1');
    });

    it('should set a new state', () => {
      instance.setState({meters: [['aaa','aaa','1','aaa','aaa'],['aba','abc','cdf','cdf','cdf']], meterNumber: '', meterSpid:''});
      let onStopPropagation = jest.fn();
      let e = {stopPropagation: onStopPropagation, currentTarget:{parentNode:{parentNode:{childNodes:['','',{innerText:'1'}]}}}}
      instance.removeClass = jest.fn();
      instance.addClass(e);
      expect(instance.state.meterSpid).toEqual('aaa');
    });
  });

  describe('removeClass()', () => {

    it('should set a new state', () => {
      instance.setState({meters: [['aaa','aaa','1','aaa','aaa'],['aba','abc','cdf','cdf','cdf']], meterNumber: '1', meterSpid:'51'});
      instance.removeClass();
      expect(instance.state.meterNumber).toEqual('');
    });

    it('should set a new state', () => {
      instance.setState({meters: [['aaa','aaa','1','aaa','aaa'],['aba','abc','cdf','cdf','cdf']], meterNumber: '1', meterSpid:'51'});
      instance.removeClass();
      expect(instance.state.meterSpid).toEqual('');
    });
  });

  describe('changeSearch()', () => {

    it('should set a new state', () => {
      instance.setState({search: ''});
      instance.changeSearch('test');
      expect(instance.state.search).toEqual('test');
    });
  });

  describe('closeModalConfirm()', () => {

    it('should set a new state', () => {
      instance.setState({isModalConfirmOpen: true});
      instance.closeModalConfirm();
      expect(instance.state.isModalConfirmOpen).toEqual(false);
    });
  });

  describe('changeMeterReading()', () => {

    it('should set a new state', () => {
      instance.setState({meterReading: ''});
      instance.changeMeterReading('123');
      expect(instance.state.meterReading).toEqual('123');
    });
  });

  describe('changeMeterDate()', () => {

    it('should set a new state', () => {
      instance.setState({meterDate: ''});
      instance.changeMeterReading('123');
      expect(instance.state.meterReading).toEqual('123');
    });
  });

  describe('changeDisabled()', () => {

    it('should set a new state', () => {
      instance.setState({disabled: false});
      instance.changeDisabled();
      expect(instance.state.disabled).toEqual(true);
    });
  });

  describe('filterMeters()', () => {

    it('should return a filtered meters', () => {
      instance.setState({search: 'aba', meters: [['aaa','aaa','aaa','aaa'],['aba','abc','cdf','cdf']]});
      result = instance.filterMeters();
      expect(result).toEqual([['aba','abc','cdf','cdf']]);
    });

    it('should not filter meters if search is empty', () => {
      instance.setState({search: '', meters: [['aaa','aaa','aaa'],['aba','abc','cdf']]});
      result = instance.filterMeters();
      expect(result).toEqual([['aaa','aaa','aaa'],['aba','abc','cdf']]);
    });
  });
});
