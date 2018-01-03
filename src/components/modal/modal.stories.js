import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

import Modal from './modal';

class MyComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false
    }
  }

  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <div>
        <button onClick={this.toggleModal}>Open modal </button>
        <Modal show={this.state.isOpen} onClose={this.toggleModal} scrollable={this.props.scrollable}>
          {this.props.scrollable && <div style={{width: '200px', height: '200px'}}>
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
           in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
            sunt in culpa qui officia deserunt mollit anim id est laborum."
          </div>}
          {!this.props.scrollable && <div style={{maxWidth: '200px'}}>
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
           in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
            sunt in culpa qui officia deserunt mollit anim id est laborum."
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
           in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
            sunt in culpa qui officia deserunt mollit anim id est laborum."
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
           in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
            sunt in culpa qui officia deserunt mollit anim id est laborum."
          </div>}
        </Modal>
      </div>
    )
  }
}

storiesOf('Modal window', module)
  .addDecorator(story => (
    <div style={{backgroundColor: '#e7e7e7', height: '700px'}}>
      {story()}
    </div>
  ))
  .add('General usage', () => (
    <div style={{padding: '30px'}}>
      <h3>Modal window can have following props:</h3>
      <div style={{'margin': '30px'}}>
        <div style={{'padding': '5px', 'color': '#51565f' }}>
          show:
          <span style={{'color': 'grey'}}> true | false</span>
        </div>
        <div style={{'padding': '5px', 'color': '#51565f' }}>
          scrollable:
          <span style={{'color': 'grey'}}> true | false</span>
        </div>
        <div style={{'padding': '5px', 'color': '#51565f' }}>
          onClose:
          <span style={{'color': 'grey'}}> Function</span>
        </div>
      </div>
      <h3>By default modal component have following props:</h3>
      <div style={{'margin': '30px'}}>
        <div style={{'padding': '5px', 'color': '#51565f' }}>
          show:
          <span style={{'color': 'grey'}}> false</span>
        </div>
        <div style={{'padding': '5px', 'color': '#51565f' }}>
          scrollable:
          <span style={{'color': 'grey'}}> false</span>
        </div>
        <div style={{'padding': '5px', 'color': '#51565f' }}>
          onClose:
          <span style={{'color': 'grey'}}> toggleModal()</span>
        </div>
      </div>
    </div>
  ))
  .add('Scrollable', () => (
    <div style={{padding: '30px'}}>
      <h3>{'<Modal scrollable={true} />'}</h3>
      <MyComponent scrollable={true}/>
    </div>
  ))
  .add('Unscrollable', () => (
    <div style={{padding: '30px'}}>
    <h3>{'<Modal scrollable={false} />'}</h3>
      <MyComponent scrollable={false}/>
    </div>
  ))
