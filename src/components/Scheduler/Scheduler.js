import React, { useState } from "react";
import styles from "./styles.module.css"
import { useSelector } from "react-redux";
import moment from 'moment'

const Scheduler = () => {

    const floors = useSelector(store => store.floorsSlice.floors)
    const times = useSelector(store => store.timesSlice.times)
    const rooms = useSelector(store => store.roomsSlice.rooms)
    const assets = useSelector(store => store.assetsSlice.assets)
    const bookings = useSelector(store => store.bookingsSlice.bookings)
    const teams = useSelector(store => store.teamsSlice.teams)

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
        console.log(booking)
        const teamId = booking.teamId
        return teams.find(team => team.id === teamId)
    }

    const checkTimeForBooking = (time, bookings) => {
        const formatedTime = moment(`2023-01-01T${time}`)
        let _booking = null
        bookings.forEach(booking => {
            if(moment(booking.dateStart) <= formatedTime && formatedTime < moment(booking.dateEnd)){
                console.log(formatedTime)
                _booking = booking
            }
        })
        return _booking
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
                                            times.map(time => {
                                                return (
                                                    <div className={styles.infoCol}>{time.title}</div>
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
                                                            times.map(time => {
                                                                return (
                                                                    <div className={styles.subTimesWrapper}>
                                                                        {
                                                                            ['00', 15, 30, 45].map(subtime => {
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
