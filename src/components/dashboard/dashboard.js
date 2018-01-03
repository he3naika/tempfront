import React, { Component } from 'react';
import Button from '../button/button';
import './dashboard.css';

export default class Dashboard extends Component{
  render(){
    return(
      <div className='dashboard__container'>
        <a href='/info'>
          <div className='dashboard__tile dashboard__tile-info'>
            <h1>My Information</h1>
            <p>View your account information</p>
            <div className='dashboard__tile-icon'>
              <Button color='grey' shape='circle' size='xl' icon='info' status='unclickable' />
            </div>
          </div>
        </a>
        <a href='/premises'>
          <div className='dashboard__tile dashboard__tile-premises'>
            <h1>My Premises</h1>
            <p>View your premises details</p>
            <div className='dashboard__tile-icon'>
              <Button color='grey' shape='circle' size='xl' icon='premises' status='unclickable' />
            </div>
          </div>
        </a>
        <a href='/meters'>
          <div className='dashboard__tile dashboard__tile-meters'>
            <h1>My Meters</h1>
            <p>View and submit your meter readings</p>
            <div className='dashboard__tile-icon'>
              <Button color='grey' shape='circle' size='xl' icon='meters' status='unclickable' />
            </div>
          </div>
        </a>
        <a href='/invoices'>
          <div className='dashboard__tile dashboard__tile-invoices'>
            <h1>My Invoices</h1>
            <p>View your previous and outstanding bills</p>
            <div className='dashboard__tile-icon'>
              <Button color='grey' shape='circle' size='xl' icon='invoices' status='unclickable' />
            </div>
          </div>
        </a>
        <a href='https://www.castlewater.co.uk/faq/'>
          <div className='dashboard__tile dashboard__tile-faq'>
            <h1>FAQs</h1>
            <p>View our frequently asked questions</p>
            <div className='dashboard__tile-icon'>
              <Button color='grey' shape='circle' size='xl' icon='faq' status='unclickable' />
            </div>
          </div>
        </a>
        <a href='https://www.castlewater.co.uk/moving-in-moving-out/'>
          <div className='dashboard__tile dashboard__tile-moving-premises'>
            <h1>Moving Premises</h1>
            <p>Let us know your new business address</p>
            <div className='dashboard__tile-icon'>
              <Button color='grey' shape='circle' size='xl' icon='movingPremises' status='unclickable' />
            </div>
          </div>
        </a>
      </div>
    );
  };
};
