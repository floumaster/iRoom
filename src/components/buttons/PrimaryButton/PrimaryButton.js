import React from 'react'
import styles from "./styles.module.css"

const PrimaryButton = ({text, onClick}) => {

    const buttonText = text || 'Submit'

    return (
        <button onClick={onClick} className={styles.periodName}>
            {buttonText}
        </button>
    )
}

export default PrimaryButton