import React, { Component } from 'react';
import './App.css';
import Car from './Car/Car';

class App extends Component {
  render() {
    const divStyle = {
      textAlign: 'left',
      marginLeft: '20px'
    };

    return (
      <div className="App" style={divStyle}>
        <h1 style={{color: 'blue', fontSize: '20px'}}>Hello World!!!</h1>
        <Car name={'Ford'} year={2018}>
          <p style={{color: 'red'}}>COLOR</p>
        </Car>
        <Car name='Audi' year={2016}/>
      </div>
    );

    // return React.createElement(
    //   'div',
    //   {
    //     className: 'App'
    //   },
    //   React.createElement(
    //     'h1',
    //     null,
    //     'hello world!!!'
    //   )
    // )
  }
}

export default App;
