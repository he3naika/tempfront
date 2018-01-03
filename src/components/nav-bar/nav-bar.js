// @flow
import React, { Component } from 'react';
import Button from '../button/button';
import './nav-bar.css';

type Props = {
  size:       's' | 'm' | 'l' | 'xl' | 'xxl',
  shape:      'circle' | 'rounded',
  navigation: Array<Object>,
  labeled: Boolean
};

export default class NavBar extends Component<Props>{

  static defaultProps = {
    size:       's',
    shape:      'rounded',
    navigation: [{label: 'Main', color: 'green', icon: '', url: '/', status: '', inverse: false, onClick: () => {}}],
    labeled: false
  };

  showButtons()/*React.Element<typeof Button>*/{
    const { size, shape, navigation, labeled } = this.props;
    if(labeled){
      return navigation.map((nav, index) => {
        return nav.url === window.location.pathname
          ? <div key={index} className='NavBar__label'><p className={'NavBar__label_color_' + nav.color}>{nav.label}</p><Button key={index} size={size} shape={shape} color={nav.color} icon={nav.icon} status={nav.status} onClick={nav.onClick} inverse={nav.inverse} /></div>
          : <div key={index} className='NavBar__label'><p className={'NavBar__label_color_' + nav.color}>{nav.label}</p><Button key={index} size={size} shape={shape} color={nav.color} icon={nav.icon} status={nav.status} url={nav.url} onClick={nav.onClick} inverse={nav.inverse} /></div>
      });
    }
    else {
      return navigation.map((nav, index) => {
        return nav.url === window.location.pathname
          ? <div key={index}><Button key={index} label={nav.label} size={size} shape={shape} color={nav.color} icon={nav.icon} status={nav.status} onClick={nav.onClick} inverse={nav.inverse} /></div>
          : <div key={index}><Button key={index} label={nav.label} size={size} shape={shape} color={nav.color} icon={nav.icon} status={nav.status} url={nav.url} onClick={nav.onClick} inverse={nav.inverse} /></div>
      });
    }
  };

  render(){
    return(
      <div className='NavBar'>
        {this.showButtons()}
      </div>
    );
  };
};
