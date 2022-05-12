import React from 'react';
import ReactDOM, {createRoot} from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router} from "react-router-dom";
import store from "./redux/store";
import {Provider} from "react-redux";

const application = (
    <Provider store={store}>
        <Router>
            <App/>
        </Router>
    </Provider>    
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(application);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


//TODO: IMPORTANT: TO ADD CONFIG FOLDER: npm run eject
