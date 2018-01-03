import React from 'react';
import Button from './button';
import { shallow } from 'enzyme';

describe('Button', () => {

  let component, instance, result;
  
  describe('renders', () => {
    it('should cantains label', () => {
      component = shallow(<Button label='OK' />);
      result = component.find('.Button .Button_size_s .Button_shape_rounded .Button_color_white').props().children
      expect(result).toEqual('OK');
    });

    it('should contains <a> if url specified as external link', () => {
      component = shallow(<Button size='m' color='orange' url='http://www'/>);
      result = component.find('a').type();
      expect(result).toEqual('a');
    });

    it('should contains <Link> if url specified as local link', () => {
      component = shallow(<Button size='m' color='orange' url='/'/>);
      result = component.find('Link').length;
      expect(result).toEqual(1);
    });

    it('should contains <button> if url not specified', () => {
      component = shallow(<Button size='m' color='orange' />);
      result = component.type();
      expect(result).toEqual('button');
    });

    it('should contains class \'Button Button_size_m Button_color_orange\'', () => {
      component = shallow(<Button size='m' color='orange' />);
      result = component.find('.Button .Button_size_m .Button_shape_rounded .Button_color_orange');
      expect(result.length).toBeGreaterThan(0);
    });

    it('should call handleClick() on click', () => {
      let action = jest.fn();
      let onStopPropagation = jest.fn();
      component = shallow(<Button onClick={action}/>);
      component.find('.Button .Button_size_s .Button_shape_rounded .Button_color_white').simulate('click', {stopPropagation: onStopPropagation});
      expect(action).toHaveBeenCalled();
    });
  });

  describe('handleClick()', () => {
    let action = jest.fn();
    let onStopPropagation = jest.fn();
    beforeEach(() => {
      component = shallow(<Button onClick={action} />);
      instance = component.instance();
    });

    it('should call e.stopPropagation()', () => {
      instance.handleClick({stopPropagation: onStopPropagation});
      expect(onStopPropagation).toHaveBeenCalled();
    });
    
    it('should call this.props.onClick(e)', () => {
      instance.handleClick({stopPropagation: onStopPropagation});
      expect(action).toBeCalledWith({stopPropagation: onStopPropagation});
    });
  });

  describe('propToClassName(attr, value)', () => {
    beforeEach(() => {
      component = shallow(<Button size = 'm' color = '' />);
      instance = component.instance();
    });

    it('should return \' Button_size_m\' if attr not empty', () => {
      result = instance.propToClassName('size', instance.props.size);
      expect(result).toEqual(' Button_size_m')
    });
    
    it('should return nothing if attr is none', () => {
      result = instance.propToClassName('color', instance.props.color);
      expect(result).toEqual('');
    });
  });

  describe('className()', () => {
    it('shoud return \'Button Button_size_s Button_shape_rounded Button_color_white\' by default', () => {
      component = shallow(
        <Button />
      );
      instance = component.instance();
      expect(instance.className()).toEqual('Button Button_size_s Button_shape_rounded Button_color_white');
    });

    it('shoud return \'Button Button_size_full Button_shape_circle Button_color_orange Button_icon_info Button_status_unclickable\'', () => {
      component = shallow(
        <Button
          size='full'
          shape='circle'
          color='orange'
          icon='info'
          status='unclickable'
        />
      );
      instance = component.instance();
      expect(instance.className()).toEqual('Button Button_size_full Button_shape_circle Button_color_orange Button_icon_info Button_status_unclickable');
    });
  });

  describe('showLabel()', () => {
    it('label length should be 30 symbols', () => {
      let text = 'this text should be looooooooooooooooooooooooooooooooooooooooooooooong'
      component = shallow(<Button label={text} />);
      expect(component.find('.Button .Button_size_s').props().children.length).toEqual(30);
    })

    it('label should contain full text', () => {
      let text = 'this text is short';
      component = shallow(<Button label={text} />);
      expect(component.find('.Button .Button_size_s').props().children.length).toEqual(text.length);
    })
  });
});
