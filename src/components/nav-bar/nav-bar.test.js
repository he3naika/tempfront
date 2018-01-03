import React from 'react';
import NavBar from './nav-bar';
import { mount } from 'enzyme';

describe('NavBar', () => {

  let component, instance, result;
  
  describe('renders', () => {
    it('should contain button \'.Button .Button_size_s .Button_shape_rounded .Button_color_green\' by default', () => {
      component = mount(<NavBar />);
      result = component.find('.Button .Button_size_s .Button_shape_rounded .Button_color_green');
      expect(result.length).toBeGreaterThan(0);
    });
  });

});
