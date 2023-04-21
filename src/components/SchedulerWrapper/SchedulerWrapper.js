import React, { useState } from "react";
import styles from "./styles.module.css"
import Scheduler from "../Scheduler/Scheduler";
import { useDispatch, useSelector } from "react-redux";
import { setPeriod } from "../../redux/periodSlice";


const periods = [
    {
        id: 0,
        title: 'Day'
    },
    {
        id: 1,
        title: 'Week'
    },
    {
        id: 2,
        title: 'Month'
    }
]

const SchedulerWrapper = () => {

    const dispatch = useDispatch()

    const currentPeriod = useSelector(store => store.periodSlice.period)

    const handlePeriodChange = (id) => {
        dispatch(setPeriod({
            id
        }))
    }

    return (
        <div className={styles.schedulerWrapper}>
            <nav className={styles.periodSwitcher}>
                {
                    periods.map(period => {
                        const currentPeriodClassname = currentPeriod.id === period.id ? `${styles.periodName} ${styles.activePeriod}` : styles.periodName

                        return (
                            <p
                                className={currentPeriodClassname}
                                onClick={() => handlePeriodChange(period.id)}
                            >
                                {period.title}
                            </p>
                        )
                    })
                }
            </nav>
            <Scheduler />
        </div>
    )
}

export default SchedulerWrapper