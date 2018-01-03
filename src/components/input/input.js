// @flow
import React, { Component } from 'react';
import Button from '../button/button';
import './input.css';

type Props = {
  disabled:      boolean,
  validation:    string,
  size:          's' | 'm' | 'l' | 'xl' | 'full',
  shape:         'rounded' | '',
  placeholder:   string,
  type:          'text' | 'password' | 'email' | 'search' | 'number',
  onChange:      Function,
  onBlur:        Function
};

type State = {
  text: string | number,
};

class Input extends Component<Props, State> {

  static defaultProps = {
    disabled:     false,
    size:         'm',
    shape:        '',
    placeholder:  '',
    validation:  '',
    type:         'text',
    onChange:     () => {},
    onBlur:       () => {}
  }; 

  constructor(props/*: Props*/) {
    super(props);
    this.state = {
      text: this.props.value
    };
  }

  componentWillReceiveProps(nextProps/*: any*/)/*: void*/ {
    this.setState({
      text: nextProps.value
    });
  }

  className()/*: string*/ {
    const classes = [
      `input`,
      `input_size_${this.props.size}`
    ];
    if (this.props.shape) {
      classes.push(`input_shape_${this.props.shape}`)
    }
    if (this.props.disabled){
      classes.push(`input_disabled`)
    }
    return classes.join(' ');
  }

  onChange(e/*: SyntheticInputEvent<>*/)/*: void*/ {
    e.stopPropagation();
    let value = e.target.value;
    if (this.props.type === 'number' && value) {
      value = Number(value)
    }
    if(this.props.validation === 'meterReading'){
      value = value.replace(/[^0-9]+/, '')
    }
    if(this.props.validation === 'meterDate'){
      value = value.replace(/[^0-9/]+/, '')
      if(value.length > 10){
        value = value.slice(0, 10)
      }
    }
    this.setState({
      text: value
    });
    this.props.onChange(value)
  }

  render() {

    return (
      this.props.type === 'search'
      ? <div className='input_type_search'>
          <input
            disabled={this.props.disabled}
            className={this.className()}
            type={this.props.type}
            placeholder={this.props.placeholder}
            onChange={e => this.onChange(e)}
            value={this.state.text}
          />
          <Button size='s' color='' icon='search' />
        </div>
      : <input
        disabled={this.props.disabled}
        className={this.className()}
        type={this.props.type}
        placeholder={this.props.placeholder}
        onChange={e => this.onChange(e)}
        value={this.state.text}
      />
    );
  }
}

export default Input;
