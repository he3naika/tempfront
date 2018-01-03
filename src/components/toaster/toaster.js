import React, { Component } from 'react';
import './toaster.css';

export default class Toaster extends Component {

  render() {
    return (
      <div className='toaster'>
        <div className='toaster__error-message'>
          {this.props.children || 'Oops! Something went wrong:('}
        </div>
        <div className='toaster__progress-bar'></div>
      </div>
    )
  }
}