import React from "react";
import styles from "./styles.module.css"
import { useSelector } from "react-redux";
import DayTimeUnit from "../TimeUnits/DayTimeUnit/DayTimeUnit";
import WeekTimeUnit from "../TimeUnits/WeekTimeUnit/WeekTimeUnit";
import MonthTimeUnit from "../TimeUnits/MonthTimeUnit/MonthTimeUnit";
import { getNextMonthWeeks, getNextWeekDays } from '../../utils/timeProcessing'

const Room = ({ room, floor }) => {

    const assets = useSelector(store => store.assetsSlice.assets)
    const times = useSelector(store => store.timesSlice.times)
    const bookings = useSelector(store => store.bookingsSlice.bookings)
    const currentPeriod = useSelector(store => store.periodSlice.period)
    const currentDate = useSelector(store => store.dateSlice.date)

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
                    timesUnits.map(timesUnit => {
                        return isDayPeriod ? (
                            <DayTimeUnit time={timesUnit} bookingsInCurrentRoom={bookingsInCurrentRoom} room={room} floor={floor}/>
                        ) : isWeekPeriod ? (
                            <WeekTimeUnit time={timesUnit} bookingsInCurrentRoom={bookingsInCurrentRoom} room={room} floor={floor}/>
                        ) : <MonthTimeUnit time={timesUnit} bookingsInCurrentRoom={bookingsInCurrentRoom} room={room} floor={floor}/>
                    })
                }
            </div>
        </div>
    )
}

export default Room
