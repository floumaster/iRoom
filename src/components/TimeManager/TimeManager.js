import React, { useEffect, useState } from "react";
import styles from "./styles.module.css"
import DatePicker from "react-datepicker";
import { useSelector, useDispatch } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import { editDate } from "../../redux/dateSlice";
import moment from 'moment'
import Arrow from '../../assets/icons/arrow.svg'

const TimeManager = ({ title }) => {
    const dispatch = useDispatch()
    const currentDate = useSelector(store => store.dateSlice.date)
    const currentPeriod = useSelector(store => store.periodSlice.period)

    const [startDate, setStartDate] = useState(currentDate.toDate());
    const [endDate, setEndDate] = useState(currentDate.toDate());

    const formatedDate = currentPeriod.id === 0 ? currentDate.format('MMMM D, YYYY')
    : currentPeriod.id === 1 ? `${moment(currentDate).format('MMMM D, YYYY')} to ${moment(currentDate).add(6, 'days').format('MMMM D, YYYY')}`
    : `${moment(currentDate).format('MMMM D, YYYY')} to ${moment(currentDate).add(moment(startDate).daysInMonth() - 1, 'days').format('MMMM D, YYYY')}`
    
    const onDateChange = (date) => {
        dispatch(editDate({
            date: moment(date)
        }))
        setStartDate(moment(date).toDate())
    }

    useEffect(() => {
        if(currentPeriod.id === 0)
            setEndDate(startDate)
        else if(currentPeriod.id === 1)
            setEndDate(moment(startDate).add(6, 'days').toDate())
        else if(currentPeriod.id === 2)
            setEndDate(moment(startDate).add(moment(startDate).daysInMonth() - 1, 'days').toDate())
    }, [currentPeriod, startDate])

    return (
        <div className={styles.timeWrapper}>
            <div className={styles.titleWrapper}>
                <p className={styles.title}>{title}</p>
                <p className={styles.date}>{formatedDate}</p>
            </div>
            <div className={styles.datePickerWrapper}>
                <DatePicker
                    selected={startDate}
                    onChange={onDateChange}
                    inline
                    startDate={startDate}
                    endDate={endDate}
                    calendarClassName={styles.calendar}
                    dayClassName={() => styles.calendarDay}
                    renderCustomHeader={({
                        date,
                        decreaseMonth,
                        increaseMonth,
                        prevMonthButtonDisabled,
                        nextMonthButtonDisabled,
                      }) => (
                        <div className={styles.headerWrapper}>
                          <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled} className={styles.navButton}>
                            <img src={Arrow} alt="arrow" className={styles.arrowLeft} />
                          </button>

                          <div className={styles.monthWrapper}>
                            {moment(date).format('MMMM')}
                          </div>
                
                
                          <button onClick={increaseMonth} disabled={nextMonthButtonDisabled} className={styles.navButton}>
                            <img src={Arrow} alt="arrow" className={styles.arrowRight} />
                          </button>
                        </div>
                      )}
                />
            </div>
        </div>
    )
}

export default TimeManager