import React, { useEffect } from 'react'
import styles from './styles.module.css'
import { register as registerCall } from '../../../redux/usersSlice'
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

const schema = yup.object({
    email: yup
        .string()
        .matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,"Invalid email format")
        .required('Email is required'),
    password: yup.string().required('Password is required'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Confirm password is required'),
  }).required();

const Register = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, formState:{ errors }, handleSubmit } = useForm({
        resolver: yupResolver(schema)
    });

    const error = useSelector(store => store.usersSlice.error)
    const user = useSelector(store => store.usersSlice.currentUser)

    const onRegister = (data) => {
        dispatch(registerCall({
            email: data.email,
            password: data.password
        }))
    }

    const navigateToHome = () => {
        navigate('/')
    }

    const navigateToLogin = () => {
        navigate('/login')
    }

    useEffect(() => {
        console.log(user)
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
                <form className={styles.form} onSubmit={handleSubmit(onRegister)}>
                    <div className={styles.inputWrapper}>
                        <label className={styles.label} >Email</label>
                        <input className={styles.input} {...register("email")}/>
                        <p className={styles.errorText}>{errors.email?.message}</p>
                    </div>
                    <div className={styles.inputWrapper}>
                        <label className={styles.label}>Password</label>
                        <input className={styles.input} type="password" {...register("password")}/>
                        <p className={styles.errorText}>{errors.password?.message}</p>
                    </div>
                    <div className={styles.inputWrapper}>
                        <label className={styles.label}>Confirm password</label>
                        <input className={styles.input} type="password" {...register("confirmPassword")}/>
                        <p className={styles.errorText}>{errors.confirmPassword?.message}</p>
                    </div>
                    <button className={styles.button} type="submit">Sign up</button>
                    <p className={styles.errorText}>{error}</p>
                    <div className={styles.subButtonsWrapper}>
                        <p className={styles.subButton} onClick={navigateToLogin}>Sign in</p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register