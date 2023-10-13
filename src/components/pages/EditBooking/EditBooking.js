import React, { useState } from "react";
import styles from './styles.module.css'
import TimeManager from "../../TimeManager/TimeManager";
import CreateTimePicker from "../../CreateTimePicker/CreateTimePicker";
import BookingForm from "../../BookingForm/BookingForm";
import { useLocation } from "react-router-dom";

const EditBooking = () => {
    const {state: {room, floor, time, bookingNow}} = useLocation();
    const title = `Floor ${floor.name} | ${room.name}`

    const [selectedStartTime, setSelectedStartTime] = useState(bookingNow.timeStart)
    const [selectedEndTime, setSelectedEndTime] = useState(bookingNow.timeEnd)
    return (
        <div className={styles.contentWrapper}>
            <TimeManager title={title}/>
            <CreateTimePicker selectedStartTime={selectedStartTime} selectedEndTime={selectedEndTime} currentBooking={bookingNow}/>
            <BookingForm
                selectedStartTime={selectedStartTime}
                setSelectedStartTime={setSelectedStartTime}
                selectedEndTime={selectedEndTime}
                setSelectedEndTime={setSelectedEndTime}
                formTitle="Edit booking"
                isEditMode
            />
        </div>
    )
}

export default EditBooking