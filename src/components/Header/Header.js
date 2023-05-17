import React from "react";
import styles from "./styles.module.css"
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/usersSlice";

const Header = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector(store => store.usersSlice.currentUser)
    const isAdmin = user?.isAdmin

    const navigateToHome = () => {
        navigate('/')
    }

    const navigateToAdminPanel = () => {
        navigate('/admin')
    }

    const navigateToLogin = () => {
        navigate('/login')
    }

    const onAuthButtonClick = () => {
        if(user){
            dispatch(logout())
            navigateToLogin()
        }
        else
            navigateToLogin()
    }

    const authButtonText = user ? 'Logout' : 'Login'

    return (
        <header className={styles.headerWrapper}>
            <div className={styles.headerMenuLeft}>
                <p className={styles.menuItem}>iRoom</p>
                <p className={styles.menuItem} onClick={navigateToHome}>View availability</p>
                <p className={styles.menuItem}>My bookings</p>
                {isAdmin && <p className={styles.menuItem} onClick={navigateToAdminPanel}>Admin panel</p>}
            </div>
            <div className={styles.headerMenuRight}>
                <p className={styles.menuItem} onClick={onAuthButtonClick}>{authButtonText}</p>
            </div>
        </header>
    )
}

export default Header