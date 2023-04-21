import React from "react";
import styles from "./styles.module.css"
import { useSelector } from "react-redux";
import { checkDayForBusiness, getColorByDayAvailability } from "../../../utils/availability";

const WeekTimeUnit = ({ time, bookingsInCurrentRoom }) => {

    const times = useSelector(store => store.timesSlice.times)

    const availableTimes = checkDayForBusiness(time, bookingsInCurrentRoom, times)
    const color = getColorByDayAvailability(availableTimes, times)

    return (
        <div className={styles.subTimesWrapper} style={{backgroundColor: color}} />
    )
}

export default WeekTimeUnit
