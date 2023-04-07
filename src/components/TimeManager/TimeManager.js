import React, { useState } from "react";
import styles from "./styles.module.css"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const TimeManager = () => {

    const [startDate, setStartDate] = useState(new Date("2014/02/08"));
    const [endDate, setEndDate] = useState(new Date("2014/02/10"));

    return (
        <div className={styles.timeWrapper}>
            <div className={styles.titleWrapper}>
                <p className={styles.title}>Book a room</p>
                <p className={styles.date}>January 25, 2018</p>
            </div>
            <div className={styles.datePickerWrapper}>
                <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    inline
                    startDate={startDate}
                    endDate={endDate}
                />
            </div>
        </div>
    )
}

export default TimeManager