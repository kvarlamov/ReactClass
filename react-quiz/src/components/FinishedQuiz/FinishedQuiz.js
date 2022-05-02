import React from "react";
import classes from './FinishedQuiz.module.css';
import Button from "../UI/Button/Button";
import 'font-awesome/css/font-awesome.min.css'

const FinishedQuiz = props => {
    const successCount = Object.keys(props.results).reduce((total, current) => {
        if (props.results[current] === 'success') {
            total++;
        }

        return total;
    }, 0);

    return (
        <div className={classes.FinishedQuiz}>
            <ul>
                {props.quiz.map((quizItem, index) => {
                    const cls = [
                        'fa',
                        props.results[quizItem.id] === 'error' ? 'fa-times' : 'fa-check',
                        classes[props.results[quizItem.id]]
                    ]
                    return (
                        <li key={index}>
                            <strong>{index + 1}</strong>.&nbsp;
                            {quizItem.question}
                            <i className={cls.join(' ')}/>
                        </li>
                    )
                })}
            </ul>
            <p>Right answers {successCount} from {props.quiz.length} </p>
            <div>
                <Button onClick={props.onRetry} type='primary'>Repeat</Button>
                <Button type='primary'>Go to test list</Button>
            </div>
        </div>
    );
}

export default FinishedQuiz;