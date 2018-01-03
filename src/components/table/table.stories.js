import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import Table from './table';

const headers = ['header1', 'header2', 'header3'];

const data = [
  [11,12,13],
  [21,22,23],
  [24,25,26]
];

const AwesomeRow = props => {
  return [
    <td>{props.foo}</td>,
    <td>{props.bar}</td>,
    <td>{props.baz}</td>
  ];
};

const awesomeData = [
  <AwesomeRow foo="1" bar="2" baz="3" />,
  <AwesomeRow foo="11" bar="12" baz="13" />,
  <AwesomeRow foo="21" bar="22" baz="23" />,
  <AwesomeRow foo="31" bar="32" baz="33" />
];

storiesOf('Table', module)
  .addDecorator(story => (
    <div style={{textAlign: 'left', backgroundColor: '#565656', height: '700px'}}>
      {story()}
    </div>
  ))
  .add('General usage', () => (
    <div style={{'padding': '30px'}}>
      <h3>Table can have following props:</h3>
      <div style={{'margin': '30px'}}>
        <div style={{'padding': '5px', 'color': '#b1b6bf' }}>
          data:
          <span style={{'color': 'white'}}>  Array | React Component</span>
        </div>
        <div style={{'padding': '5px', 'color': '#b1b6bf' }}>
          headers:
          <span style={{'color': 'white'}}>  Array</span>
        </div>
        <div style={{'padding': '5px', 'color': '#b1b6bf' }}>
          stripped:
          <span style={{'color': 'white'}}>  true | false</span>
        </div>
        <div style={{'padding': '5px', 'color': '#b1b6bf' }}>
          vertical:
          <span style={{'color': 'white'}}>  true | false</span>
        </div>
        <div style={{'padding': '5px', 'color': '#b1b6bf' }}>
          headerColor:
          <span style={{'color': 'white'}}>  'orange' | 'green' | 'blue' | 'none'</span>
        </div>
        <div style={{'padding': '5px', 'color': '#b1b6bf' }}>
          headerType:
          <span style={{'color': 'white'}}>  'transparent' | 'dark'</span>
        </div>
        <div style={{'padding': '5px', 'color': '#b1b6bf' }}>
          textColor:
          <span style={{'color': 'white'}}>  'white' | 'black'</span>
        </div>
        <div style={{'padding': '5px', 'color': '#b1b6bf' }}>
          onClick:
          <span style={{'color': 'white'}}>  Function</span>
        </div>
      </div>
      <h3>By default table has following props:</h3>
      <div style={{'margin': '30px'}}>
        <div style={{'padding': '5px', 'color': '#b1b6bf' }}>
          stripped:
          <span style={{'color': 'white'}}>  false</span>
        </div>
        <div style={{'padding': '5px', 'color': '#b1b6bf' }}>
          vertical:
          <span style={{'color': 'white'}}>  false</span>
        </div>
        <div style={{'padding': '5px', 'color': '#b1b6bf' }}>
          headerColor:
          <span style={{'color': 'white'}}>  'none'</span>
        </div>
        <div style={{'padding': '5px', 'color': '#b1b6bf' }}>
          headerType:
          <span style={{'color': 'white'}}>  'transparent'</span>
        </div>
        <div style={{'padding': '5px', 'color': '#b1b6bf' }}>
          textColor:
          <span style={{'color': 'white'}}>  'white'</span>
        </div>
      </div>
    </div>
  ))
  .add('Default', () => (<Table data={data} headers={headers} />))
  .add('Header types', () => (
    <div>
      <div style={{width: '300px', display: 'inline-block', 'margin': '50px'}}>
        <h4>Dark header</h4>
        <p style={{'color': 'white'}}>{`<Table headerType='dark' />`}</p>
        <Table data={data} headers={headers} headerType='dark' />
      </div>
      <div style={{width: '300px', display: 'inline-block', 'margin': '50px'}}>
        <h4>Transparent (default) header</h4>
        <p style={{'color': 'white'}}>{`<Table headerType='transparent' />`}</p>
        <Table data={data} headers={headers} headerType='transparent' />
      </div>
    </div>
  ))
  .add('Header direction', () => (
    <div>
      <div style={{width: '300px', display: 'inline-block', 'margin': '50px'}}>
        <h4>Horizontal (default)</h4>
        <p style={{'color': 'white'}}>{`<Table vertical={false} />`}</p>
        <Table data={data} headers={headers} vertical={false} />
      </div>
      <div style={{width: '300px', display: 'inline-block', 'margin': '50px'}}>
        <h4>Vertical</h4>
        <p style={{'color': 'white'}}>{`<Table vertical={true} />`}</p>
        <Table data={data} headers={headers} vertical={true} />
      </div>
    </div>
  ))
  .add('Stripped', () => (
    <div>
      <div style={{width: '300px', display: 'inline-block', 'margin': '50px'}}>
        <h4>Stripped</h4>
        <p style={{'color': 'white'}}>{`<Table stripped={true} />`}</p>
        <Table data={data} headers={headers} stripped={true} />
      </div>
      <div style={{width: '300px', display: 'inline-block', 'margin': '50px'}}>
        <h4>Stripped with dark header</h4>
        <p style={{'color': 'white'}}>{`<Table stripped={true} headerType='dark' />`}</p>
        <Table data={data} headers={headers} stripped={true} headerType='dark' />
      </div>
      <div style={{width: '300px', display: 'inline-block', 'margin': '50px'}}>
        <h4>Stripped with dark vertical header</h4>
        <p style={{'color': 'white'}}>{`<Table stripped={true} vertical='true' headerType='dark' />`}</p>
        <Table data={data} headers={headers} stripped={true} vertical='true' headerType='dark' />
      </div>
      <div style={{width: '300px', display: 'inline-block', 'margin': '50px'}}>
        <h4>Stripped with vertical header</h4>
        <p style={{'color': 'white'}}>{`<Table stripped={true} vertical='true' />`}</p>
        <Table data={data} headers={headers} stripped={true} vertical='true' />
      </div>
    </div>
  ))
  .add('Header colors', () => (
    <div>
      <div style={{width: '300px', display: 'inline-block', 'margin': '50px'}}>
        <h4>Header color white (default)</h4>
        <p style={{'color': 'white'}}>{`<Table headerColor='white' />`}</p>
        <Table data={data} headers={headers} headerColor='white' />
      </div>
      <div style={{width: '300px', display: 'inline-block', 'margin': '50px'}}>
        <h4>Header color green</h4>
        <p style={{'color': 'white'}}>{`<Table headerColor='green' />`}</p>
        <Table data={data} headers={headers} headerColor='green' />
      </div>
      <div style={{width: '300px', display: 'inline-block', 'margin': '50px'}}>
        <h4>Header color blue</h4>
        <p style={{'color': 'white'}}>{`<Table headerColor='blue' />`}</p>
        <Table data={data} headers={headers} headerColor='blue' />
      </div>
      <div style={{width: '300px', display: 'inline-block', 'margin': '50px'}}>
        <h4>Header color orange</h4>
        <p style={{'color': 'white'}}>{`<Table headerColor='orange' />`}</p>
        <Table data={data} headers={headers} headerColor='orange' />
      </div>
    </div>
  ))
  .add('Tetx color', () => (
    <div>
      <div style={{width: '300px', display: 'inline-block', 'margin': '50px'}}>
        <h4>Text color white (default)</h4>
        <p style={{'color': 'white'}}>{`<Table />`}</p>
        <Table data={data} headers={headers} />
      </div>
      <div style={{width: '300px', display: 'inline-block', 'margin': '50px'}}>
        <h4>Text color black</h4>
        <p style={{'color': 'white'}}>{`<Table textColor='black' />`}</p>
        <Table data={data} headers={headers} textColor='black' />
      </div>
    </div>
  ))
  .add('Clickable', () => (
    <div>
      <div style={{width: '300px', display: 'inline-block', 'margin': '50px'}}>
        <h4>Click on tr</h4>
        <p style={{'color': 'white'}}>{`<Table onClick={e => alert('You clicked on <tr>')} />`}</p>
        <Table data={data} headers={headers} onClick={e => alert('You clicked on <tr>')} />
      </div>
    </div>
  ))
