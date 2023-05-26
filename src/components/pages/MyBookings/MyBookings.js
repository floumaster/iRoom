import React, { useState } from 'react'
import styles from './styles.module.css'
import MyBookingsList from '../../MyBookingsList/MyBookingsList'

const MyBookings = () => {

    const [isCreatedShown, setIsCreatedShown] = useState(true)

    const chooseInvited = () => {
        setIsCreatedShown(false)
    }

    const chooseCreated = () => {
        setIsCreatedShown(true)
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.titleWrapper}>
                <p className={isCreatedShown ? styles.title : `${styles.title} ${styles.hidden}`} onClick={chooseCreated}>Created</p>
                <p className={!isCreatedShown ? styles.title : `${styles.title} ${styles.hidden}`} onClick={chooseInvited}>Invited</p>
            </div>
            <MyBookingsList isCreatedShown={isCreatedShown}/>
        </div>
    )
}

export default MyBookings