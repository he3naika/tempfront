import React from 'react';
import Sites from './sites';
import { shallow } from 'enzyme';

describe('Sites component', () => {

  let component, instance, result, data, fakeApi;
  beforeEach(() => {
    data = [{
      customerRefNumber: "123",
      premiseAddress: "21-16 testStreet",
      postCode: "123456789",
      spid: "123456789",
      sic: "123456",
      sensitiveCustomer: 'Yes'
    },
    {
      customerRefNumber: "123",
      premiseAddress: "21-16 testStreet",
      postCode: "123456789",
      spid: "123456789",
      sic: "123456",
      sensitiveCustomer: 'Yes'
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
    component = shallow(<Sites api={fakeApi}/>);
    instance = component.instance();
  });

  describe('getSites()', () => {

    it('should call getSites()', async() => {
      instance.getSites = jest.fn();
      await instance.getSites();
      expect(await instance.getSites).toHaveBeenCalled()
    });

    it('should call setSites()', async() => {
      instance.setSites = jest.fn();
      await instance.getSites();
      expect(await instance.setSites).toHaveBeenCalledWith(data)
    });

    it('should not  call setSites() if status is not 200', async() => {
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
      component = shallow(<Sites api={fakeApi}/>);
      instance = component.instance();
      instance.setSites = jest.fn();
      await instance.getSites();
      expect(await instance.setSites).not.toHaveBeenCalled()
    });
  });

  describe('setSites()', () => {
    
    it('should set a new state', () => {
      instance.setState({sites: []});
      instance.setSites(data);
      expect(instance.state.sites).toEqual([["123", "21-16 testStreet", "123456789", "123456789", "123456", "Yes"], ["123", "21-16 testStreet", "123456789", "123456789", "123456", "Yes"]]);
    });
  });
});
