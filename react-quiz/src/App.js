import React, {Component} from "react";
import Layout from "./hoc/Layout/Layout";
import Quiz from "./containers/Quiz/Quiz";
import QuizCreator from "./containers/QuizCreator/QuizCreator";
import QuizList from "./containers/QuizList/QuizList";
import Auth from "./containers/Auth/Auth";
import {Route, Routes, NavLink, Navigate} from 'react-router-dom'

class App extends Component{
  render() {

    return (
        <Layout>
            <Routes>
                <Route path='/auth' exact element={<Auth/>}/>
                <Route path='/quiz-creator' exact element={<QuizCreator/>}/>
                <Route path='/quiz/:id' exact element={<Quiz/>}/>
                <Route path='/' exact element={<QuizList/>}/>
            </Routes>
        </Layout>
    );
  }
}

export default App;
