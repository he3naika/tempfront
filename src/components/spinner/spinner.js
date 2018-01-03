// @flow
import React, { Component } from 'react';
import './spinner.css';

type Props = {
  size: 's' | 'm' | 'l' | 'xl' | 'xxl' | 'full',
  color: 'orange' | 'green' | 'blue' | 'red' | 'grey' | 'purple' | 'white' | '',
};

export default class Spinner extends Component<Props>{

  static defaultProps = {
    size: 'm',
    color: 'white'
  }

  setClassName(){
    const classes = [
      `spinner`,
      `spinner_size_${this.props.size}`,
      `spinner_color_${this.props.color}`
    ];
    return classes.join(' ');
  }

  render() {
    return (
      <div className={this.setClassName()}></div>
    )
  }
}
