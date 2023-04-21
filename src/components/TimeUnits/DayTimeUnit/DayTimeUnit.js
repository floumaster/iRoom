import React from "react";
import styles from "./styles.module.css"
import { checkTimeForBooking } from "../../../utils/timeProcessing";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const minutes = ['00', 15, 30, 45]

const DayTimeUnit = ({ time, bookingsInCurrentRoom, room, floor }) => {

    const navigate = useNavigate()

    const teams = useSelector(store => store.teamsSlice.teams)
    const currentDate = useSelector(store => store.dateSlice.date)

    const getTeamByBooking = (booking) => {
        const teamId = booking.teamId
        return teams.find(team => team.id === teamId)
    }

    const navigateToBookingCreate = (time) => {
        navigate('/createBooking', { state: { bookingsInCurrentRoom, room, floor, time } })
    }

    const navigateToBookingEdit = (bookingNow) => {
        navigate('/editBooking', { state: { bookingsInCurrentRoom, bookingNow, room, floor, time } })
    }

    return (
        <div className={styles.subTimesWrapper} >
            {
                minutes.map(minute => {
                    const formatedTime = `${time.title}:${minute}`
                    const bookingNow = checkTimeForBooking(formatedTime, bookingsInCurrentRoom, currentDate)
                    let bookedTeam = null
                    if(bookingNow)
                        bookedTeam = getTeamByBooking(bookingNow)
                    return (
                        <div
                            className={bookingNow ? styles.subtimeBooked : styles.subtime}
                            style={{backgroundColor: bookingNow ? bookedTeam?.color : 'transparent'}}
                            onClick={() => {
                                if(!bookingNow)
                                    navigateToBookingCreate(`${time.title}:${minute}`)
                                else{
                                    navigateToBookingEdit(bookingNow)
                                }
                            }}>
                            
                        </div>
                    )
                })
            }
        </div>
    )
}

export default DayTimeUnit
