import React, {Component, useState} from "react";
import classes from './Auth.module.css'
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import axios from "axios";

const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

export const Auth = () => {

    const [isFormValid, setFormValid] = useState(false);
    const [formControlsState, setFormControlsState] = useState({
        email: {
            value: '',
            type: 'email',
            label: 'Email',
            errorMessage: 'Input correct email',
            valid: false,
            touched: false,
            validation: {
                required: true,
                email: true
            }
        },
        password: {
            value: '',
            type: 'password',
            label: 'Password',
            errorMessage: 'Input correct password',
            valid: false,
            touched: false,
            validation: {
                required: true,
                minLength: 6
            }
        }
    });

    const submitHandler = event => {
        event.preventDefault();
    }

    const loginHandler = async () => {
        const authData = {
            email: formControlsState.email.value,
            password: formControlsState.password.value,
            returnSecureToken: true
        }
        try {
            const response = axios.post("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC9skS0mh5X7OXZaOcTvf_91YqRju6ZD6U", authData);
            console.log(response);
        } catch (e) {
            console.log(e);
        }
    }

    const registerHandler = async () => {
        const authData = {
            email: formControlsState.email.value,
            password: formControlsState.password.value,
            returnSecureToken: true
        }
        try {
            const response = axios.post("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC9skS0mh5X7OXZaOcTvf_91YqRju6ZD6U", authData);
            console.log(response);
        } catch (e) {
            console.log(e);
        }
    }

    const validateControl = (value, validation) => {
        if (!validation)
            return true;

        let isValid = true;

        if (validation.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (validation.email) {
            isValid = validateEmail(value) && isValid;
        }

        if (validation.minLength) {
            isValid = value.length >= validation.minLength && isValid;
        }

        return isValid;
    }

    const onChangeHandler = (event, controlName) => {
        const formControls = {...formControlsState};
        const control = {...formControls[controlName]}

        control.value = event.target.value;
        control.touched = true;
        control.valid = validateControl(control.value, control.validation);

        formControls[controlName] = control;

        let isFormValid = true;

        Object.keys(formControls).forEach(name => {
            isFormValid = formControls[name].valid && isFormValid
        });

        setFormControlsState(formControls);
        setFormValid(isFormValid);
    }

    const renderInputs = () => {
        return Object.keys(formControlsState).map((controlName, index) => {
            const control = formControlsState[controlName];
            return (
                <Input
                    key={controlName + index}
                    type={control.type}
                    value={control.value}
                    valid={control.valid}
                    touched={control.touched}
                    label={control.label}
                    errorMessage={control.errorMessage}
                    shouldValidate={!!control.validation}
                    onChange={event => onChangeHandler(event, controlName)}
                />
            )
        })
    }


    return (
        <div className={classes.Auth}>
            <div>
                <h1>Authorization</h1>
                <form onSubmit={submitHandler}>
                    {renderInputs()}
                    <Button
                        type="success"
                        onClick={loginHandler}
                        disabled={!isFormValid}
                    >Login</Button>
                    <Button
                        type="primary"
                        onClick={registerHandler}
                        disabled={!isFormValid}
                    >Register</Button>
                </form>
            </div>
        </div>);
};