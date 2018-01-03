import React from 'react';
import BillingAddress from './billing-address';
import { shallow } from 'enzyme';

describe('BillingAddresses', () => {

  let component, instance, result;
  let fakeApi = jest.fn().mockImplementation(() => {
    return new Promise((resolve, reject) => {
      resolve({
        status: 200,
        json: () => {
          return new Promise((resolve, reject) => {
            resolve([{
              city: 'SomeCity',
              county: 'SomeConty',
              postCode: '765432189',
              streetAddresses: [
                'Address1',
                'Address2'
              ]
            }]);
          });
        }
      });
    });
  });

  describe('getBillings()', () => {

    it('should call this.props.api("/api/accounts/billingAddresses", "GET")', () => {
      component = shallow(<BillingAddress api={fakeApi} />);
      instance = component.instance();
      instance.getBillings();
      expect(instance.props.api).toHaveBeenCalledWith('/api/accounts/billingAddresses', 'GET');
    });

    describe('with status 200', () => {
      beforeEach(() => {
        fakeApi = jest.fn().mockImplementation(() => {
          return new Promise((resolve, reject) => {
            resolve({
              status: 200,
              json: () => {
                return new Promise((resolve, reject) => {
                  resolve([{
                    city: 'SomeCity1',
                    county: 'SomeConty1',
                    postCode: '765432189',
                    streetAddresses: [
                      'Address2',
                      'Address3'
                    ]
                  }]);
                });
              }
            });
          });
        });
      });

      it('should call setData)', async () => {
        component = shallow(<BillingAddress api={fakeApi} />);
        instance = component.instance();
        instance.setData = jest.fn();
        await instance.getBillings();
        expect(await instance.setData).toHaveBeenCalled();
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

      it('shouldn\'t call setData()', async () => {
        component = shallow(<BillingAddress api={fakeApi} />);
        instance = component.instance();
        instance.setData = jest.fn();
        await instance.getBillings();
        expect(await instance.setData).not.toHaveBeenCalled();
      });
      
    });

  });

  describe('setData()', () => {
    it('should return data as array of arrays from state', () => {
      component = shallow(<BillingAddress api={fakeApi} />);
      instance = component.instance();
      instance.setData([{
        city: 'SomeCity1',
        county: 'SomeConty1',
        postCode: '765432189',
        streetAddresses: [
          'Address2',
          'Address3'
        ]
      }])
      expect(instance.state.billings).toEqual(
        [['Address2', 'Address3', 'SomeCity1', 'SomeConty1', '765432189']]
      );
    });
  });

});
