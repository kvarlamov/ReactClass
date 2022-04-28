import React, { Component } from 'react'
import './App.scss'
import Car from '../../Components/src/Car/Car'
import ErrorBoundary from './ErrorBoundary/ErrorBoundary'
import Counter from "./Counter/Counter";

//allow to share context through application without nested components
export const ClickedContext = React.createContext(false)

class App extends Component {

  constructor(props) {
    super(props);
    console.log('App constructor');

    this.state = {
      cars: [
        {name: 'Ford', year: 2018},
        {name: 'Audi', year: 2016},
        {name: 'Mazda', year: 2010}
      ],
      pageTitle: 'React components',
      showCars: false
    }
  }

  toggleCarsHandler = () => {
    this.setState({
      showCars: !this.state.showCars
    })
  }

  onChangeName(name, index) {
    const car = this.state.cars[index]
    car.name = name
    const cars = [...this.state.cars]
    cars[index] = car
    this.setState({cars})
  }

  deleteHandler(index) {
    const cars = this.state.cars.concat()
    cars.splice(index, 1)

    this.setState({cars})
  }

  componentDidMount() {
    console.log('App componentDidMount');
  }

  render() {
    console.log('App render');
    const divStyle = {
      textAlign: 'center'
    }

    let cars = null

    if (this.state.showCars) {
      cars = this.state.cars.map((car, index) => {
        return (
          <ErrorBoundary key={index}>
            <Car              
              name={car.name}
              year={car.year}
              onDelete={this.deleteHandler.bind(this, index)}
              onChangeName={event => this.onChangeName(event.target.value, index)}
            />
          </ErrorBoundary>
        )
      })
    }

    return (
      <div style={divStyle}>
        {/*<h1>{this.state.pageTitle}</h1>*/}
        <h1>{this.props.title}</h1>

        //allow to share context through application without nested components
        <ClickedContext.Provider value={this.state.clicked2}>
          <Counter />
        </ClickedContext.Provider>
        <Counter clicked={this.state.clicked}/>
        <br/>

        <button
          className={'AppButton'}
          onClick={this.toggleCarsHandler}
        >Toggle cars</button>

        <button onClick={() => this.setState({clicked: !this.state.clicked})}>Change clicked</button>
        <button onClick={() => this.setState({clicked2: !this.state.clicked2})}>Change clicked2</button>

        <div style={{
          width: 400,
          margin: 'auto',
          paddingTop: '20px'
        }}>
          { cars }
        </div>
      </div>
    );
  }
}

export default App
