import React from 'react';
import { storiesOf } from '@storybook/react';
import NavBar from './nav-bar';
import { BrowserRouter } from 'react-router-dom';

const nav = [{label: 'Main', url: '/'}, {label: 'Catalooooog', url: '/catalog'}, {label: 'About', url: '/about'}];
const navWithIcons = [{icon: 'info', url: '/'}, {icon: 'drop', url: '/catalog'}, {icon: 'logout', url: '/about'}];
const navIconsUnclickable = [{icon: 'info', url: '/'}, {icon: 'drop', url: '/catalog'}, {icon: 'building', url: '/iframe.html'}];
const navUnclickable = [{label: 'Main', url: '/'}, {label: 'Catalooooog', url: '/catalog'}, {label: 'Current', url: '/iframe.html'}];

storiesOf('NavBar', module)
  .addDecorator(story => (
    <BrowserRouter >
      <div style={{textAlign: 'left', height: '100vh', backgroundColor: '#b3cccc', fontFamily: 'Helvetica', fontSize: '18px'}}>
        {story()}
      </div>
    </BrowserRouter>
  ))
  .add('General usage', () => (
    <div style={{padding: '20px'}}>
      <h3>NavBar can have following props:</h3>
      <div style={{color: '#09224c'}}>
        size:
        <span style={{color: '#c16828'}}> 's' | 'm' | 'l' | 'full'</span>
      </div>
      <div style={{color: '#09224c'}}>
        shape:
        <span style={{color: '#c16828'}}> 'circle' | 'rounded'</span>
      </div>
      <div style={{color: '#09224c'}}>
        color:
        <span style={{color: '#c16828'}}> 'green' | 'orange' | 'blue' | 'grey'</span>
      </div>
      <div style={{color: '#09224c'}}>
        navigation:
        <span style={{color: '#c16828'}}>{" Array of objects {label: 'string', icon: 'string', url: 'string'}"}</span>
      </div>
      <h3>All props are not required. By default it will be:</h3>
      <div style={{color: '#09224c'}}>
        size:
        <span style={{color: '#c16828'}}> 's'</span>
      </div>
      <div style={{color: '#09224c'}}>
        shape:
        <span style={{color: '#c16828'}}> 'rounded'</span>
      </div>
      <div style={{color: '#09224c'}}>
        color:
        <span style={{color: '#c16828'}}> 'green'</span>
      </div>
      <div style={{color: '#09224c'}}>
        navigation:
        <span style={{color: '#c16828'}}>{" [{label: 'Main', icon: '', url: '/'}]"}</span>
      </div>
      <h3>Buttons which have url === window.location.pathname will be automatically <span style={{color: '#c16828'}}>unclickable</span></h3>
    </div>
  ))
  .add('default', () => (
    <div style={{padding: '20px'}}>
      <NavBar />
    </div>
  ))
  .add('different sizes', () => (
    <div style={{padding: '20px'}}>
      <p style={{margin: '10px', color: '#3a01c6'}}>{"const nav = [{label: 'Main', url: '/'}, {label: 'Catalooooog', url: '/catalog'}, {label: 'About', url: '/about'}]"}</p>
      <p style={{margin: '10px'}}>{"<NavBar navigation={nav} size='s'/>"}</p>
      <NavBar navigation={nav} size='s'/>
      <p style={{margin: '10px'}}>{"<NavBar navigation={nav} size='m'/>"}</p>
      <NavBar navigation={nav} size='m'/>
      <p style={{margin: '10px'}}>{"<NavBar navigation={nav} size='l'/>"}</p>
      <NavBar navigation={nav} size='l'/>
    </div>
  ))
  .add('different shapes', () => (
    <div style={{padding: '20px'}}>
      <p style={{margin: '10px', color: '#3a01c6'}}>{"const nav = [{label: 'Main', url: '/'}, {label: 'Catalooooog', url: '/catalog'}, {label: 'About', url: '/about'}]"}</p>
      <p style={{margin: '10px'}}>{"<NavBar navigation={nav} size='m' shape='circle'/>"}</p>
      <NavBar navigation={nav} size='m' shape='circle'/>
      <p style={{margin: '10px'}}>{"<NavBar navigation={nav} size='m'/> shape='rounded'"}</p>
      <NavBar navigation={nav} size='m' shape='rounded'/>
    </div>
  ))
  .add('different colors', () => (
    <div style={{padding: '20px'}}>
      <p style={{margin: '10px', color: '#3a01c6'}}>{"const nav = [{label: 'Main', url: '/'}, {label: 'Catalooooog', url: '/catalog'}, {label: 'About', url: '/about'}]"}</p>
      <p style={{margin: '10px'}}>{"<NavBar navigation={nav} size='m' color='orange'/>"}</p>
      <NavBar navigation={nav} size='m' color='orange'/>
      <p style={{margin: '10px'}}>{"<NavBar navigation={nav} size='m' color='green'/>"}</p>
      <NavBar navigation={nav} size='m' color='green'/>
      <p style={{margin: '10px'}}>{"<NavBar navigation={nav} size='m' color='blue'/>"}</p>
      <NavBar navigation={nav} size='m' color='blue'/>
      <p style={{margin: '10px'}}>{"<NavBar navigation={nav} size='m' color='grey'/>"}</p>
      <NavBar navigation={nav} size='m' color='grey'/>
    </div>
  ))
  .add('with icons', () => (
    <div style={{padding: '20px'}}>
      <p style={{margin: '10px', color: '#3a01c6'}}>{"const navWithIcons = [{icon: 'info', url: '/'}, {icon: 'drop', url: '/catalog'}, {icon: 'logout', url: '/about'}]"}</p>
      <p style={{margin: '10px'}}>{"<NavBar navigation={navWithIcons} shape='circle'/>"}</p>
      <NavBar navigation={navWithIcons} shape='circle' />
    </div>
  ))
  .add('with unclickable button for current page', () => (
    <div style={{padding: '20px'}}>
      <p style={{margin: '10px', color: '#3a01c6'}}>{"const navIconsUnclickable = [{icon: 'info', url: '/'}, {icon: 'drop', url: '/catalog'}, {icon: 'building', url: '/iframe.html'}]"}</p>
      <p style={{margin: '10px', color: '#3a01c6'}}>{"const navUnclickable = [{label: 'Main', url: '/'}, {label: 'Catalooooog', url: '/catalog'}, {label: 'Current', url: '/iframe.html'}]"}</p>
      <p style={{margin: '10px'}}>{"<NavBar navigation={navIconsUnclickable} shape='circle'/>"}</p>
      <NavBar navigation={navIconsUnclickable} shape='circle' />
      <p style={{margin: '10px'}}>{"<NavBar navigation={navUnclickable} shape='rounded'/>"}</p>
      <NavBar navigation={navUnclickable} shape='rounded' />
    </div>
  ));
