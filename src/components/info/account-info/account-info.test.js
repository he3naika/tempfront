import React from 'react';
import AccountInfo from './account-info';
import { shallow } from 'enzyme';

describe('AccountInfo', () => {

  let component, instance, result;
  let fakeApi = jest.fn().mockImplementation(() => {
    return new Promise((resolve, reject) => {
      resolve({
        status: 200,
        json: () => {
          return new Promise((resolve, reject) => {
            resolve({
              name: 'Walmart',
              contact: {
                name: 'Bruce',
                number: '765432189',
              },
              mobile: '765432189',
              email: 'test@test.co.uk'
            });
          });
        }
      });
    });
  });

  describe('accountInfoRequest()', () => {

    it('should call this.props.api("/api/accounts/info", "GET")', () => {
      component = shallow(<AccountInfo api={fakeApi} />);
      instance = component.instance();
      instance.accountInfoRequest();
      expect(instance.props.api).toHaveBeenCalledWith('/api/accounts/info', 'GET');
    });

    describe('with status 200', () => {
      beforeEach(() => {
        fakeApi = jest.fn().mockImplementation(() => {
          return new Promise((resolve, reject) => {
            resolve({
              status: 200,
              json: () => {
                return new Promise((resolve, reject) => {
                  resolve({
                    name: 'Walmart',
                    contact: {
                      name: 'Bruce',
                      number: '765432189',
                    },
                    mobile: '765432189',
                    email: 'test@test.co.uk'
                  });
                });
              }
            });
          });
        });
      });

      it('should call setAccountInfo()', async () => {
        component = shallow(<AccountInfo api={fakeApi} />);
        instance = component.instance();
        instance.setAccountInfo = jest.fn();
        await instance.accountInfoRequest();
        expect(await instance.setAccountInfo).toHaveBeenCalled();
      });

    });

    describe('with status not aqual 200', () => {
      beforeEach(() => {
        fakeApi = jest.fn().mockImplementation(() => {
          return new Promise((resolve, reject) => {
            resolve({
              status: 400,
              json: () => {
                return new Promise((resolve, reject) => {
                  resolve();
                });
              }
            });
          });
        });
      });

      it('shouldn\'t call setAccountInfo()', async () => {
        component = shallow(<AccountInfo api={fakeApi} />);
        instance = component.instance();
        instance.setAccountInfo = jest.fn();
        await instance.accountInfoRequest();
        expect(await instance.setAccountInfo).not.toHaveBeenCalled();
      });
      
    });

  });

  describe('setAccountInfo()', () => {
    it('should return data as array of arrays from state', () => {
      component = shallow(<AccountInfo api={fakeApi} />);
      instance = component.instance();
      instance.setAccountInfo({
        name: 'Tesco',
        contact: {
          name: 'Akiko',
          number: '1234567',
        },
        mobile: '1234567',
        email: 'test@test.test'
      })
      expect(instance.state).toEqual({
        accountName: 'Tesco',
        contactName: 'Akiko',
        contactNumber: '1234567',
        mobile: '1234567',
        email: 'test@test.test'
      });
    });
  });
  
  describe('getAccountInfo()', () => {
    it('should return data as array of arrays from state', () => {
      component = shallow(<AccountInfo api={fakeApi} />);
      instance = component.instance();
      instance.setState({
        accountName: 'Tesco',
        contactName: 'Akiko',
        contactNumber: '1234567',
        mobile: '1234567',
        email: 'test@test.test'
      })
      expect(instance.getAccountInfo()).toEqual([
        ['Tesco'],
        ['Akiko'],
        ['1234567'],
        ['1234567'],
        ['test@test.test']
      ]);
    });
  });

});
