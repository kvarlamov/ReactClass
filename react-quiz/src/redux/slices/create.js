import {createSlice} from "@reduxjs/toolkit";
import axios from "../../axios/axios-quiz";

export const create = createSlice({
    name: 'create',
    initialState: {
        quiz: []
    },
    reducers: {
        createQuizQuestion: (state, action) => {
            state.quiz.push(action.payload);
        },
        finishCreateQuiz: (state, action) => {
            //todo - add createAsyncThunk
            axios.post('quizes.json', state.quiz);
            state.quiz = [];
        },
        // resetQuizCreation: (state) => {
        //     state.quiz = [];
        // }
    }
});

export const {createQuizQuestion, finishCreateQuiz} = create.actions;

export default create.reducer;