// @flow
import React, { Component } from 'react';
import './table.css';

type Props = {
  headers: Array<any>,
  data: any,
  stripped: true | false,
  vertical: true | false,
  headerColor: 'orange' | 'green' | 'blue' | 'white' | 'red',
  headerType: 'transparent' | 'dark',
  textColor: 'white' | 'black',
  onClick: Function
};

export default class Table extends Component<Props>{

  static defaultProps = {
    headers: [],
    data: [],
    stripped: false,
    vertical: false,
    headerColor: 'none',
    headerType: 'transparent',
    textColor: 'white',
    onClick: () => {}
  };

  textColor()/*: string*/{
    if(this.props.textColor)
      return 'Table__text_color_' + this.props.textColor;
    return '';
  }

  classNameRow()/*: string*/{
    let result = '';
    if(this.props.stripped){
      this.props.stripped ? result = 'Table__row_stripped' : result = '';
    }
    return result;
  }

  classNameHeader()/*: string*/{
    let headerType/*: string*/ = '';
    let headerColor/*: string*/ = '';
    if(this.props.headerType) headerType = 'Table__header_type_' + this.props.headerType;
    if(this.props.headerColor) headerColor = 'Table__header_color_' + this.props.headerColor;
    return headerType + ' ' + headerColor;
  }

  formatRow(row/*: Array<any>*/, idx/*: number*/)/*: Array<any>*/ {
    const cells = Array.isArray(row)
      ? row.map((cell, i) => <td key={i} className='Table__cell'>{cell}</td>)
      : [<td key={row} className='Table__cell'>{row}</td>];
    if(this.props.vertical) {
      cells.unshift(<th key={this.props.headers[idx]} className={'Table__header ' + this.classNameHeader()}>{this.props.headers[idx]}</th>);
    }
    return cells;
  }

  rows()/*: Array<any>*/{
    return this.props.data.map(this.formatRow.bind(this));
  }

  render() {
    return (
      <table className={'Table ' + this.textColor()}>
        <tbody>
          <tr className={'Table__row ' + this.classNameRow()}>
            {!this.props.vertical && 
              this.props.headers.map((header, i) => (
                <th key={i} className={'Table__header ' + this.classNameHeader()}>{header}</th>
              ))
            }
          </tr>
          {this.rows().map((row, i) => (
              <tr key={i} className={'Table__row ' + this.classNameRow()} onClick={this.props.onClick}>{row}</tr>
            ))
          }
        </tbody>
      </table>
    )
  }
}
