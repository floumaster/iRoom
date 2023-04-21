import React from 'react'
import styles from "./styles.module.css"

const CommonButton = ({text, onClick, handleFileChange}) => {

    const buttonText = text || 'Submit'

    return (
        <button onClick={onClick} className={styles.periodName}>
            <input type="file" className={styles.uploadFileInput} onChange={handleFileChange}/>
            {buttonText}
        </button>
    )
}

export default CommonButton