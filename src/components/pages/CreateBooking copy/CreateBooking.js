import React, { useState } from "react";
import styles from './styles.module.css'
import TimeManager from "../../TimeManager/TimeManager";
import CreateTimePicker from "../../CreateTimePicker/CreateTimePicker";
import BookingForm from "../../BookingForm/BookingFormCreate";
import { useLocation } from "react-router-dom";

const CreateBooking = () => {
    const {state: {room, floor, time}} = useLocation();
    const title = `Floor ${floor.name} | ${room.name}`

    const [selectedStartTime, setSelectedStartTime] = useState(time)
    const [selectedEndTime, setSelectedEndTime] = useState()
    
    return (
        <div className={styles.contentWrapper}>
            <TimeManager title={title}/>
            <CreateTimePicker selectedStartTime={selectedStartTime} selectedEndTime={selectedEndTime}/>
            <BookingForm
                selectedStartTime={selectedStartTime}
                setSelectedStartTime={setSelectedStartTime}
                selectedEndTime={selectedEndTime}
                setSelectedEndTime={setSelectedEndTime}
            />
        </div>
    )
}

export default CreateBooking