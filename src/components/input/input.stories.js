import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import Input from './input';

storiesOf('Input', module)
  .addDecorator(story => (
    <div style={{textAlign: 'left', backgroundColor: '#b3cccc', height: '700px', padding: '20px'}}>
      {story()}
    </div>
  ))
  .add('default', () => (
    <div>
      <b style={{marginRight: '20px'}} >disabled false, size m, no placeholder, shape square, type text</b>
      <Input />
    </div>
  ))
  .add('size', () => (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <div style={{padding: '20px'}}>
        <b style={{marginRight: '25px'}} >size s</b>
        <Input size='s' />
      </div>
      <div style={{padding: '20px'}}>
        <b style={{marginRight: '20px'}} >size m</b>
        <Input size='m' />
      </div>
      <div style={{padding: '20px'}}>
        <b style={{marginRight: '30px'}} >size l</b>
        <Input size='l' />
      </div>
      <div style={{padding: '20px', height: '150px'}}>
        <b style={{marginRight: '20px'}} >size full</b>
        <Input size='full' />
      </div>
    </div>
  ))
  .add('placeholder', () => (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <div style={{padding: '20px'}}>
        <b style={{marginRight: '40px'}} >With placeholder</b>
        <Input placeholder='here could be written placeholder text' />
      </div>
      <div style={{padding: '20px'}}>
        <b style={{marginRight: '20px'}} >Without placeholder</b>
        <Input />
      </div>
    </div>
  ))
  .add('type', () => (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <div style={{padding: '20px'}}>
        <b style={{marginRight: '50px'}} >Type text</b>
        <Input type='text' placeholder='text' />
      </div>
      <div style={{padding: '20px'}}>
        <b style={{marginRight: '20px'}} >type password</b>
        <Input type='password' placeholder='qwerty' />
      </div>
      <div style={{padding: '20px'}}>
        <b style={{marginRight: '50px'}} >type email</b>
        <Input type='email' placeholder='example@dogeltech.com' />
      </div>
      <div style={{padding: '20px'}}>
        <b style={{marginRight: '46px'}} >type search</b>
        <Input type='search' placeholder='find' />
      </div>
      <div style={{padding: '20px'}}>
        <b style={{marginRight: '37px'}} >type number</b>
        <Input type='number' placeholder='123456' />
      </div>
    </div>
  ))
  .add('disabled', () => (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <div style={{padding: '20px'}}>
        <b style={{marginRight: '20px'}} >disabled false</b>
        <Input disabled={false} />
      </div>
      <div style={{padding: '20px'}}>
        <b style={{marginRight: '25px'}} >disabled true</b>
        <Input disabled={true} />
      </div>
    </div>
  ))
