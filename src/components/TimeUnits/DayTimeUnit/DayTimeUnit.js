import React from "react";
import styles from "./styles.module.css"
import { checkTimeForBooking } from "../../../utils/timeProcessing";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setBookingContent, setIsModalVisible } from "../../../redux/meetingModalSlice";

const minutes = ['00', 15, 30, 45]

const DayTimeUnit = ({ time, bookingsInCurrentRoom, room, floor, setHoveredMeeting, hoveredMeeting }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const teams = useSelector(store => store.teamsSlice.teams)
    const currentDate = useSelector(store => store.dateSlice.date)
    const currentUser = useSelector(store => store.usersSlice.currentUser)

    const getTeamByBooking = (booking) => {
        const teamId = booking.teamId
        return teams.find(team => team.id === teamId)
    }

    const navigateToBookingCreate = (time) => {
        navigate('/createBooking', { state: { bookingsInCurrentRoom, room, floor, time } })
    }

    const onExistingBookingClick = (bookingNow) => {
        dispatch(setBookingContent({
            ...bookingNow,
            userClicked: currentUser,
            bookingsInCurrentRoom,
            room,
            floor,
            time
        }))
        dispatch(setIsModalVisible(true))
    }

    const onMeetingPartHover = (id) => {
        setHoveredMeeting(id)
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
                            style={{backgroundColor: bookingNow ? bookingNow.id === hoveredMeeting ? 'rgb(185, 185, 185)' : bookedTeam?.color : 'transparent'}}
                            onClick={() => {
                                if(!bookingNow)
                                    navigateToBookingCreate(`${time.title}:${minute}`)
                                else{
                                    onExistingBookingClick(bookingNow)
                                }
                            }}
                            onMouseOver={() => onMeetingPartHover(bookingNow?.id)}
                            >
                            
                        </div>
                    )
                })
            }
        </div>
    )
}

export default DayTimeUnit
