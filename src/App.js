import React, { Component } from 'react';
import Home from './components/home';
import content from './components/content';
import design from './components/design';
import marketing from './components/marketing';
import programming from './components/programming';


// import MyFancyComponent from './components/map&chartDemo';
import './App.css';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom'






class App extends Component {




  render() {



    return (

      <div className ="wholeapp" >



        <Route exact={true} path="/" component={Home} />
        <Route path="/content" component={content} />
        <Route path="/design" component={design} />
        <Route path="/marketing" component={marketing} />
        <Route path="/programming" component={programming} />




      
       

        







      </div>


    );
  }
}

export default App;

