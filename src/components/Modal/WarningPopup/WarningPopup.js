import React from "react";
import styles from './styles.module.css'
import PrimaryButton from "../../buttons/PrimaryButton/PrimaryButton";
import CommonButton from "../../buttons/CommonButton/CommonButton";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setIsModalVisible } from "../../../redux/meetingModalSlice";
import { deleteBooking } from "../../../redux/bookingsSlice";

const WarningPopup = ({handleClosePopup, title, text, onSubmit}) => {

    const dispatch = useDispatch()
    const bookingInfo = useSelector(store => store.meetingModalSlice.bookingContent)
    const rooms = useSelector(store => store.roomsSlice.rooms)
    const floors = useSelector(store => store.floorsSlice.floors)
    const teams = useSelector(store => store.teamsSlice.teams)
    const users = useSelector(store => store.usersSlice.users)
    const currentRoom = rooms.find(room => room.id === bookingInfo?.roomId)
    const currentFloor = floors.find(floor => floor.id === currentRoom?.floorId)
    const currentTeam = teams.find(team => team.id === bookingInfo?.teamId)
    const currentUser = users.find(user => user.id === bookingInfo?.userId)

    
    return (
        <div className={styles.overlay} onClick={handleClosePopup} style={text ? {backgroundColor: 'rgba(0, 0, 0, 0.7)'} : {}}>
            <div className={styles.popupWrapper}>
                <div>
                    <div className={styles.headerWrapper}>
                        <p className={styles.headerTitle}>{title}</p>
                    </div>
                    <div className={styles.contentWrapper}>
                        {text ? <p className={styles.contentText}>{text}</p> : (
                            <>
                                <p className={styles.contentText}><a>Booking title: </a>{bookingInfo.title}</p>
                                <p className={styles.contentText}><a>Room:</a> {currentRoom.name}</p>
                                <p className={styles.contentText}><a>Floor:</a> {currentFloor.name}</p>
                                <p className={styles.contentText}><a>Duration:</a> from {bookingInfo.timeStart} till {bookingInfo.timeEnd}</p>
                                <p className={styles.contentText}><a>Team:</a> {currentTeam.name}</p>
                                <p className={styles.contentText}><a>Organizator:</a> {currentUser ? `${currentUser.name} ${currentUser.surname}` : 'No user'}</p>
                            </>
                        )}
                    </div>
                </div>
                <div className={styles.buttonsWrapper}>
                    <div className={styles.buttonWrapper}>
                        <CommonButton text="NO" onClick={handleClosePopup}/>
                    </div>
                    <div className={styles.buttonWrapper}>
                        <PrimaryButton text="YES" onClick={onSubmit}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WarningPopup