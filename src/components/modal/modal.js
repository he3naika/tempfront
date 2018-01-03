//@flow
import React, { Component, type Node } from 'react';
import Button from '../button/button';
import './modal.css';

type Props = {
  show: boolean,
  scrollable: true | false,
  onClose: Function,
  children: Node
};

export default class Modal extends Component<Props>{

  static defaultProps = {
    show: false,
    scrollable: false,
    onClose: {}
  }

  classNameScrollable()/*: string*/{
    if(this.props.scrollable)
      return ' scrollable';
    return '';
  }

  render() {
    if(!this.props.show){
      return null;
    }
    return (
      <div className='Modal__container'>
        <div className='Overlay' onClick={e => this.props.onClose(e)}></div>
        <div className={'Modal' + this.classNameScrollable()}>
            <span className='Btn_close'><Button label='Close' size='s' color='orange' onClick={e => this.props.onClose(e)}>Close</Button></span>
            <div className='Modal__content'>
              {this.props.children}
            </div>
          </div>
      </div>
    )
  }
}
