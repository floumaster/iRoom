import React, { useState } from "react";
import styles from './styles.module.css'
import PrimaryButton from "../../buttons/PrimaryButton/PrimaryButton";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setIsModalVisible } from "../../../redux/meetingModalSlice";
import { deleteBooking } from "../../../redux/bookingsSlice";
import WarningPopup from "../WarningPopup/WarningPopup";

const MeetingInfoPopup = ({handleClosePopup}) => {

    const dispatch = useDispatch()
    const bookingInfo = useSelector(store => store.meetingModalSlice.bookingContent)
    const rooms = useSelector(store => store.roomsSlice.rooms)
    const floors = useSelector(store => store.floorsSlice.floors)
    const teams = useSelector(store => store.teamsSlice.teams)
    const users = useSelector(store => store.usersSlice.users)
    const purposes = useSelector(store => store.purposesSlice.purposes)
    const currentRoom = rooms.find(room => room.id === bookingInfo.roomId)
    const currentFloor = floors.find(floor => floor.id === currentRoom.floorId)
    const currentTeam = teams.find(team => team.id === bookingInfo.teamId)
    const currentUser = users.find(user => user.id === bookingInfo.userId)
    const currentDate = useSelector(store => store.dateSlice.date)
    const navigate = useNavigate()

    const [isWarningVisible, setIsWarningVisible] = useState(false)

    const isUserOwnerOfBooking = bookingInfo.userClicked?.id === bookingInfo.userId

    const navigateToBookingEdit = () => {
        navigate('/editBooking', { state: { bookingsInCurrentRoom: bookingInfo.bookingsInCurrentRoom, bookingNow: bookingInfo, room: currentRoom, floor: currentFloor, time: bookingInfo.time } })
    }

    const handleCloseWarning = () => {
        setIsWarningVisible(false)
    }

    const handleOpenWarning = (e) => {
        e.stopPropagation()
        setIsWarningVisible(true)
    }

    const handleBookingDelete = () => {
        const bookingWithoutCurrentDate = {
            id: bookingInfo.id,
            dates: bookingInfo.dates.filter(date => date !== currentDate.format('YYYY-MM-DD')),
            timeStart: bookingInfo.timeStart,
            timeEnd: bookingInfo.timeEnd,
            userId: bookingInfo.userId,
            teamId: bookingInfo.teamId,
            roomId: bookingInfo.roomId,
            description: bookingInfo.description,
            purposeId: bookingInfo.purposeId,
            title: bookingInfo.title,
        }
        dispatch(deleteBooking({
            updatedBooking: bookingWithoutCurrentDate
        }))
    }

    const handleEmailClick = () => {
        const recipientEmail = currentUser.email;
        const purpose = purposes.find(purpose => purpose.id === bookingInfo.purposeId)
        const subject = `${bookingInfo.title} | ${purpose?.value}, ${currentDate.format('YYYY-MM-DD')}`;
        const mailtoUrl = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}`;
        //window.location.href = mailtoUrl;
        window.open(
            mailtoUrl,
            '_blank'
          );
    };
    
    return (
        <div className={styles.overlay} onClick={handleClosePopup}>
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
                        <div className={styles.buttonWrapper} onClick={handleOpenWarning}>
                            <PrimaryButton text="DELETE" />
                        </div>
                    </> : 
                        <div className={styles.buttonWrapper}>
                            <PrimaryButton text="CONTACT" onClick={handleEmailClick}/>
                        </div>}
                </div>
            </div>
            {isWarningVisible && <WarningPopup
                                    handleClosePopup={handleCloseWarning}
                                    title="Are you sure you want to delete"
                                    onSubmit={handleBookingDelete}
                                />}
        </div>
    )
}

export default MeetingInfoPopup