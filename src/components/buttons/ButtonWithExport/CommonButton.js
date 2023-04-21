import React from 'react'
import styles from "./styles.module.css"
import { CSVLink } from "react-csv";

const CommonButton = ({text, onClick, data}) => {

    const buttonText = text || 'Submit'

    return (
        <button onClick={onClick} className={styles.periodName}>
            <CSVLink data={data} className={styles.link}>
                {buttonText}
            </CSVLink>
        </button>
    )
}

export default CommonButton