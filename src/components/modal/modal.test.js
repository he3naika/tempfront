import React from 'react';
import Modal from './modal';
import { shallow } from 'enzyme';

describe('Modal', () => {
  let component, instance, result;
  describe('renders', () => {

    it('withour crashing', () => {
      component = shallow(<Modal />)
    });

    it('should not contains class', () => {
      component = shallow(<Modal scrollable={false} />);
      result = component.find('div');
      expect(result).not.toHaveClassName('Modal scrollable');
    });

    it('should contains class scrollable', () => {
      component = shallow(<Modal scrollable={true} />);
      instance = component.instance();
      expect(instance.classNameScrollable()).toEqual(' scrollable');
    });
  })
  
})
