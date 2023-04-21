import React from 'react'
import styles from './styles.module.css'

const AdminEditor = ({ title, children }) => {

    return (
        <div className={styles.contentWrapper}>
            <div className={styles.headerWrapper}>
                <p className={styles.headerTitle}>{title}</p>
            </div>
            <div className={styles.content}>
                {
                    children
                }
            </div>
        </div>
    )
}

export default AdminEditor