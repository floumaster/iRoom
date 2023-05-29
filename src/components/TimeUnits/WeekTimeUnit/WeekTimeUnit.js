import React from "react";
import styles from "./styles.module.css"
import { useSelector } from "react-redux";
import { checkDayForBusiness, getColorByDayAvailability } from "../../../utils/availability";

const WeekTimeUnit = ({ time, bookingsInCurrentRoom }) => {

    const times = useSelector(store => store.timesSlice.times)

    //const availableTimes = time.timeAvailability || times.length * 4
    const availableTimes = time.timeAvailability
    console.log(time, availableTimes)
    const color = getColorByDayAvailability(availableTimes, times)

    return (
        <div className={styles.subTimesWrapper} style={{backgroundColor: color}} />
    )
}

export default WeekTimeUnit
