import React, {Component} from 'react'
import './App.scss'
import {Counter} from "./counter/Counter";

class App extends Component {  

  render() {
    return (
      <div className={'App'}>
        <Counter />
      </div>
    )
  }
}

export default App
