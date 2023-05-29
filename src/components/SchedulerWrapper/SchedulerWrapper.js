import React, { useState } from "react";
import styles from "./styles.module.css"
import Scheduler from "../Scheduler/Scheduler";
import { useDispatch, useSelector } from "react-redux";
import { setPeriod } from "../../redux/periodSlice";


const periods = [
    {
        id: 0,
        title: 'Day'
    },
    {
        id: 1,
        title: 'Week'
    },
    {
        id: 2,
        title: 'Month'
    }
]

const SchedulerWrapper = () => {

    const dispatch = useDispatch()

    const currentPeriod = useSelector(store => store.periodSlice.period)

    const handlePeriodChange = (id) => {
        dispatch(setPeriod({
            id
        }))
    }

    const floors = useSelector(store => store.floorsSlice.floors)
    const rooms = useSelector(store => store.roomsSlice.rooms)

    let isAnyRoom = false
    
    const getRoomsByFloor = (floor) => {
        const roomsIds = floor.roomsIds
        return rooms.filter(room => roomsIds.includes(room.id))
    }

    floors.forEach(floor => {
        const roomsInFloor = getRoomsByFloor(floor)
        if(roomsInFloor.length)
            isAnyRoom = true
    })

    return (
        <div className={styles.schedulerWrapper}>
            <nav className={styles.periodSwitcher}>
                {
                    isAnyRoom && periods.map(period => {
                        const currentPeriodClassname = currentPeriod.id === period.id ? `${styles.periodName} ${styles.activePeriod}` : styles.periodName

                        return (
                            <p
                                className={currentPeriodClassname}
                                onClick={() => handlePeriodChange(period.id)}
                            >
                                {period.title}
                            </p>
                        )
                    })
                }
            </nav>
            <Scheduler isAnyRoom={isAnyRoom}/>
        </div>
    )
}

export default SchedulerWrapper