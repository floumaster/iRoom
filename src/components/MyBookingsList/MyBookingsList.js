import React, { useState } from 'react';
import styles from './styles.module.css'
import { useSelector, useDispatch } from 'react-redux';
import Edit from '../../assets/icons/edit.svg'
import Delete from '../../assets/icons/delete.svg'
import { useNavigate } from "react-router-dom";
import WarningPopup from '../Modal/WarningPopup/WarningPopup';
import { deleteBooking } from '../../redux/bookingsSlice';
import { setBookingContent } from '../../redux/meetingModalSlice';
import moment from 'moment';

const MyBookingsList = ({isCreatedShown}) => {

    const bookings = useSelector(store => store.bookingsSlice.bookings)
    const user = useSelector(store => store.usersSlice.currentUser)
    const teams = useSelector(store => store.teamsSlice.teams)
    const usersTeam = teams.find(team => team.id === user.teamId)
    const purposes = useSelector(store => store.purposesSlice.purposes)
    const floors = useSelector(store => store.floorsSlice.floors)
    const rooms = useSelector(store => store.roomsSlice.rooms)
    const userBookings = isCreatedShown ? bookings.filter(booking => booking.userId === user?.id) : bookings.filter(booking => booking.teamId === usersTeam?.id)
    const [isWarningVisible, setIsWarningVisible] = useState(false)
    const [currentBooking, setCurrentBooking] = useState({})
    const [dateToDelete, setDateToDelete] = useState({})
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const getPurposeValueById = (id) => {
        return purposes.find(purpose => purpose.id === id).value
    }

    const getRoomNumberById = (id) => {
        return rooms.find(room => room.id === id)
    }

    const getFloorNumberById = (id) => {
        const room = rooms.find(room => room.id === id)
        return floors.find(floor => floor.id === room.floorId)
    }

    const getBookingsByIds = (bookingsIds) => {
        return bookingsIds.map(id => bookings.find(booking => booking.id === id))
    }

    const handleCloseWarning = () => {
        setIsWarningVisible(false)
    }

    const handleOpenWarning = (booking, bookingsInCurrentRoom, room, floor, date) => {
        dispatch(setBookingContent({
            ...booking,
            userClicked: user,
            bookingsInCurrentRoom,
            room,
            floor,
        }))
        setIsWarningVisible(true)
        setCurrentBooking(booking)
        setDateToDelete(date)
    }


    const handleBookingDelete = () => {
        const bookingWithoutCurrentDate = {
            id: currentBooking.id,
            dates: currentBooking.dates.filter(date => date !== dateToDelete),
            timeStart: currentBooking.timeStart,
            timeEnd: currentBooking.timeEnd,
            userId: currentBooking.userId,
            teamId: currentBooking.teamId,
            roomId: currentBooking.roomId,
            description: currentBooking.description,
            purposeId: currentBooking.purposeId,
            title: currentBooking.title,
        }
        dispatch(deleteBooking({
            updatedBooking: bookingWithoutCurrentDate
        }))
    }

    const navigateToBookingEdit = (bookingsInCurrentRoom, bookingNow, room, floor) => {

        navigate('/editBooking', { state: { bookingsInCurrentRoom, bookingNow, room, floor } })
    }

    return (
        <div className={styles.wrapper}>
            {!userBookings.length || userBookings.every(booking => booking.dates?.length === 0) ? (
                <p className={styles.emptyText}>{isCreatedShown ? 'You don`t have any created bookings' : 'You don`t have any invited bookings'}</p>
            ) : (
            <div className={styles.colsTitle}>
                <div className={styles.colWrapper}>
                    <p className={styles.colTitle}>Title | Purpose</p>
                </div>
                <div className={styles.colWrapper}>
                    <p className={styles.colTitle}>Start</p>
                </div>
                <div className={styles.colWrapper}>
                    <p className={styles.colTitle}>End</p>
                </div>
                <div className={styles.colWrapperMini}>
                    <p className={styles.colTitle}>Floor</p>
                </div>
                <div className={styles.colWrapperMini}>
                    <p className={styles.colTitle}>Room</p>
                </div>
                {isCreatedShown && <div className={styles.colWrapperMini}>
                    <p className={styles.colTitle}>Actions</p>
                </div>}
            </div>
            )}
            
            {
                userBookings.map(booking => {
                    const purposeValue = getPurposeValueById(booking.purposeId)
                    const floor = getFloorNumberById(booking.roomId)
                    const room = getRoomNumberById(booking.roomId)
                    const bookingsInCurrentRoom = getBookingsByIds(room.bookingsIds)
                    return booking.dates.map(date => {
                        const formatedDate = moment(date).format('MMMM DD, YYYY')
                        if(moment(date) > moment())
                        return (
                            <div className={`${styles.colsTitle} ${styles.values}`}>
                                <div className={styles.colWrapper}>
                                    <p className={styles.colTitle}>{booking.title} | {purposeValue}</p>
                                </div>
                                <div className={styles.colWrapper}>
                                    <p className={styles.colTitle}>{formatedDate} {booking.timeStart}</p>
                                </div>
                                <div className={styles.colWrapper}>
                                    <p className={styles.colTitle}>{formatedDate} {booking.timeEnd}</p>
                                </div>
                                <div className={styles.colWrapperMini}>
                                    <p className={styles.colTitle}>Floor {floor.name}</p>
                                </div>
                                <div className={styles.colWrapperMini}>
                                    <p className={styles.colTitle}>{room.name}</p>
                                </div>
                                {isCreatedShown &&<div className={styles.colWrapperMini}>
                                    <img src={Edit} alt="edit" className={styles.icon} onClick={()=>navigateToBookingEdit(bookingsInCurrentRoom, booking, room, floor)}/>
                                    <img src={Delete} alt="delete" className={styles.icon} onClick={()=>{handleOpenWarning(booking, bookingsInCurrentRoom, room, floor, date)}}/>
                                </div>}
                            </div>
                        )
                        else
                            return null
                    })
                })
            }
            {isWarningVisible && <WarningPopup
                handleClosePopup={handleCloseWarning}
                title="Are you sure you want to delete"
                onSubmit={handleBookingDelete}
            />}
        </div>
    )
}

export default MyBookingsList