import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import { login } from '../../../redux/usersSlice'
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

const schema = yup.object({
    login: yup
        .string()
        .matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,"Incorrect format: @ or . is missed")
        .required('Email is required'),
    password: yup.string().required('Password is required'),
  }).required();

const Login = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, formState:{ errors }, handleSubmit } = useForm({
        resolver: yupResolver(schema)
    });

    const error = useSelector(store => store.usersSlice.error)
    const user = useSelector(store => store.usersSlice.currentUser)

    const onLogin = (data) => {
        dispatch(login({
            email: data.login,
            password: data.password
        }))
    }

    const navigateToHome = () => {
        navigate('/')
    }

    const navigateToRegister = () => {
        navigate('/register')
    }

    useEffect(() => {
        if(user?.id)
            navigateToHome()
    }, [user])

    return (
        <div className={styles.loginFormWrapper}>
            <div className={styles.loginForm}>
                <div className={styles.header}>
                    <p className={styles.headerTitle}>iRoom</p>
                    <p className={styles.headerText}>Room Booking Manager</p>
                </div>
                <form className={styles.form} onSubmit={handleSubmit(onLogin)}>
                    <div className={styles.inputWrapper}>
                        <label className={styles.label} >Email</label>
                        <input className={styles.input} {...register("login")}/>
                        <p className={styles.errorText}>{errors.login?.message}</p>
                    </div>
                    <div className={styles.inputWrapper}>
                        <label className={styles.label}>Password</label>
                        <input className={styles.input} type='password' {...register("password")}/>
                        <p className={styles.errorText}>{errors.password?.message}</p>
                    </div>
                    <button className={styles.button} type="submit">Sign in</button>
                    <p className={styles.errorText}>{error}</p>
                    <div className={styles.subButtonsWrapper}>
                        <p className={styles.subButton} onClick={navigateToRegister}>Sign up</p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login