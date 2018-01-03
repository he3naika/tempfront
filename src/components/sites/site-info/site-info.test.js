import React from 'react';
import SiteInfo from './site-info';
import { shallow } from 'enzyme';

describe('SiteInfo component', () => {

  let component, instance, result, data, fakeApi;
  beforeEach(() => {
    data = [{
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
    component = shallow(<SiteInfo api={fakeApi}/>);
    instance = component.instance();
  });

  describe('getSites()', () => {

    it('should call getSite()', async() => {
      instance.getSite = jest.fn();
      await instance.getSite();
      expect(await instance.getSite).toHaveBeenCalled()
    });

    it('should call setSite()', async() => {
      instance.setSite = jest.fn();
      await instance.getSite();
      expect(await instance.setSite).toHaveBeenCalledWith(data)
    });

    it('should not call setSites() if status is not 200', async() => {
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
      component = shallow(<SiteInfo api={fakeApi}/>);
      instance = component.instance();
      instance.setSite = jest.fn();
      await instance.getSite();
      expect(await instance.setSite).not.toHaveBeenCalled()
    });
  });

  describe('setSite()', () => {

    it('should set a new state', () => {
      instance.setState({sites: []});
      instance.setSite(data);
      expect(instance.state.site).toEqual(["123", "21-16 testStreet", "123456789", "123456789", "123456", "Yes"]);
    });
  });
});
