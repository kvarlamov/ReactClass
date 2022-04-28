import React, { Component } from 'react';
import './App.css';
import Car from './Car/Car';
import Counter from '../../Components/src/Counter/Counter'

class App extends Component {

  state = {
    cars: [
      {name: 'Ford', year: 2018},
      {name: 'Audi', year: 2016}
    ],
    title: 'Hello, REACT',
    showCars: false
  }

  changeTitleHandler = (title) => {
    this.setState({title})
  }

  changeTitleFromInput = (event) => {
    this.setState({title: event.target.value})
  }

  toggleCars = () => {
    this.setState({showCars: !this.state.showCars})
  }

  changeNameHandler(name, index) {
    const car = this.state.cars[index];
    car.name = name;
    const cars = [...this.state.cars];
    cars[index] = car;
    this.setState({cars});
  }

  onDelete(index) {
    console.log(index);
    const cars = [...this.state.cars];
    cars.splice(index, 1);
    this.setState({cars});
  }

  onAdd() {
    const name = document.getElementById('new-car-name').value;
    const year = document.getElementById('new-car-year').value;
    console.log(name);
    const newCar = {
      name: name,
      year: year
    }
    const cars = [...this.state.cars];
    cars.push(newCar);
    this.setState({cars});
  }

  render() {
    const divStyle = {
      textAlign: 'left',
      marginLeft: '20px'
    };    

    const cars = this.state.cars;

    //Alternative way of IF
    let carsDiv = null;

    if (this.state.showCars) {
      carsDiv = this.state.cars.map((c, index) => {
        return (
          <Car key={index} 
                name={c.name} 
                year={c.year} 
                onChangeName={event => this.changeNameHandler(event.target.value, index)}
                onDelete={this.onDelete.bind(this, index)}
                 />
        )
      })
    }
    //and after that put this variable carsDiv to {} in return 
    //Alternative way of IF

    return (
      <div className="App" style={divStyle}>
        <h1 style={{color: 'blue', fontSize: '20px'}}>{this.state.title}</h1>
        <br/>
        <input type="text" onChange={this.changeTitleFromInput}/>
        <button style={{display: 'block'}} onClick={this.changeTitleHandler.bind(this, 'changed')}>Change title</button>
        <br/>

        <hr/>
        <input type="text" placeholder='car name' id='new-car-name'/>
        <input type="text" placeholder='car year' id='new-car-year'/>
        <button onClick={this.onAdd.bind(this)}>Add new Car</button>
        <hr/>


       <button style={{display: 'block'}} onClick={this.toggleCars}>Toggle cars</button>
       <div style={{width: 800, margin: 'auto', paddingTop: '20px'}}>
        {
          carsDiv
          //below we can't you if, only ternary
          //  this.state.showCars 
          //  ? this.state.cars.map((c, index) => {
          //     return (
          //       <Car key={index} 
          //             name={c.name} 
          //             year={c.year} 
          //             onChangeTitle={this.changeTitleHandler.bind(this, c.name)} />
          //     )
          //   })
          //  : null
        }
       </div>        
        {/* <Car 
          name={cars[0].name} 
          year={cars[0].year}
          onChangeTitle={this.changeTitleHandler.bind(this, cars[0].name)} //bind faster than **
          >
          <p style={{color: 'red'}}>COLOR</p>
        </Car>
        <Car 
          name={cars[1].name} 
          year={cars[1].year}
          onChangeTitle={() => this.changeTitleHandler(cars[1].name)} //** second wayto pass params
          /> */}
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
