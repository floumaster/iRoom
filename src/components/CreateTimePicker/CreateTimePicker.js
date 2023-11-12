import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import { useSelector } from 'react-redux'
import { checkTimeForBooking } from '../../utils/timeProcessing'
import { useLocation } from 'react-router-dom'
import moment from 'moment'

const minutes = ['00', 15, 30, 45]

const CreateTimePicker = ({ selectedStartTime, selectedEndTime, currentBooking }) => {
    const currentDate = useSelector(store => store.dateSlice.date)
    const times = useSelector(store => store.timesSlice.times)
    const teams = useSelector(store => store.teamsSlice.teams)
    const bookings = useSelector(store => store.bookingsSlice.bookings)
    const [globalTimeStyle, setGlobalTimeStyle] = useState(styles.invisible)
    const currentUser = useSelector(store => store.usersSlice.currentUser)

    const {state: {bookingsInCurrentRoom, room}} = useLocation();

    const getTeamByBooking = (booking) => {
        const teamId = booking.teamId
        return teams.find(team => team.id === teamId)
    }

    const checkTimeForSelecting = (formatedTime) => {
        const prefixDate = currentDate.format('YYYY-MM-DDT')
        const processedTime = formatedTime?.length === 5 ? formatedTime : 0+formatedTime
        const processedDate = `${prefixDate}${processedTime}`
        const processedStartTime = selectedStartTime?.length === 5 ? selectedStartTime : 0+selectedStartTime
        const processedStartDate = `${prefixDate}${processedStartTime}`
        const processedEndTime = selectedEndTime?.length === 5 ? selectedEndTime : 0+selectedEndTime
        const processedEndDate = `${prefixDate}${processedEndTime}`
        if(moment(processedDate) >= moment(processedStartDate) && moment(processedDate) < moment(processedEndDate))
            return true
        return false
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            setGlobalTimeStyle(globalTimeStyle => globalTimeStyle === styles.invisible ? styles.visible : styles.invisible)
        }, 1000);
        return () => clearInterval(intervalId);
    }, [])

    const getBookingColor = (bookingNow, isSelectedTime) => {
        if(bookingNow){
            // console.log(bookingNow)
            // console.log(bookingNow?.userId === currentUser?.id)
        }
        return bookingNow ? bookingNow?.userId === currentUser?.id ? '#facd1b' : '#1b8efa' : isSelectedTime ? currentBooking ? '#facd1b' : 'rgb(185, 185, 185)' : 'transparent'
    }

    return (
        <div className={styles.timePickerContainer}>
            <div className={styles.timePickerHeader}>
                <p className={styles.timePickerDate}>{currentDate.format('DD MMMM, YYYY')}</p>
            </div>
            <div className={styles.timesWrapper}>
                {
                    times.map(time => {
                        return (
                            <div className={styles.hour}>
                                <div className={styles.timeWrapper}>
                                    <p className={styles.time}>{time.time}</p>
                                </div>
                                <div className={styles.minutesWrapper}>
                                    {
                                        minutes.map(minute => {
                                            const formatedTime = `${time.title}:${minute}`
                                            let bookingNow = checkTimeForBooking(formatedTime, bookingsInCurrentRoom, currentDate)
                                            bookingNow = bookingNow?.id === currentBooking?.id ? null : bookingNow
                                            let bookedTeam = null
                                            const isSelectedTime = checkTimeForSelecting(formatedTime)
                                            if(bookingNow)
                                                bookedTeam = getTeamByBooking(bookingNow)
                                            else if(currentBooking)
                                                bookedTeam = getTeamByBooking(currentBooking)
                                            return (
                                                <div className={isSelectedTime ? `${styles.minute} ${globalTimeStyle}` : styles.minute} style={{backgroundColor:getBookingColor(bookingNow, isSelectedTime)}}>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default CreateTimePicker