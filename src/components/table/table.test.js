import React from 'react';
import Table from './table';
import { shallow } from 'enzyme';

const data = [
  [1,2,3],
  [4,5,6],
  [7,8,9]
];

const headers = ['header1', 'header2', 'header3'];

describe('Table', () => {
  let component, instance, result;

  describe('renders', () => {
    it('without crashing', () => {
      component = shallow(<Table data={data} headers={headers} />);
    });

    it(`should contains class 'Table__header_color_orange'`, () => {
      component = shallow(<Table data={data} headers={headers} headerColor='orange' />);
      result = component.find('th');
      expect(result).toHaveClassName('Table__header_color_orange');
    });

    it('should not contains class', () => {
      component = shallow(<Table data={data} headers={headers} />);
      result = component.find('th');
      expect(result).not.toHaveClassName('Table__header_color_orange');
    });


    it(`should contains class 'Table__header_type_dark Table__header_color_green'`, () => {
      component = shallow(<Table data={data} headers={headers} headerType='dark' headerColor='green' />);
      instance = component.instance();
      expect(instance.classNameHeader()).toEqual('Table__header_type_dark Table__header_color_green');
    });

    it(`should contains class 'stripped'`, () => {
      component = shallow(<Table data={data} headers={headers} stripped={true} />);
      result = component.find('tr');
      expect(result).toHaveClassName('Table__row_stripped');
    });

    it(`should not contains class 'stripped'`, () => {
      component = shallow(<Table data={data} headers={headers} />);
      result = component.find('tr');
      expect(result).not.toHaveClassName('stripped');
    });

    it(`should contains class 'stripped'`, () => {
      component = shallow(<Table data={data} headers={headers} stripped={true} />);
      instance = component.instance();
      expect(instance.classNameRow()).toEqual('Table__row_stripped');
    });
  })

})
