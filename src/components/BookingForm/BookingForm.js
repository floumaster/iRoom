import React, { useEffect, useState, forwardRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from './styles.module.css'
import PrimaryButton from "../buttons/PrimaryButton/PrimaryButton";
import CommonButton from "../buttons/CommonButton/CommonButton";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { useLocation } from "react-router-dom";
import { getAllAvailableStartTimes, getAllAvailableEndTimes } from "../../utils/availability";
import { addBooking, editBooking } from "../../redux/bookingsSlice";
import { v4 as uuidv4 } from 'uuid';
import { addBookingToRoom } from "../../redux/roomsSlice";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

const minutes = ['00', 15, 30, 45]

const BookingForm = ({ selectedStartTime, setSelectedStartTime, selectedEndTime, setSelectedEndTime, isEditMode, formTitle }) => {

    const times = useSelector(store => store.timesSlice.times).map(time => time.time)
    const originTeams = useSelector(store => store.teamsSlice.teams)
    const teams = originTeams.map(team => team.name)
    const originPurposes = useSelector(store => store.purposesSlice.purposes)
    const purposes = originPurposes.map(purpose => purpose.value)
    const recurrings = useSelector(store => store.recurringsSlice.recurrings).map(recurring => recurring.title)
    const currentDate = useSelector(store => store.dateSlice.date)
    const {state: {bookingsInCurrentRoom, room, time, bookingNow}} = useLocation();
    const dispatch = useDispatch()

    const getPuproseNameById = (purposeId) => {
        return originPurposes.find(purpose => purpose.id === purposeId)?.value
    }

    const getTeamNameById = (teamId) => {
        return originTeams.find(team => team.id === teamId).name
    }

    const startTimes = getAllAvailableStartTimes(times, bookingsInCurrentRoom, currentDate, bookingNow)
    const endTimes = getAllAvailableEndTimes(times, bookingsInCurrentRoom, currentDate, selectedStartTime, bookingNow)
    const [title, setTitle] = useState(isEditMode ? bookingNow.title : '')
    const [purpose, setPurpose] = useState(isEditMode ? getPuproseNameById(bookingNow.purposeId) : '')
    const [description, setDescription] = useState(isEditMode ? bookingNow.description : '')
    const [selectedTeam, setSelectedTeam] = useState(isEditMode ? getTeamNameById(bookingNow.teamId) : null)
    const [selectedRecurring, setSelectedRecurring] = useState(null)
    const [recurringEndDate, setRecurringEndDate] = useState(currentDate.toDate());

    const handleTitleChange = (e) => {
        setTitle(e.target.value)
    }

    const handlePurposeChange = obj => {
        setPurpose(obj.value)
    }

    const handleRecurringChange = obj => {
        setSelectedRecurring(obj.value)
    }

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value)
    }

    const handleStartTimeChange = (timeObject) => {
        setSelectedStartTime(timeObject.value)
    }

    useEffect(() => {
        if(!isEditMode)
            setSelectedEndTime(endTimes[0])
        else{
            const formatedDate = currentDate.format('YYYY-MM-DDT')
            const formatedStart = moment(`${formatedDate}${selectedStartTime.length === 5 ? selectedStartTime : '0' + selectedStartTime}`)
            const formatedEnd = moment(`${formatedDate}${selectedEndTime.length === 5 ? selectedEndTime : '0' + selectedEndTime}`)
            if(formatedStart > formatedEnd)
                setSelectedEndTime(endTimes[0])
            else if(!endTimes.includes(selectedEndTime))
                setSelectedEndTime(endTimes[endTimes.length - 1])
        }
    }, [selectedStartTime])

    const handleEndTimeChange = (timeObject) => {
        setSelectedEndTime(timeObject.value)
    }

    const handleBusinessUnitChange = (obj) => {
        setSelectedTeam(obj.value)
    }

    const navigate = useNavigate()

    const navigateToHome = () => {
        navigate('/')
    }

    const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
        <button className={styles.customDateInput} onClick={onClick} ref={ref}>
            {value}
        </button>
    ));

    const getPuproseIdByName = (purposeName) => {
        return originPurposes.find(purpose => purpose.value === purposeName).id
    }

    const getTeamIdByName = (teamName) => {
        return originTeams.find(team => team.name === teamName).id
    }

    const generateDatesByGap = (daysGap, recurringEndDate) => {
        const dates = []
        let processedDate = currentDate
        while(moment(processedDate) < moment(recurringEndDate)){
            dates.push(processedDate.format('YYYY-MM-DD'))
            processedDate = moment(processedDate).add(daysGap, 'days')
        }
        return dates
    }

    const getDatesByRecurrency = () => {
        switch(selectedRecurring){
            case 'No recurring':
                return generateDatesByGap(0, currentDate)
            case 'Once a day':
                return generateDatesByGap(1, recurringEndDate)
            case 'Once a week':
                return generateDatesByGap(7, recurringEndDate)
            case 'Once a month':
                return generateDatesByGap(31, recurringEndDate)
            case 'Once every two days':
                return generateDatesByGap(2, recurringEndDate)
            default:
                return [currentDate.format('YYYY-MM-DD')]
        }
    }

    const handleBookingCreate = () => {
        if(isEditMode){
            const bookingModel = {
                id: bookingNow.id,
                timeStart: selectedStartTime.length === 4 ? '0' + selectedStartTime : selectedStartTime,
                timeEnd: selectedEndTime.length === 4 ? '0' + selectedEndTime : selectedEndTime,
                title: title,
                teamId: getTeamIdByName(selectedTeam),
                purposeId: getPuproseIdByName(purpose),
                dates: getDatesByRecurrency(),
                userId: null,
                roomId: room.id,
                description: description
            }
            dispatch(editBooking(bookingModel))
        }
        else{
            const newBookingId = uuidv4()
            const bookingModel = {
                id: newBookingId,
                timeStart: selectedStartTime.length === 4 ? '0' + selectedStartTime : selectedStartTime,
                timeEnd: selectedEndTime.length === 4 ? '0' + selectedEndTime : selectedEndTime,
                title: title,
                teamId: getTeamIdByName(selectedTeam),
                purposeId: getPuproseIdByName(purpose),
                dates: getDatesByRecurrency(),
                userId: null,
                roomId: room.id,
                description: description
            }
            dispatch(addBooking(bookingModel))
            dispatch(addBookingToRoom({
                roomId: room.id,
                bookingId: newBookingId
            }))
        }
        navigateToHome()
    }

    const isButtonDisabled = title.length === 0

    return (
        <div className={styles.formWrapper}>
            <div className={styles.header}>
                <p className={styles.headerTitle}>{formTitle}</p>
            </div>
            <div className={styles.form}>
                <div className={styles.timePickerWrapper}>
                    <div className={styles.startTimePickerWrapper}>
                        <p className={styles.optionText}>Start Time</p>
                        <Dropdown options={startTimes} value={selectedStartTime} onChange={handleStartTimeChange} className={styles.dropDownWrapper}/>
                    </div>
                    <div className={styles.startTimePickerWrapper}>
                        <p className={styles.optionText}>End Time</p>
                        <Dropdown options={endTimes} value={selectedEndTime} onChange={handleEndTimeChange} className={styles.dropDownWrapper}/>
                    </div>
                </div>
                <div className={styles.timePickerWrapper}>
                    <div className={styles.inputWrapper}>
                        <p className={styles.optionText}>Title</p>
                        <input className={styles.input} type="text" value={title} onChange={handleTitleChange} maxLength={64}/>
                    </div>
                </div>
                <div className={styles.timePickerWrapper}>
                    <div className={styles.inputWrapper}>
                        <p className={styles.optionText}>Business unit</p>
                        <Dropdown options={teams} value={selectedTeam} onChange={handleBusinessUnitChange} className={styles.dropDownWrapper}/>
                    </div>
                </div>
                <div className={styles.timePickerWrapper}>
                    <div className={styles.inputWrapper}>
                        <p className={styles.optionText}>Purpose</p>
                        <Dropdown options={purposes} value={purpose} onChange={handlePurposeChange} className={styles.dropDownWrapper}/>
                    </div>
                </div>
                <div className={styles.timePickerWrapper}>
                    <div className={styles.inputWrapper}>
                        <p className={styles.optionText}>Recurring</p>
                        <Dropdown options={recurrings} value={selectedRecurring} onChange={handleRecurringChange} className={styles.dropDownWrapper}/>
                    </div>
                </div>
                {selectedRecurring !== 'No recurring' && <div className={styles.timePickerWrapper}>
                    <div className={styles.inputWrapper}>
                        <p className={styles.optionText}>Recurring end date</p>
                        <DatePicker selected={recurringEndDate} onChange={(date) => setRecurringEndDate(date)} customInput={<ExampleCustomInput />}/>
                    </div>
                </div>}
                <div className={styles.timePickerWrapper}>
                    <div className={styles.inputWrapper}>
                        <p className={styles.optionText}>Description</p>
                        <textarea className={styles.bigInput} value={description} onChange={handleDescriptionChange} maxLength={64}/>
                    </div>
                </div>
                <div className={styles.buttonsWrapper}>
                    <PrimaryButton text="SUBMIT" isDisabled={isButtonDisabled} onClick={handleBookingCreate}/>
                    <CommonButton text="RESET"/>
                </div>
            </div>
        </div>
    )
}

export default BookingForm