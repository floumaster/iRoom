import React from "react";
import styles from "./styles.module.css"
import { useSelector } from "react-redux";
import { getNextMonthWeeks, getNextWeekDays } from '../../utils/timeProcessing'

const ColNamings = () => {

    const currentDate = useSelector(store => store.dateSlice.date)

    const currentPeriod = useSelector(store => store.periodSlice.period)
    const times = useSelector(store => store.timesSlice.times)
    const weekDays = getNextWeekDays(currentDate)
    const monthDays = getNextMonthWeeks(currentDate)

    const isDayPeriod = currentPeriod.id === 0
    const isWeekPeriod = currentPeriod.id === 1
    const isMonthPeriod = currentPeriod.id === 2

    const timesUnits = isDayPeriod ? times : isWeekPeriod ? weekDays : monthDays

    return (
        <div className={styles.timesWrapper}>
            <div className={styles.infoWrapper}>
                <div className={styles.infoCol}>Room</div>
                <div className={styles.infoCol}>Assets</div>
            </div>
            <div className={styles.times}>
                {
                    timesUnits.map(time => {
                        return (
                            <div className={styles.infoCol}>{time.time}</div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ColNamings
