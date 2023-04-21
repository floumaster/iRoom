import React from "react";
import styles from "./styles.module.css"
import { useNavigate } from "react-router-dom";

const Header = () => {

    const navigate = useNavigate()

    const navigateToHome = () => {
        navigate('/')
    }

    const navigateToAdminPanel = () => {
        navigate('/admin')
    }

    return (
        <header className={styles.headerWrapper}>
            <div className={styles.headerMenuLeft}>
                <p className={styles.menuItem}>iRoom</p>
                <p className={styles.menuItem} onClick={navigateToHome}>View availability</p>
                <p className={styles.menuItem}>My bookings</p>
                <p className={styles.menuItem} onClick={navigateToAdminPanel}>Admin panel</p>
            </div>
            <div className={styles.headerMenuRight}>
                <p className={styles.menuItem}>Logout</p>
            </div>
        </header>
    )
}

export default Header