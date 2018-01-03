import React, { Component } from 'react';

export default class Loader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: 'Checking API...'
    };

    fetch('/api/status')
      .then(response => response.json())
      .then(response => {
        this.setState({
          message: ['API is ready: ', <code>{JSON.stringify(response)}</code>]
        });
      })
      .catch(err => {
        this.setState({ message: 'API is down' });
      });
  }

  render() {
    return (
      <p>{this.state.message}</p>
    );
  }
};