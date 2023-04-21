import React, { useState } from 'react'
import styles from './styles.module.css'

const DropDown = ({ values, options, value, onSelect }) => {

    const [isOpened, setIsOpened] = useState(false)

    const toggleDropDown = () => {
        setIsOpened(isOpened => !isOpened)
    }

    const closeDropDown = () => {
        setIsOpened(false)
    }

    const onChooseValue = (value) => {
        onSelect(value)
        closeDropDown()
    }

    return (
        <div className={styles.dropDownWrapper}>
            <div className={styles.valueWrapper} onClick={toggleDropDown}>
                <p className={styles.value}>{value}</p>
            </div>
            <div className={styles.optionsWrapper}>
                {
                    isOpened && options.map(option => {
                        return (
                            <div className={styles.option} onClick={() => onChooseValue(option)}>
                                {
                                    option
                                }
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default DropDown