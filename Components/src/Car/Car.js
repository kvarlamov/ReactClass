import React from 'react'
import './Car.css'
import withClass from "../hoc/withClass";
import PropTypes from 'prop-types';

class Car extends React.Component {

  constructor(props) {
    super(props);

    this.inputRef = React.createRef(); //if we use this we use just this.inputRef instead of callback in input, and in did mount this.inputRef.current.focus()
  }
  
  componentWillReceiveProps(nextProps) {
    console.log('Car componentWillReceiveProps ', nextProps)
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('Car shouldComponentUpdate ', nextProps, nextState);
    return nextProps.name.trim() !== this.props.name.trim(); //if return false - we won't render component
  }

  componentWillUpdate(nextProps, nextState) {
    console.log('Car componentWillUpdate ', nextProps, nextState)
  }

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   console.log('Car getDerivedStateFromProps', nextProps, prevState)

  //   return prevState
  // }

  componentDidUpdate() {
    console.log('Car componentDidUpdate ')
  }

  // getSnapshotBeforeUpdate() {
  //   console.log('Car getSnapshotBeforeUpdate')
  // }

  componentDidMount() {
    this.inputRef.focus();
  }

  componentWillUnmount() {
    console.log('Car will unmount');
  }
  
  render() {
    console.log('CAr render')
    const inputClasses = ['input']

    // if (Math.random() > 0.7)
    //   throw new Error('some error')

    if (this.props.name !== '') {
      inputClasses.push('green')
    } else {
      inputClasses.push('red')
    }

    if (this.props.name.length > 4) {
      inputClasses.push('bold')
    }

    return (
      <React.Fragment>
        <h3>Сar name: {this.props.name}</h3>
        <p>Year: <strong>{this.props.year}</strong></p>
        <input
          ref={(inputRef) => this.inputRef = inputRef}
          type="text"
          onChange={this.props.onChangeName}
          value={this.props.name}
          className={inputClasses.join(' ')}
        />
        <button onClick={this.props.onDelete}>Delete</button>
      </React.Fragment>
    )
  }
}

Car.propTypes = {
  name: PropTypes.string.isRequired,
  year: PropTypes.number,
  onChangeName: PropTypes.func,
  onDelete: PropTypes.func
}

export default withClass(Car, 'Car')