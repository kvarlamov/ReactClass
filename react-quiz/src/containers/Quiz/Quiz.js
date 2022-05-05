import React, {Component} from "react";
import classes from './Quiz.module.css'
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import axios from "../../axios/axios-quiz";
import Loader from "../../components/UI/Loader/Loader";

class Quiz extends Component {
    state = {
        results: {}, //results {[id]: 'success/error'}
        activeQuestion: 0,
        answerState: null,
        isFinished: false,
        quiz: [],
        loading: true
    }

    onAnswerClickHandler = (answerId) => {
        if (this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0];
            if (this.state.answerState[key] === 'success') {
                return;
            }
        }

        //current question
        const question = this.state.quiz[this.state.activeQuestion];
        const results = this.state.results;
        if (answerId === question.rightAnswerId) {
            if (!results[question.id]) {
                results[question.id] = 'success';
            }

            this.setState({
                answerState: {[answerId]: 'success'},
                results
            })

            const timeout = window.setTimeout(() => {
                if (this.isQuizFinished()) {
                    this.setState({isFinished: true});
                    console.log('FINISHED')
                } else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null
                    });
                }

                window.clearTimeout(timeout);
            }, 1000);
        } else {
            console.log('question id ', question.id);
            results[question.id] = 'error';
            this.setState({
                answerState: {[answerId]: 'error'},
                results
            })

        }
    }
    onRetryHandler = () => {
        this.setState({
            activeQuestion: 0,
            answerState: null,
            isFinished: false,
            results: {}
        })
    }

    isQuizFinished() {
        return this.state.activeQuestion + 1 >= this.state.quiz.length
    }

    async componentDidMount() {
        const pathname = window.location.pathname;
        const id = pathname.substring(pathname.lastIndexOf('/') + 1);
        try {
            const quiz = await axios.get(`quizes/${id}.json`);
            this.setState({
                quiz: quiz.data,
                loading: false
            })
        } catch (e) {
            console.log(e);
        }


    }

    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Answer all questions</h1>

                    {
                        this.state.loading
                            ? <Loader/>
                            : this.state.isFinished
                                ? <FinishedQuiz
                                    results={this.state.results}
                                    quiz={this.state.quiz}
                                    onRetry={this.onRetryHandler}
                                />
                                : <ActiveQuiz
                                    answers={this.state.quiz[this.state.activeQuestion].answers}
                                    question={this.state.quiz[this.state.activeQuestion].question}
                                    onAnswerClick={this.onAnswerClickHandler}
                                    quizLength={this.state.quiz.length}
                                    quizNumber={this.state.activeQuestion + 1}
                                    state={this.state.answerState}
                                />
                    }
                </div>
            </div>
        );
    }
}

export default Quiz;