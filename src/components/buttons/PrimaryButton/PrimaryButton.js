import React from 'react'
import styles from "./styles.module.css"

const PrimaryButton = ({text, onClick, isDisabled}) => {

    const buttonText = text || 'Submit'

    const onClickHandler = (e) => {
        if(onClick)
            onClick()
    }

    return (
        <button onClick={onClickHandler} className={isDisabled ? `${styles.periodName} ${styles.disabled}` : styles.periodName} type='submit' disabled={isDisabled}>
            {buttonText}
        </button>
    )
}

export default PrimaryButton