import React from 'react'
import './Car.scss'
import {useNavigate} from 'react-router-dom';


const Car = props => {
  const navigate = useNavigate();
  return (
    <div
        className={'Car'}
        onClick={() => navigate('/cars/' + props.name.toLowerCase())}
    >
      <h3>Сar name: {props.name}</h3>
      <p>Year: <strong>{props.year}</strong></p>
    </div>
  )
}

export default Car