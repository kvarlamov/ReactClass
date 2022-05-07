const redux = require('redux');
const reduxStore = require('@reduxjs/toolkit')

//initial state of app - first starting
const initialState = {
    counter: 0
}

//Reducer
const reducer = (state = initialState, action) => {
    
    return state;
}


//Store - place where save state (all states from application)
const store = reduxStore.configureStore(reducer);


//Actions
