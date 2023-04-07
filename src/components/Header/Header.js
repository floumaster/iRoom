import React from "react";
import styles from "./styles.module.css"

const Header = () => {
    return (
        <header className={styles.headerWrapper}>
            <div className={styles.headerMenuLeft}>
                <p className={styles.menuItem}>iRoom</p>
                <p className={styles.menuItem}>View availability</p>
                <p className={styles.menuItem}>My bookings</p>
            </div>
            <div className={styles.headerMenuRight}>
                <p className={styles.menuItem}>Logout</p>
            </div>
        </header>
    )
}

export default Header