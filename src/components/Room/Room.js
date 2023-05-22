import React, { useEffect, useState } from "react";
import styles from "./styles.module.css"
import { useSelector } from "react-redux";
import DayTimeUnit from "../TimeUnits/DayTimeUnit/DayTimeUnit";
import WeekTimeUnit from "../TimeUnits/WeekTimeUnit/WeekTimeUnit";
import MonthTimeUnit from "../TimeUnits/MonthTimeUnit/MonthTimeUnit";
import { getNextMonthWeeks, getNextWeekDays } from '../../utils/timeProcessing'
import moment from "moment";
import MeetingInfoPopup from '../Modal/MeetingInfoPopup/MeetingInfoPopup'

const Room = ({ room, floor }) => {

    const assets = useSelector(store => store.assetsSlice.assets)
    const times = useSelector(store => store.timesSlice.times)
    const bookings = useSelector(store => store.bookingsSlice.bookings)
    const currentPeriod = useSelector(store => store.periodSlice.period)
    const isBookingModalVisible = useSelector(store => store.meetingModalSlice.isModalVisible)
    const currentDate = useSelector(store => store.dateSlice.date)
    const [monthTimeAvailability, setMonthTimeAvailability] = useState([])
    const [weekTimeAvailability, setWeekTimeAvailability] = useState([])
    const [hoveredMeeting, setHoveredMeeting] = useState('')

    const weekDays = getNextWeekDays(currentDate)
    const monthDays = getNextMonthWeeks(currentDate)

    const isDayPeriod = currentPeriod.id === 0
    const isWeekPeriod = currentPeriod.id === 1

    const timesUnits = isDayPeriod ? times : isWeekPeriod ? weekDays : monthDays

    const getAssetsByRoom = (room) => {
        const assetsIds = room.assetsIds
        return assets.filter(asset => assetsIds.includes(asset.id))
    }

    const getBookingsByRoom = (room) => {
        const bookingsIds = room.bookingsIds
        return bookings.filter(booking => bookingsIds.includes(booking.id))
    }

    const assetsInCurrentRoom = getAssetsByRoom(room)
    const bookingsInCurrentRoom = getBookingsByRoom(room)

    const getTimesAvailability = () => {
        if(currentPeriod.id){
            const roomData = {
                roomId: room.id,
                days: (currentPeriod.id === 2 ? timesUnits.map(timeUnit => timeUnit.days.map(day => day.date.format('YYYY-MM-DD'))) : timesUnits.map(timeUnit => timeUnit.date.format('YYYY-MM-DD'))).flat(Infinity)
            }
            return fetch('http://localhost:3000/booking/getAvailableTimesInRoom', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(roomData)
            }).then(data => data.json())
        }
    }

    const getMonthTimesAvailability = () => {
        getTimesAvailability().then(data => {
            setMonthTimeAvailability(timesUnits.map(timeUnit => ({
                ...timeUnit,
                days: timeUnit.days.map(day => ({
                    ...day,
                    timeAvailability: data[moment(day.date).format('YYYY-MM-DD')]
                }))
            })))
        })
    }

    const getWeekTimesAvailability = () => {
        getTimesAvailability().then(data => {
            setWeekTimeAvailability(timesUnits.map(timeUnit => ({
                ...timeUnit,
                timeAvailability: data[moment(timeUnit.date).format('YYYY-MM-DD')]
            })))
        })
    }

    useEffect(() => {
        if(currentPeriod.id === 1)
            getWeekTimesAvailability()
        else if(currentPeriod.id === 2)
            getMonthTimesAvailability()
    }, [bookings])

    useEffect(() => {
        if(currentPeriod.id === 1 && !weekTimeAvailability.length)
            getWeekTimesAvailability()
        else if(currentPeriod.id === 2 && !monthTimeAvailability.length)
            getMonthTimesAvailability()
    }, [currentPeriod])

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
                    (currentPeriod.id === 2 ?
                        (monthTimeAvailability.length ? monthTimeAvailability : timesUnits) :
                        currentPeriod.id === 1 ?
                            (weekTimeAvailability.length ? weekTimeAvailability : timesUnits) : timesUnits).map(timesUnit => {
                        return isDayPeriod ? (
                            <DayTimeUnit
                                time={timesUnit}
                                setHoveredMeeting={setHoveredMeeting}
                                hoveredMeeting={hoveredMeeting}
                                bookingsInCurrentRoom={bookingsInCurrentRoom}
                                room={room}
                                floor={floor}
                            />
                        ) : isWeekPeriod ? (
                            <WeekTimeUnit time={timesUnit} bookingsInCurrentRoom={bookingsInCurrentRoom} room={room} floor={floor}/>
                        ) : <MonthTimeUnit time={timesUnit} bookingsInCurrentRoom={bookingsInCurrentRoom} room={room} floor={floor} />
                    })
                }
                {isBookingModalVisible && <MeetingInfoPopup/>}
            </div>
        </div>
    )
}

export default Room
