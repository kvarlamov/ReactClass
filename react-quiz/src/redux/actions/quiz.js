import axios from "../../axios/axios-quiz";
import {
    FETCH_QUIZ_SUCCESS,
    FETCH_QUIZES_ERROR,
    FETCH_QUIZES_START,
    FETCH_QUIZES_SUCCESS, FINISH_QUIZ, QUIZ_NEXT_QUESTION, QUIZ_RETRY,
    QUIZ_SET_STATE
} from "./actionTypes";

//such function call action creator
function fetchQuizesStart() {
    return {
        type: FETCH_QUIZES_START
    }
}

//such function call action creator
function fetchQuizesSuccess(quizes) {
    return {
        type: FETCH_QUIZES_SUCCESS,
        quizes: quizes
    }
}

//such function call action creator
function fetchQuizesError(e) {
    return {
        type: FETCH_QUIZES_ERROR,
        error: e
    }
}

function fetchQuizSuccess(quiz) {
    return {
        type: FETCH_QUIZ_SUCCESS,
        quiz: quiz
    };
}

function quizSetState(answerState, results) {
    return {
        type: QUIZ_SET_STATE,
        answerState,
        results
    }
}

function finishQuiz() {
    return {
        type: FINISH_QUIZ
    }
}

function quizNextQuestion(activeQuestion) {
    return {
        type: QUIZ_NEXT_QUESTION,
        activeQuestion
    }
}

function isQuizFinished(state) {
    console.log('isQuizFinished');
    return state.activeQuestion + 1 >= state.quiz.length
}

export function retryQuiz() {
    return {
        type: QUIZ_RETRY
    }
}

//***********************************************************

export function fetchQuizesAsync() {
    return async dispatch => {
        dispatch(fetchQuizesStart());
        try {
            const response = await axios.get('quizes.json');
            const quizes = [];
            Object.keys(response.data).forEach((key, index) => {
                quizes.push({
                    id: key,
                    name: `Test №${index + 1}`
                })
            })
            dispatch(fetchQuizesSuccess(quizes))
        } catch (e) {
            dispatch(fetchQuizesError(e))
        }
    }
}

export function fetchQuizById(quizId) {
    return async dispatch => {
        dispatch(fetchQuizesStart());
        try {
            const quiz = await axios.get(`quizes/${quizId}.json`);
            dispatch(fetchQuizSuccess(quiz.data));

        } catch (e) {
            dispatch(fetchQuizesError(e));
        }
    }
}

export function quizAnswerClick(answerId) {
    return (dispatch, getState) => {        
        const state = getState().quiz;
        if (state.answerState) {
            const key = Object.keys(state.answerState)[0];
            if (state.answerState[key] === 'success') {
                return;
            }
        }
        //current question
        const question = state.quiz[state.activeQuestion];
        const results = {...state.results};
        if (answerId === question.rightAnswerId) {
            if (!results[question.id]) {
                results[question.id] = 'success';
            }

            dispatch(quizSetState({[answerId]: 'success'}, results));

            const timeout = window.setTimeout(() => {
                if (isQuizFinished(state)) {
                    dispatch(finishQuiz());
                } else {
                    dispatch(quizNextQuestion(state.activeQuestion + 1));
                }

                window.clearTimeout(timeout);
            }, 1000);
        } else {
            console.log('question id ', question.id);
            results[question.id] = 'error';
            dispatch(quizSetState({[answerId]: 'error'}, results));
        }
    }
}