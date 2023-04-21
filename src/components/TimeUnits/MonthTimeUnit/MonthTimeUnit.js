import React from "react";
import styles from "./styles.module.css"
import { checkDayForBusiness, getColorByDayAvailability } from "../../../utils/availability";
import { useSelector } from "react-redux";

const MonthTimeUnit = ({ time, bookingsInCurrentRoom }) => {

    const times = useSelector(store => store.timesSlice.times)

    return (
        <div className={styles.subTimesWrapper}>
            <div className={styles.daysInWeekWrapper}>
                {
                    time.days.map(day => {
                        const availableTimes = checkDayForBusiness(day, bookingsInCurrentRoom, times)
                        const color = getColorByDayAvailability(availableTimes, times)
                        return (
                            <div className={styles.dayInWeekWrapper}>
                                <p className={styles.dayInWeekTitle}>
                                    {day.title}
                                </p>
                                <div className={styles.dayInWeekAvailability} style={{backgroundColor: color}}/>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default MonthTimeUnit
