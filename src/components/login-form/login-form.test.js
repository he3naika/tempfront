import React from 'react';
import LoginForm from './login-form';
import { shallow } from 'enzyme';

describe('LoginForm', () => {

  let component, instance, result;
  
  describe('changeEmail(value)', () => {
    it('should update email state', () => {
      component = shallow(<LoginForm />);
      instance = component.instance();
      instance.setState({email: ''});
      instance.changeEmail('test@test.test');
      expect(instance.state.email).toEqual('test@test.test');
    });
  });

  describe('changeDisabled(value)', () => {
    it('should update email state', () => {
      component = shallow(<LoginForm />);
      instance = component.instance();
      instance.setState({disabled: false});
      instance.changeDisabled(true);
      expect(instance.state.disabled).toEqual(true);
    });
  });

  describe('changePassword(value)', () => {
    it('should update password state', () => {
      component = shallow(<LoginForm />);
      instance = component.instance();
      instance.setState({password: ''});
      instance.changePassword('123qwe');
      expect(instance.state.password).toEqual('123qwe');
    });
  });

  describe('changeStatus(value)', () => {
    it('should update status state', () => {
      component = shallow(<LoginForm />);
      instance = component.instance();
      instance.setState({status: 100});
      instance.changeStatus(200);
      expect(instance.state.status).toEqual(200);
    });
  });

  describe('clearForm()', () => {
    beforeEach(() => {
      component = shallow(<LoginForm />);
      instance = component.instance();
    });
    it('should clear password field', () => {
      instance.setState({password: '11111111111', disabled: true});
      instance.clearForm();
      expect(instance.state.password).toEqual('');
    });
    it('should change disabled field', () => {
      instance.setState({password: '11111111111', disabled: true});
      instance.clearForm();
      expect(instance.state.disabled).toEqual(false);
    });
    it('should clear email field if status 200', () => {
      instance.setState({email: 'test@test.test', status: 200});
      instance.clearForm();
      expect(instance.state.email).toEqual('');
    });

    it('shouldn\'t clear email field if status not equal 200', () => {
      instance.setState({email: 'test@test.test', status: 300});
      instance.clearForm();
      expect(instance.state.email).toEqual('test@test.test');
    });
  });

  describe('buttonStatus()', () => {
    it('should update status state', () => {
      component = shallow(<LoginForm />);
      instance = component.instance();
      instance.setState({disabled: true});
      let result = instance.buttonStatus();
      expect(result).toEqual('loading');
    });
  });

  describe('showErrorMsg()', () => {
    beforeEach(() => {
      component = shallow(<LoginForm />);
      instance = component.instance();
    });

    it('should return \'The password you entered has not been recognised. Please try again. \' if status equal 400', () => {
      instance.setState({status: 400});
      expect(instance.showErrorMsg()).toEqual(<div className='login__form__label_error'>The email address or password is incorrect.<p>Please try again.</p></div>);
    });

    it('should return \'Wrong Email or Password \' if status not equal 200', () => {
      instance.setState({status: 500});
      expect(instance.showErrorMsg()).toEqual(<div className='login__form__label_error'>Please check your internet connection.<p>And try again later.</p></div>);
    });

    it('should return \'undefined\' if status equal 200', () => {
      instance.setState({status: 200});
      expect(instance.showErrorMsg()).toEqual(undefined);
    });

    it('should return \'undefined\' if status is \'\'', () => {
      instance.setState({status: ''});
      expect(instance.showErrorMsg()).toEqual(undefined);
    });
  });

  describe('onClick()', () => {
    beforeEach(() => {
      let fakeApi = () => {
        return new Promise((resolve, reject) => {
          resolve({
            ok: true, 
            status: 200, 
            json: () => {}
          });
        });
      }
      component = shallow(<LoginForm api={fakeApi} />);
      instance = component.instance();
    });

    it('should call changeStatus()', async() => {
      instance.changeStatus = jest.fn();
      await instance.onClick();
      expect(instance.changeStatus).toHaveBeenCalled()
    });

    it('should call clearForm()', async() => {
      instance.clearForm = jest.fn();
      await instance.onClick();
      expect(instance.clearForm).toHaveBeenCalled()
    });
  });
});
