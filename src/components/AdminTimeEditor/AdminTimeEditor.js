import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import Dropdown from 'react-dropdown';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import PrimaryButton from '../buttons/PrimaryButton/PrimaryButton';
import { setTimes } from '../../redux/timesSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";


const AdminTimeEditor = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const getAllAvailableTimes = () => {
        const times = []
        for(let i = 6; i < 23; i++){
            times.push(i.toString())
        }
        return times
    }

    const availableTimes = getAllAvailableTimes()

    const [timeStart, setTimeStart] = useState('6')

    const [timeEnd, setTimeEnd] = useState('22')

    const getAvailableEndTimes = (timeStart) => {
        const endTimes = availableTimes.filter(time => {
            return parseInt(time) > parseInt(timeStart)
        })
        return endTimes
    }
    const availableStartTimes = availableTimes.slice(0, availableTimes.length - 1)
    const availableEndTimes = getAvailableEndTimes(timeStart)

    useEffect(() => {
        if(parseInt(timeEnd) <= parseInt(timeStart))
            setTimeEnd(availableEndTimes[0])
    }, [timeStart])

    const handleStartTimeChange = (obj) => {
        setTimeStart(obj.value)
    }

    const handleEndTimeChange = (obj) => {
        setTimeEnd(obj.value)
    }

    const handleTimesChange = () => {
        const times = []
        for(let i = parseInt(timeStart); i <= parseInt(timeEnd); i++){
            times.push({
                id: uuidv4(),
                title: i < 10 ? '0' + i : i.toString(),
                time: i,
            })
        }
        times.pop()
        dispatch(setTimes(times))
        navigate('/')
    }

    return (
        <div className={styles.contentWrapper}>
            <div className={styles.dropDownsWrapper}>
                <div className={styles.dropDownWrapper}>
                    <p className={styles.dropDownTitle}>Start time</p>
                    <Dropdown options={availableStartTimes} value={timeStart} onChange={handleStartTimeChange} className={styles.dropDownWrapper}/>
                </div>
                <div className={styles.dropDownWrapper}>
                    <p className={styles.dropDownTitle}>End time</p>
                    <Dropdown options={availableEndTimes} value={timeEnd} onChange={handleEndTimeChange} className={styles.dropDownWrapper}/>
                </div>
            </div>
            <div className={styles.footer}>
                <div className={styles.buttonWrapper}>
                    <PrimaryButton onClick={handleTimesChange} text="Save"/>
                </div>
            </div>
        </div>
    )
}

export default AdminTimeEditor

