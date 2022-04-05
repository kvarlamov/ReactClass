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

const divStyle = {
    display: 'inline-block',
    border: '2px solid #ccc',
    boxShadow: '2px 2px 1px #eee',
    padding: '10px',
    marginRight: '10px'
}

export default (props) => (
    <div style={divStyle}>
        <p>This is car-component</p>
        <h3>Car name: {props.name}</h3>
        <h2>Car year: {props.year}</h2>
        {/* like slots in vue */}
        { props.children } 
        {/* <p><strong>1 + 1 = {1 + 1}</strong></p>
        <p>{Math.round(Math.random() * 100)}</p> */}
    </div>
);