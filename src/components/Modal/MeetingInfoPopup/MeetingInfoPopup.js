import React from "react";
import styles from './styles.module.css'
import PrimaryButton from "../../buttons/PrimaryButton/PrimaryButton";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const MeetingInfoPopup = () => {

    const bookingInfo = useSelector(store => store.meetingModalSlice.bookingContent)
    const rooms = useSelector(store => store.roomsSlice.rooms)
    const floors = useSelector(store => store.floorsSlice.floors)
    const teams = useSelector(store => store.teamsSlice.teams)
    const users = useSelector(store => store.usersSlice.users)
    const currentRoom = rooms.find(room => room.id === bookingInfo.roomId)
    const currentFloor = floors.find(floor => floor.id === currentRoom.floorId)
    const currentTeam = teams.find(team => team.id === bookingInfo.teamId)
    const currentUser = users.find(user => user.id === bookingInfo.userId)
//    const navigate = useNavigate()

    const isUserOwnerOfBooking = bookingInfo.userClicked?.id === bookingInfo.userId

    const navigateToBookingEdit = () => {
//        navigate('/editBooking', { state: { bookingsInCurrentRoom: bookingInfo.bookingsInCurrentRoom, bookingNow: bookingInfo, room: currentRoom, floor: currentFloor, time: bookingInfo.time } })
    }
    
    return (
        <div className={styles.popupWrapper}>
            <div>
                <div className={styles.headerWrapper}>
                    <p className={styles.headerTitle}>Booking details</p>
                </div>
                <div className={styles.contentWrapper}>
                    <p className={styles.contentText}><a>Booking title: </a>{bookingInfo.title}</p>
                    <p className={styles.contentText}><a>Room:</a> {currentRoom.name}</p>
                    <p className={styles.contentText}><a>Floor:</a> {currentFloor.name}</p>
                    <p className={styles.contentText}><a>Duration:</a> from {bookingInfo.timeStart} till {bookingInfo.timeEnd}</p>
                    <p className={styles.contentText}><a>Team:</a> {currentTeam.name}</p>
                    <p className={styles.contentText}><a>Organizator:</a> {currentUser ? `${currentUser.name} ${currentUser.surname}` : 'No user'}</p>
                </div>
            </div>
            <div className={styles.buttonsWrapper}>
                {isUserOwnerOfBooking ?
                <>
                    <div className={styles.buttonWrapper}>
                        <PrimaryButton text="EDIT" onClick={navigateToBookingEdit}/>
                    </div>
                    <div className={styles.buttonWrapper}>
                        <PrimaryButton text="DELETE"/>
                    </div>
                </> : 
                    <div className={styles.buttonWrapper}>
                        <PrimaryButton text="CONTACT"/>
                    </div>}
            </div>
        </div>
    )
}

export default MeetingInfoPopup