import {createSlice} from "@reduxjs/toolkit";
import axios from "../../axios/axios-quiz";

export const quizSlice = createSlice({
    name: 'quiz',
    initialState: {
        quizes: [],
        loading: true,
        error: null
    },
    reducers: {
        fetchQuizesStart: (state) => {
            return {
                ...state, loading: true
            }
        },
        fetchQuizesSuccess: (state, action) => {
            return {
                ...state, 
                loading: false, 
                quizes: action.payload
            }
        },
        fetchQuizesError: (state, action) => {
            return {
                ...state, loading: false, error: action.payload
            }
        }
    }
})

export const { fetchQuizesStart, fetchQuizesSuccess, fetchQuizesError } = quizSlice.actions;

export const fetchQuizesAsync = () => async (dispatch) => {
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

export default quizSlice.reducer;