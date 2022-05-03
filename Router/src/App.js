import React, {Component} from 'react'
import './App.scss'
import {Route, Routes, NavLink, Navigate} from 'react-router-dom'
import About from './About/About'
import Cars from './Cars/Cars'
import CarDetail from "./CarDetail/CarDetail";


//***NPM INSTALL react-router-dom
class App extends Component {

    state = {
        isLoggedIn: false
    }

    render() {

        return (
            <div>
                <nav className="nav">
                    <ul>
                        <li>
                            <NavLink to="/">Home</NavLink>
                        </li>
                        <li>
                            <NavLink to='/cars'>Cars</NavLink>
                        </li>
                        <li>
                            <NavLink to={{
                                pathname: '/about',
                                search: '?a=1&b=2',
                                hash: 'wfm-hash'
                            }}
                            >About</NavLink>
                        </li>
                    </ul>
                </nav>

                <hr/>
                <div style={{textAlign: 'center'}}>
                    <h3>Is logged in {this.state.isLoggedIn ? 'TRUE' : 'FALSE'}</h3>
                    <button onClick={() => this.setState({isLoggedIn: true})}>Login</button>
                </div>
                <hr/>

                <Routes>
                    <Route path="/" exact element={<h1>Default Page Content</h1>}/>
                    {this.state.isLoggedIn ? <Route path="/about" exact element={<About/>}/> : null}
                    <Route path="/cars" exact element={<Cars/>}/>
                    <Route path="/cars/:name" exact element={<CarDetail/>}/>
                    <Route path={'/test'} element={<Navigate to='/'/>}/>
                    <Route path='*' element={<h1 style={{color: 'red', textAlign: 'center'}}>404 not found</h1>}/>
                </Routes>
            </div>
        );
    }
}

export default App
