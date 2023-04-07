import React, { useState } from "react";
import styles from "./styles.module.css"
import Scheduler from "../Scheduler/Scheduler";


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

    const [activePeriodId, setActiveperiodId] = useState(0)

    const handlePeriodChange = (id) => {
        setActiveperiodId(id)
    }

    return (
        <div className={styles.schedulerWrapper}>
            <nav className={styles.periodSwitcher}>
                {
                    periods.map(period => {
                        const currentPeriodClassname = activePeriodId === period.id ? `${styles.periodName} ${styles.activePeriod}` : styles.periodName

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