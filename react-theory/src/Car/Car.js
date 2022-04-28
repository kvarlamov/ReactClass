/* eslint-disable import/no-anonymous-default-export */
// function Car() {
//     return (
//         <h2>This is car-component</h2>
//     )
// }

// const car = () => {
//     return (
//         <h2>This is car-component</h2>
//     )
// }

// const car = () => (
// <div>
//     This is car-component
//     <strong>test</strong>
// </div>
// )

// export default car;

import './Car.css';

export default (props) => {
        const inputClasses = ['input'];
        let entered = false;

        if (props.name !== '') {
            inputClasses.push('green');
        } else {
            inputClasses.push('red');
        }

        let style = {
            border: '2px solid #ccc',
            boxShadow: '2px 2px 1px #eee'
        }
    
        return (
        <div className="Car" 
            style={style} >
            <p>This is car-component</p>
            <h3>Car name: {props.name}</h3>
            <h2>Car year: {props.year}</h2>
            {/* like slots in vue */}
            { props.children } 
            {/* <p><strong>1 + 1 = {1 + 1}</strong></p>
            <p>{Math.round(Math.random() * 100)}</p> */}
            <input 
                type='text' 
                onChange={props.onChangeName} 
                value={props.name}
                className={inputClasses.join(' ')} />
            <button onClick={props.onDelete}>Delete</button>
        </div>);
    }