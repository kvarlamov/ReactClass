import React, {Component} from "react";
import classes from './Quiz.module.css'
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";

class Quiz extends Component{
    state = {
        results: {}, //results {[id]: 'success/error'}
        activeQuestion: 0,
        answerState: null,
        isFinished: false,
        quiz: [
            {
                question: 'What color is black hole?',
                id: 1,
                rightAnswerId:1,
                answers: [
                    {text: 'Black', id: 1},
                    {text: 'Blue', id: 2},
                    {text: 'White', id: 3},
                    {text: 'Yellow', id: 4}
                ]
            },
            {
                question: 'Which color russian flag dont have?',
                id: 2,
                rightAnswerId:4,
                answers: [
                    {text: 'Red', id: 1},
                    {text: 'Blue', id: 2},
                    {text: 'White', id: 3},
                    {text: 'Yellow', id: 4}
                ]
            }
        ]
    }

    onAnswerClickHandler = (answerId) => {
        if (this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0];
            if (this.state.answerState[key] === 'success'){
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
                } else{
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null
                    });
                }

                window.clearTimeout(timeout);
            }, 1000);
        } else {
            console.log('question id ' ,question.id);
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

    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Answer all questions</h1>
                    {this.state.isFinished
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