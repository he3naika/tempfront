import React from 'react';
import ReactDOM from 'react-dom';
import Input from './input';
import { shallow } from 'enzyme';

describe('Input component', () => {
  let container, instance;

  beforeEach(() => {
    let onChange = jest.fn();
    container = shallow(
      <Input
        type='search'
        size='l'
        shape='rounded'
        disabled={true}
        onChange={onChange}
        placeholder='write something' />
    );
    instance = container.instance();
  });

  describe('componentWillReceiveProps(nextProps)', () => {
    it('should set a new state', () => {
      let nextProps = { value: 'test' };
      instance.setState({text: ''});
      instance.componentWillReceiveProps(nextProps);
      expect(instance.state.text).toEqual('test');
    });
  })

  describe('className()', () => {
    it('should create class name', () => {
      let result = instance.className();
      expect(result).toEqual('input input_size_l input_shape_rounded input_disabled');
    });
  })

  describe('onChange(e)', () => {
    it('should set a new state', () => {
      let onStopPropagation = jest.fn();
      let e = { target: {value: 'test'}, stopPropagation: onStopPropagation};
      instance.setState({text: ''});
      instance.onChange(e);
      expect(instance.state.text).toEqual('test');
    });
    it('should call this.props.onChange with exact value', () => {
      let onStopPropagation = jest.fn();
      let e = { target: {value: 'test'}, stopPropagation: onStopPropagation};
      instance.setState({text: 'test'});
      instance.onChange(e);
      expect(instance.props.onChange).toBeCalledWith('test');
    });
  })

  describe('render()', () => {
    it('should rendrer input with className', () => {
      expect(container.find('input')).toHaveClassName('input input_size_l input_shape_rounded input_disabled');
    })
    it('should rendrer input with placeholder', () => {
      expect(container.find('input').props().placeholder).toEqual('write something');
    })
    it('should rendrer input with default value', () => {
      instance.setState({text: 'default value'});
      container.update();
      expect(container.find('input').props().value).toEqual('default value');
    })
    it('should rendrer disabled input', () => {
      expect(container.find('input').props().disabled).toEqual(true);
    })
    it('should call function onChange', () => {
      let onStopPropagation = jest.fn();
      let value = 'test'
      let e = { target: {value: value}, stopPropagation: onStopPropagation};
      container.find('input').simulate('change', e);
      expect(instance.state.text).toEqual(value);
    })
    it('should call function props.onChange', () => {
      let onStopPropagation = jest.fn();
      let value = 'test'
      let e = { target: {value: value}, stopPropagation: onStopPropagation};
      instance.setState({text: 'test'});
      container.find('input').simulate('change', e);
      expect(instance.props.onChange).toBeCalledWith(value);
    })
  })
})
