import React, { useState } from "react";
import styles from "./styles.module.css"
import { useSelector } from "react-redux";
import moment from 'moment'
import { v4 as uuidv4 } from 'uuid';

const timeSubUnits = ['00', 15, 30, 45]

const Scheduler = () => {

    const floors = useSelector(store => store.floorsSlice.floors)
    const times = useSelector(store => store.timesSlice.times)
    const rooms = useSelector(store => store.roomsSlice.rooms)
    const assets = useSelector(store => store.assetsSlice.assets)
    const bookings = useSelector(store => store.bookingsSlice.bookings)
    const teams = useSelector(store => store.teamsSlice.teams)
    const currentDate = useSelector(store => store.dateSlice.date)
    const currentPeriod = useSelector(store => store.periodSlice.period)

    const getNextMonthWeeks = () => {
        const daysInMonths = moment().daysInMonth()
        const weeksInMonths = daysInMonths / 7
        const monthWeeks = []
        for(let i = 0; i < weeksInMonths; i++){
            const daysleft = daysInMonths - 7 * i
            const nextdaysNumber = daysleft < 7 ? daysleft : 7
            const nextMonthDays = daysleft < 7 ? (i) * 7 + daysleft : (i + 1) * 7
            monthWeeks.push({
                id: uuidv4(),
                time: `${moment(currentDate).add(i * 7, 'days').format('MMM DD')} to ${moment(currentDate).add(nextMonthDays, 'days').format('MMM DD')}`,
                days: getNextWeekofSomeDay(moment(currentDate).add(i * 7, 'days'), nextdaysNumber - 1)
            })
        }
        return monthWeeks
    }

    const weekDays = getNextWeekDays()
    const monthDays = getNextMonthWeeks()
    const isDayPeriod = currentPeriod.id === 0
    const isWeekPeriod = currentPeriod.id === 1
    const isMonthPeriod = currentPeriod.id === 2

    const timesUnits = isDayPeriod ? times : isWeekPeriod ? weekDays : monthDays

    const getRoomsByFloor = (floor) => {
        const roomsIds = floor.roomsIds
        return rooms.filter(room => roomsIds.includes(room.id))
    }

    const getAssetsByRoom = (room) => {
        const assetsIds = room.assetsIds
        return assets.filter(asset => assetsIds.includes(asset.id))
    }

    const getBookingsByRoom = (room) => {
        const bookingsIds = room.bookingsIds
        return bookings.filter(booking => bookingsIds.includes(booking.id))
    }

    const getTeamByBooking = (booking) => {
        const teamId = booking.teamId
        return teams.find(team => team.id === teamId)
    }

    const checkTimeForBooking = (time, bookings) => {
        const formatedCurrentDate = currentDate.format('YYYY-MM-DD')
        const formatedTime = moment(`${formatedCurrentDate}T${time}`)
        let _booking = null
        bookings.forEach(booking => {
            if(moment(booking.dateStart) <= formatedTime && formatedTime < moment(booking.dateEnd)){
                _booking = booking
            }
        })
        return _booking
    }

    const checkTimeAndDateForBooking = (time, date, bookings) => {
        const formatedCurrentDate = date.format('YYYY-MM-DD')
        const formatedTime = moment(`${formatedCurrentDate}T${time}`)
        let _booking = null
        bookings.forEach(booking => {
            if(moment(booking.dateStart) <= formatedTime && formatedTime < moment(booking.dateEnd)){
                _booking = booking
            }
        })
        return _booking
    }

    const checkDayForBusiness = (day, bookingsInCurrentRoom) => {
        let availableTimesNumber = 0
        times.forEach(time => {
            timeSubUnits.forEach(subTime => {
                const formatedTime = `${time.title}:${subTime}`
                const booking = checkTimeAndDateForBooking(formatedTime, day.date, bookingsInCurrentRoom)
                if(!booking){
                    availableTimesNumber++
                }
            })
        })
        return availableTimesNumber
    }

    const getColorByDayAvailability = (availableTimes) => {
        const maxTimes = times.length * timeSubUnits.length
        if(availableTimes === maxTimes)
            return 'transparent'
        if(availableTimes === 0)
            return '#ff0000'
        return '#ffb300'
    }

    return (
        <div className={styles.scheduler}>
            {
                floors.map(floor => {
                    const roomOnCurrentFloor = getRoomsByFloor(floor)

                    return (
                        <div className={styles.floorWrapper}>
                            <div className={styles.floorTitleWrapper}>
                                <p className={styles.floor}>{`Floor ${floor.name}`}</p>
                            </div>
                            <div className={styles.schedulerContentWrapper}>
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
                                <div className={styles.roomsWrapper}>
                                    {
                                        roomOnCurrentFloor.map(room => {
                                            const assetsInCurrentRoom = getAssetsByRoom(room)
                                            const bookingsInCurrentRoom = getBookingsByRoom(room)
                                            return (
                                                <div className={styles.roomWrapper}>
                                                    <div className={styles.infoWrapper}>
                                                        <div className={styles.infoCol}>{room.name}</div>
                                                        <div className={styles.infoCol}>
                                                            <div className={styles.assetsWrapper}>
                                                                {
                                                                    assetsInCurrentRoom.map(asset => {
                                                                        
                                                                        return (
                                                                            <p className={styles.asset}>{asset.name}</p>
                                                                        )
                                                                    })
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className={styles.times}>
                                                        {
                                                            timesUnits.map(time => {
                                                                let color = 'transparent'
                                                                if(isWeekPeriod){
                                                                    const availableTimes = checkDayForBusiness(time, bookingsInCurrentRoom)
                                                                    color = getColorByDayAvailability(availableTimes)
                                                                }
                                                                return (
                                                                    <div className={styles.subTimesWrapper} style={{backgroundColor: color}}>
                                                                        {
                                                                            isDayPeriod && timeSubUnits.map(subtime => {
                                                                                const formatedTime = `${time.title}:${subtime}`
                                                                                const bookingNow = checkTimeForBooking(formatedTime, bookingsInCurrentRoom)
                                                                                let bookedTeam = null
                                                                                if(bookingNow)
                                                                                    bookedTeam = getTeamByBooking(bookingNow)
                                                                                return (
                                                                                    <div className={bookingNow ? styles.subtimeBooked : styles.subtime} style={{backgroundColor: bookingNow ? bookedTeam.color : 'transparent'}}>
                                                                                        
                                                                                    </div>
                                                                                )
                                                                            })
                                                                        }
                                                                        {
                                                                            isMonthPeriod && (
                                                                                <div className={styles.daysInWeekWrapper}>
                                                                                    {
                                                                                        time.days.map(day => {
                                                                                            let _color = 'transparent'
                                                                                            const availableTimes = checkDayForBusiness(day, bookingsInCurrentRoom)
                                                                                            _color = getColorByDayAvailability(availableTimes)
                                                                                            return (
                                                                                                <div className={styles.dayInWeekWrapper}>
                                                                                                    <p className={styles.dayInWeekTitle}>
                                                                                                        {day.title}
                                                                                                    </p>
                                                                                                    <div className={styles.dayInWeekAvailability} style={{backgroundColor: _color}}/>
                                                                                                </div>
                                                                                            )
                                                                                        })
                                                                                    }
                                                                                </div>
                                                                            )
                                                                        }
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
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Scheduler
