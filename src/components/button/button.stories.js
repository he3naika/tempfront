import React from 'react';
import { storiesOf } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import Button from './button';

storiesOf('Button', module)
  .addDecorator(story => (
    <BrowserRouter>
      <div style={{textAlign: 'left', backgroundColor: '#b3cccc', minHeight: '100vh', height: '100%', fontFamily: 'Helvetica', fontSize: '18px'}}>
        {story()}
      </div>
    </BrowserRouter>
  ))
  .add('General usage', () => (
    <div style={{padding: '20px'}}>
      <h3>Button can have following props:</h3>
      <div style={{color: '#09224c'}}>
        size:
        <span style={{color: '#c16828'}}> 's' | 'm' | 'l' | 'xl' | 'xxl' | 'full',</span>
      </div>
      <div style={{color: '#09224c'}}>
        shape:
        <span style={{color: '#c16828'}}> 'circle' | 'rounded'</span>
      </div>
      <div style={{color: '#09224c'}}>
        color:
        <span style={{color: '#c16828'}}> 'orange' | 'green' | 'blue' | 'red' | 'grey' | 'purple' | 'white' | ''</span>
      </div>
      <div style={{color: '#09224c'}}>
        label:
        <span style={{color: '#c16828'}}> string <span style={{color: 'black'}}>(limited by 30 symbols)</span></span>
      </div>
      <div style={{color: '#09224c'}}>
        icon:
        <span style={{color: '#c16828'}}>'login' | 'logout' | 'search' | 'info' | 'meters' | 'invoices' | 'movingPremises' | 'faq' | 'show'| 'pdf'</span>
      </div>
      <div style={{color: '#09224c'}}>
        status:
        <span style={{color: '#c16828'}}> 'unclickable' | 'disabled' | 'loading' | 'inactive' | ''</span>
      </div>
      <div style={{color: '#09224c'}}>
        url:
        <span style={{color: '#c16828'}}> string</span>
      </div>
      <div style={{color: '#09224c'}}>
        onClick:
        <span style={{color: '#c16828'}}> Function</span>
      </div>
      <hr />
      <h3>By default Button will have:</h3>
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
        <span style={{color: '#c16828'}}> 'white'</span>
      </div>
      <div style={{color: '#09224c'}}>
        label:
        <span style={{color: '#c16828'}}> empty</span>
      </div>
      <div style={{color: '#09224c'}}>
        onClick:
        <span style={{color: '#c16828'}}>{' () => {}'}</span>
      </div>
      <p>
        If url property will be specified, button will be rendered as {'<Link />'} for local link and as {'<a />'} for external link otherwise it will be {'<button />'}
      </p>
      <p>
        To disable default property you can asign empty value. Example: color=''
      </p>
      <p>
        If icon was specified label will be replaced by icon
      </p>
    </div>
  ))
  .add('default with text', () => (
    <div style={{padding: '20px'}}>
      {"label='OK'"}
      <Button label='OK'/>
    </div>
  ))
  .add('with different colors', () => (
    <div style={{display: 'flex', flexDirection: 'row'}}>
      <div style={{padding: '20px'}}>
        {"<Button label='OK' shape='rounded' color='white'/>"}
        <Button label='OK' shape='rounded' color='white'/>
        <br />
        {"<Button label='OK' shape='rounded' color='green'/>"}
        <Button label='OK' shape='rounded' color='green'/>
        <br />
        {"<Button label='OK' shape='rounded' color='blue'/>"}
        <Button label='OK' shape='rounded' color='blue'/>
        <br />
        {"<Button label='OK' shape='rounded' color='orange'/>"}
        <Button label='OK' shape='rounded' color='orange'/>
        <br />
        {"<Button label='OK' shape='rounded' color='purple'/>"}
        <Button label='OK' shape='rounded' color='purple'/>
        <br />
        {"<Button label='OK' shape='rounded' color='red'/>"}
        <Button label='OK' shape='rounded' color='red'/>
        <br />
        {"<Button label='OK' shape='rounded' color='grey'/>"}
        <Button label='OK' shape='rounded' color='grey'/>
      </div>
    </div>
  ))
  .add('with different colors inversed', () => (
    <div style={{display: 'flex', flexDirection: 'row'}}>
      <div style={{padding: '20px'}}>
        {"<Button label='OK' shape='rounded' color='white' inverse={true}/>"}
        <Button label='OK' shape='rounded' color='white' inverse={true}/>
        <br />
        {"<Button label='OK' shape='rounded' color='green' inverse={true}/>"}
        <Button label='OK' shape='rounded' color='green' inverse={true}/>
        <br />
        {"<Button label='OK' shape='rounded' color='blue' inverse={true}/>"}
        <Button label='OK' shape='rounded' color='blue' inverse={true}/>
        <br />
        {"<Button label='OK' shape='rounded' color='orange' inverse={true}/>"}
        <Button label='OK' shape='rounded' color='orange' inverse={true}/>
        <br />
        {"<Button label='OK' shape='rounded' color='purple' inverse={true}/>"}
        <Button label='OK' shape='rounded' color='purple' inverse={true}/>
        <br />
        {"<Button label='OK' shape='rounded' color='red' inverse={true}/>"}
        <Button label='OK' shape='rounded' color='red' inverse={true}/>
        <br />
        {"<Button label='OK' shape='rounded' color='grey' inverse={true}/>"}
        <Button label='OK' shape='rounded' color='grey' inverse={true}/>
      </div>
    </div>
  ))
  .add('with different sizes', () => (
    <div style={{display: 'flex', flexDirection: 'row'}}>
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <div style={{margin: '20px'}}>
          {"<Button label='OK' size='s' color='green'/>"}
          <div style={{width: '150px', height: '150px', border: '1px black solid'}}>
            <Button label='OK' size='s' color='green'/>
          </div>
        </div>
        <div style={{margin: '20px'}}>
          {"<Button label='OK' size='m' color='green'/>"}
          <div style={{margin: '20px', width: '150px', height: '150px', border: '1px black solid'}}>
            <Button label='OK' size='m' color='green'/>
          </div>
        </div>
        <div style={{margin: '20px'}}>
          {"<Button label='OK' size='l' color='green'/>"}
          <div style={{margin: '20px', width: '180px', height: '180px', border: '1px black solid'}}>
            <Button label='OK' size='l' color='green'/>
          </div>
        </div>
        <div style={{margin: '20px'}}>
          {"<Button label='OK' size='xl' color='green'/>"}
          <div style={{margin: '20px', width: '250px', height: '250px', border: '1px black solid'}}>
            <Button label='OK' size='xl' color='green'/>
          </div>
        </div>
        <div style={{margin: '20px'}}>
          {"<Button label='OK' size='xxl' color='green'/>"}
          <div style={{margin: '20px', width: '300px', height: '300px', border: '1px black solid'}}>
            <Button label='OK' size='xxl' color='green'/>
          </div>
        </div>
        <div style={{margin: '20px'}}>
          {"<Button label='OK' size='full' color='green'/>"}
          <div style={{margin: '20px', width: '400px', height: '200px', border: '1px black solid'}}>
            <Button label='OK' size='full' color='green'/>
          </div>
        </div>
      </div>
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <div style={{margin: '20px'}}>
          {"<Button label='OK' size='s' color='green' shape='circle'/>"}
          <div style={{width: '150px', height: '150px', border: '1px black solid'}}>
            <Button label='OK' size='s' color='green' shape='circle'/>
          </div>
        </div>
        <div style={{margin: '20px'}}>
          {"<Button label='OK' size='m' color='green' shape='circle'/>"}
          <div style={{margin: '20px', width: '150px', height: '150px', border: '1px black solid'}}>
            <Button label='OK' size='m' color='green' shape='circle'/>
          </div>
        </div>
        <div style={{margin: '20px'}}>
          {"<Button label='OK' size='l' color='green' shape='circle'/>"}
          <div style={{margin: '20px', width: '180px', height: '180px', border: '1px black solid'}}>
            <Button label='OK' size='l' color='green' shape='circle'/>
          </div>
        </div>
        <div style={{margin: '20px'}}>
          {"<Button label='OK' size='xl' color='green' shape='circle'/>"}
          <div style={{margin: '20px', width: '200px', height: '200px', border: '1px black solid'}}>
            <Button label='OK' size='xl' color='green' shape='circle'/>
          </div>
        </div>
        <div style={{margin: '20px'}}>
          {"<Button label='OK' size='xxl' color='green' shape='circle'/>"}
          <div style={{margin: '20px', width: '200px', height: '200px', border: '1px black solid'}}>
            <Button label='OK' size='xxl' color='green' shape='circle'/>
          </div>
        </div>
        <div style={{margin: '20px'}}>
          {"<Button label='OK' size='full' color='green' shape='circle'/>"}
          <div style={{margin: '20px', width: '200px', height: '200px', border: '1px black solid'}}>
            <Button label='OK' size='full' color='green' shape='circle'/>
          </div>
        </div>
      </div>
    </div>
  ))
  .add('with different shapes', () => (
    <div style={{display: 'flex', flexDirection: 'row'}}>
      <div style={{padding: '20px'}}>
        {"<Button label='OK' shape='' color='orange'/>"}
        <Button label='OK' shape='' color='orange'/>
        <br />
        {"<Button label='OK' shape='circle' color='blue'/>"}
        <Button label='OK' shape='circle' color='blue'/>
        <br />
        {"<Button label='OK' shape='rounded' color='green'/>"}
        <Button label='OK' shape='rounded' color='green'/>
      </div>
    </div>
  ))
  .add('status unclickable for different colors', () => (
    <div>
      <h1 style={{textAlign: 'center'}}>
        {'Hover it'}
      </h1>
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <div style={{margin: '20px'}}>
          <p>{"<Button label='OK' size='m' shape='rounded' color='orange' status='unclickable'/>"}</p>
          <Button label='OK' size='m' shape='rounded' color='orange' status='unclickable'/>
        </div>
        <div style={{margin: '20px'}}>
          <p>{"<Button label='OK' size='m' shape='rounded' color='green' status='unclickable'/>"}</p>
          <Button label='OK' size='m' shape='rounded' color='green' status='unclickable'/>
        </div>
        <div style={{margin: '20px'}}>
          <p>{"<Button label='OK' size='m' shape='rounded' color='blue' status='unclickable'/>"}</p>
          <Button label='OK' size='m' shape='rounded' color='blue' status='unclickable'/>
        </div>
        <div style={{margin: '20px'}}>
          <p>{"<Button label='OK' size='m' shape='rounded' color='grey' status='unclickable'/>"}</p>
          <Button label='OK' size='m' shape='rounded' color='grey' status='unclickable'/>
        </div>
      </div>
    </div>
  ))
  .add('status disabled for different colors', () => (
    <div>
      <h1 style={{textAlign: 'center'}}>
        {'Hover it'}
      </h1>
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <div style={{margin: '20px'}}>
          <p>{"<Button label='OK' size='m' shape='rounded' color='orange' status='disabled'/>"}</p>
          <Button label='OK' size='m' shape='rounded' color='orange' status='disabled'/>
        </div>
        <div style={{margin: '20px'}}>
          <p>{"<Button label='OK' size='m' shape='rounded' color='green' status='disabled'/>"}</p>
          <Button label='OK' size='m' shape='rounded' color='green' status='disabled'/>
        </div>
        <div style={{margin: '20px'}}>
          <p>{"<Button label='OK' size='m' shape='rounded' color='blue' status='disabled'/>"}</p>
          <Button label='OK' size='m' shape='rounded' color='blue' status='disabled'/>
        </div>
        <div style={{margin: '20px'}}>
          <p>{"<Button label='OK' size='m' shape='rounded' color='grey' status='disabled'/>"}</p>
          <Button label='OK' size='m' shape='rounded' color='grey' status='disabled'/>
        </div>
      </div>
    </div>
  ))
  .add('status loading for different sizes', () => (
    <div>
      <h1 style={{textAlign: 'center'}}>
        {'Hover it'}
      </h1>
      <div style={{display: 'flex'}}>
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <div style={{margin: '20px'}}>
            <p>{"<Button label='OK' size='s' shape='rounded' color='orange' status='loading' />"}</p>
            <Button label='OK' size='s' shape='rounded' color='orange' status='loading' />
          </div>
          <div style={{margin: '20px'}}>
            <p>{"<Button label='OK' size='m' shape='rounded' color='orange' status='loading' />"}</p>
            <Button label='OK' size='m' shape='rounded' color='orange' status='loading' />
          </div>
          <div style={{margin: '20px'}}>
            <p>{"<Button label='OK' size='l' shape='rounded' color='orange' status='loading' />"}</p>
            <Button label='OK' size='l' shape='rounded' color='orange' status='loading' />
          </div>
          <div style={{margin: '20px'}}>
            <p>{"<Button label='OK' size='xl' shape='rounded' color='orange' status='loading' />"}</p>
            <Button label='OK' size='xl' shape='rounded' color='orange' status='loading' />
          </div>
          <div style={{margin: '20px'}}>
            <p>{"<Button label='OK' size='xxl' shape='rounded' color='orange' status='loading' />"}</p>
            <Button label='OK' size='xxl' shape='rounded' color='orange' status='loading' />
          </div>
        </div>
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <div style={{margin: '20px'}}>
            <p>{"<Button label='OK' size='s' shape='circle' color='orange' status='loading' />"}</p>
            <Button label='OK' size='s' shape='circle' color='orange' status='loading' />
          </div>
          <div style={{margin: '20px'}}>
            <p>{"<Button label='OK' size='m' shape='circle' color='orange' status='loading' />"}</p>
            <Button label='OK' size='m' shape='circle' color='orange' status='loading' />
          </div>
          <div style={{margin: '20px'}}>
            <p>{"<Button label='OK' size='l' shape='circle' color='orange' status='loading' />"}</p>
            <Button label='OK' size='l' shape='circle' color='orange' status='loading' />
          </div>
          <div style={{margin: '20px'}}>
            <p>{"<Button label='OK' size='xl' shape='circle' color='orange' status='loading' />"}</p>
            <Button label='OK' size='xl' shape='circle' color='orange' status='loading' />
          </div>
          <div style={{margin: '20px'}}>
            <p>{"<Button label='OK' size='xxl' shape='circle' color='orange' status='loading' />"}</p>
            <Button label='OK' size='xxl' shape='circle' color='orange' status='loading' />
          </div>
        </div>
      </div>
    </div>
  ))
  .add('status inactive for different colors', () => (
    <div>
      <h1 style={{textAlign: 'center'}}>
        {'Hover it'}
      </h1>
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <div style={{margin: '20px'}}>
          <p>{"<Button label='OK' size='m' shape='rounded' color='orange' status='inactive'/>"}</p>
          <Button label='OK' size='m' shape='rounded' color='orange' status='inactive'/>
        </div>
        <div style={{margin: '20px'}}>
          <p>{"<Button label='OK' size='m' shape='rounded' color='green' status='inactive'/>"}</p>
          <Button label='OK' size='m' shape='rounded' color='green' status='inactive'/>
        </div>
        <div style={{margin: '20px'}}>
          <p>{"<Button label='OK' size='m' shape='rounded' color='blue' status='inactive'/>"}</p>
          <Button label='OK' size='m' shape='rounded' color='blue' status='inactive'/>
        </div>
        <div style={{margin: '20px'}}>
          <p>{"<Button label='OK' size='m' shape='rounded' color='grey' status='inactive'/>"}</p>
          <Button label='OK' size='m' shape='rounded' color='grey' status='inactive'/>
        </div>
      </div>
    </div>
  ))
  .add('icons with different colors', () => (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <div style={{margin: '20px'}}>
        <p>{"<Button size='s' shape='circle' color='green' icon='login'/>"}</p>
        <Button size='s' shape='circle' color='green' icon='login'/>
        <Button size='m' shape='circle' color='green' icon='login'/>
        <Button size='l' shape='circle' color='green' icon='login'/>
        <Button size='xl' shape='circle' color='green' icon='login'/>
        <Button size='xxl' shape='circle' color='green' icon='login'/>
      </div>
      <div style={{margin: '20px'}}>
        <p>{"<Button size='s' shape='circle' color='blue' icon='logout'/>"}</p>
        <Button size='s' shape='circle' color='blue' icon='logout'/>
        <Button size='m' shape='circle' color='blue' icon='logout'/>
        <Button size='l' shape='circle' color='blue' icon='logout'/>
        <Button size='xl' shape='circle' color='blue' icon='logout'/>
        <Button size='xxl' shape='circle' color='blue' icon='logout'/>
      </div>
      <div style={{margin: '20px'}}>
        <p>{"<Button size='s' shape='circle' color='green' icon='search'/>"}</p>
        <Button size='s' shape='circle' color='green' icon='search'/>
        <Button size='m' shape='circle' color='green' icon='search'/>
        <Button size='l' shape='circle' color='green' icon='search'/>
        <Button size='xl' shape='circle' color='green' icon='search'/>
        <Button size='xxl' shape='circle' color='green' icon='search'/>
      </div>
      <div style={{margin: '20px'}}>
        <p>{"<Button size='s' shape='circle' icon='info'/>"}</p>
        <Button size='s' shape='circle' icon='info'/>
        <Button size='m' shape='circle' icon='info'/>
        <Button size='l' shape='circle' icon='info'/>
        <Button size='xl' shape='circle' icon='info'/>
        <Button size='xxl' shape='circle' icon='info'/>
      </div>
      <div style={{margin: '20px'}}>
        <p>{"<Button size='s' shape='circle' color='blue' icon='meters'/>"}</p>
        <Button size='s' shape='circle' color='blue' icon='meters'/>
        <Button size='m' shape='circle' color='blue' icon='meters'/>
        <Button size='l' shape='circle' color='blue' icon='meters'/>
        <Button size='xl' shape='circle' color='blue' icon='meters'/>
        <Button size='xxl' shape='circle' color='blue' icon='meters'/>
      </div>
      <div style={{margin: '20px'}}>
        <p>{"<Button size='s' shape='circle' color='green' icon='invoices'/>"}</p>
        <Button size='s' shape='circle' color='green' icon='invoices'/>
        <Button size='m' shape='circle' color='green' icon='invoices'/>
        <Button size='l' shape='circle' color='green' icon='invoices'/>
        <Button size='xl' shape='circle' color='green' icon='invoices'/>
        <Button size='xxl' shape='circle' color='green' icon='invoices'/>
      </div>
      <div style={{margin: '20px'}}>
        <p>{"<Button size='s' shape='circle' color='green' icon='movingPremises'/>"}</p>
        <Button size='s' shape='circle' color='green' icon='movingPremises'/>
        <Button size='m' shape='circle' color='green' icon='movingPremises'/>
        <Button size='l' shape='circle' color='green' icon='movingPremises'/>
        <Button size='xl' shape='circle' color='green' icon='movingPremises'/>
        <Button size='xxl' shape='circle' color='green' icon='movingPremises'/>
      </div>
      <div style={{margin: '20px'}}>
        <p>{"<Button size='s' shape='circle' color='grey' icon='premises'/>"}</p>
        <Button size='s' shape='circle' color='grey' icon='premises'/>
        <Button size='m' shape='circle' color='grey' icon='premises'/>
        <Button size='l' shape='circle' color='grey' icon='premises'/>
        <Button size='xl' shape='circle' color='grey' icon='premises'/>
        <Button size='xxl' shape='circle' color='grey' icon='premises'/>
      </div>
      <div style={{margin: '20px'}}>
        <p>{"<Button size='s' shape='circle' color='green' icon='faq'/>"}</p>
        <Button size='s' shape='circle' color='green' icon='faq'/>
        <Button size='m' shape='circle' color='green' icon='faq'/>
        <Button size='l' shape='circle' color='green' icon='faq'/>
        <Button size='xl' shape='circle' color='green' icon='faq'/>
        <Button size='xxl' shape='circle' color='green' icon='faq'/>
      </div>
      <div style={{margin: '20px'}}>
        <p>{"<Button size='s' shape='circle' color='green' icon='show'/>"}</p>
        <Button size='s' shape='circle' color='green' icon='show'/>
        <Button size='m' shape='circle' color='green' icon='show'/>
        <Button size='l' shape='circle' color='green' icon='show'/>
        <Button size='xl' shape='circle' color='green' icon='show'/>
        <Button size='xxl' shape='circle' color='green' icon='show'/>
      </div>
      <div style={{margin: '20px'}}>
        <p>{"<Button size='s' shape='circle' color='orange' icon='pdf'/>"}</p>
        <Button size='s' shape='circle' color='orange' icon='pdf'/>
        <Button size='m' shape='circle' color='orange' icon='pdf'/>
        <Button size='l' shape='circle' color='orange' icon='pdf'/>
        <Button size='xl' shape='circle' color='orange' icon='pdf'/>
        <Button size='xxl' shape='circle' color='orange' icon='pdf'/>
      </div>
    </div>
  ))
  .add('with action', () => (
    <div style={{padding: '20px'}}>
      <p>
        {"<Button label='click me' size='m' shape='rounded' color='green' onClick={() => {alert('it work\'s!')}}/>"}
      </p>
      <Button label='click me' size='m' shape='rounded' color='green' onClick={() => {alert('it work\'s!')}}/>
    </div>
  ))
  .add('with url', () => (
    <div style={{padding: '20px'}}>
      {"label='OK'"}
      <Button label='OK'/>
      <br />
      {"label='OK' url='/'"}
      <Button label='OK' url='/'/>
      <br />
      {"label='OK' url='http://www.yandex.ru'"}
      <Button label='OK' url='http://www.yandex.ru'/>
    </div>
  ))
