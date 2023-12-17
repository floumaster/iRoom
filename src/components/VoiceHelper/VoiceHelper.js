import React, { useEffect, useState, useRef } from 'react'
import styles from "./styles.module.css"
import { Mushroom } from './Mushroom'
import { Canvas, useThree } from "@react-three/fiber";
import { Float, OrbitControls } from "@react-three/drei";
import microIcon from './../../assets/icons/micro.svg'
import { useNavigate } from "react-router-dom";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import { addBooking, editBooking, deleteBooking } from "../../redux/bookingsSlice";
import { addBookingToRoom } from "../../redux/roomsSlice";
import moment from 'moment';
import { addFloor } from '../../redux/floorsSlice';
import { setTimes } from '../../redux/timesSlice';
import { createAsset } from '../../redux/assetsSlice';
import { setFloors } from '../../redux/floorsSlice';
import { setRooms } from '../../redux/roomsSlice';
import { deleteRoom } from '../../redux/roomsSlice'
import { createRoom } from '../../redux/roomsSlice'
import { editRoom } from '../../redux/roomsSlice'
import { addRoomToFloor } from '../../redux/floorsSlice'
import * as THREE from 'three';
import { editFloor as editFloorApiCall} from '../../redux/floorsSlice';
import { deleteFloor } from '../../redux/floorsSlice'
import { getAvailabilityOfRooms } from '../../utils/availability'

function Controls() {
    const {
      camera,
      gl: {domElement},
    } = useThree();
    return <OrbitControls args={[camera, domElement]} />;
  }

const VoiceHelper = () => {
    const navigate = useNavigate()
    const [isVoiceRecording, setIsVoiceRecording] = useState(false)
    let utterance = new SpeechSynthesisUtterance();
    const currentDate = useSelector(store => store.dateSlice.date)
    const bookings = useSelector(store => store.bookingsSlice.bookings)

    const [recordingType, setRecordingType] = useState(0)
    const [animationName, setAnimationName] = useState('')

    const mashroomActiosRef = useRef(null)

    const animationNames = {
        DefaultHelloAnim: 'DefaultHelloAnim',
        FalseResultAnim: 'FalseResultAnim',
        ListenAnim: 'ListenAnim',
        TrueResultAnim: 'TrueResultAnim',
    }
 
    const currenUser = useSelector(store => store.usersSlice.currentUser)
    const rooms = useSelector(store => store.roomsSlice.rooms)
    const dispatch = useDispatch()

    const searchRoomByName = (name) => rooms.find(room => room.name.toLowerCase() === name)

    /******/
    const [room, setRoom] = useState('')
    const [title, setTitle] = useState('')
    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')
    const [description, setDescription] = useState('')
    const [selectedRecurring, setSelectedRecurring] = useState('No recurring')
    const [selectedRecurringEnd, setSelectedRecurringEnd] = useState('2024-01-01')
    /******/

    const floors = useSelector(store => store.floorsSlice.floors)
    const assets = useSelector(store => store.assetsSlice.assets)
    const [backupFloors, setBackUpFloors] = useState(floors)
    const [backupRooms, setBackUpRooms] = useState(rooms)
    const [selectedFilterData, setSelectedFilterData] = useState(null)
    const currentPeriod = useSelector(store => store.periodSlice.period)
    const times = useSelector(store => store.timesSlice.times)

    const [bookingToEdit, setBookingToEdit] = useState(null)
    const [buffer, setSuffer] = useState(null)

    useEffect(() => {
        utterance.voice = window.speechSynthesis.getVoices()[1]
    }, [])

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    const startListenAnim = () => {
        mashroomActiosRef.current[animationNames.TrueResultAnim].stop()
        mashroomActiosRef.current[animationNames.FalseResultAnim].stop()
        mashroomActiosRef.current[animationNames.DefaultHelloAnim].stop()
        mashroomActiosRef.current.ListenAnim.play()
    }

    const stopListenAnim = () => {
        mashroomActiosRef.current[animationNames.ListenAnim].stop()
    }

    const succressResultAnim = () => {
        mashroomActiosRef.current[animationNames.TrueResultAnim].setLoop(THREE.LoopOnce).play()
    }

    const wrongResultAnim = () => {
        mashroomActiosRef.current[animationNames.FalseResultAnim].setLoop(THREE.LoopOnce).play()
    }

    const processRoomDelete = () => {
        const room = rooms.find(room => room.name.toLowerCase() === transcript)
        if(room){
            succressResultAnim()
            dispatch(deleteRoom(room.id))
            setRecordingType(0)
        }
        else{
            wrongResultAnim()
            utterance.text = 'I cant find room with such name. Try again';
            utterance.voice = window.speechSynthesis.getVoices()[1]
            window.speechSynthesis.speak(utterance)
        }
    }

    const processRoomEditAssets = () => {
        if(transcript !== 'continue'){
            const processedValues = transcript.split(' and ').map(el => el.toLowerCase())
            const filteredAssetsIds = assets
            .filter(asset => processedValues.includes(asset.name.toLowerCase()))
            .map(val => val.id)
            dispatch(editRoom(
                {
                    id: buffer.room.id,
                    name: buffer.room.title,
                    capacity: buffer.room.capacity,
                    assetsIds: filteredAssetsIds,
                }
            ))
        }
        else{
            dispatch(editRoom(
                {
                    id: buffer.room.id,
                    name: buffer.room.title,
                    capacity: buffer.room.capacity,
                    assetsIds: buffer.room.assetsIds,
                }
            ))
        }
        succressResultAnim()
        setRecordingType(0)
    }

    const processRoomEditCapacity = () => {
        if(transcript !== 'continue'){
            const number = transcript.split('capacity is ')[1]
            const parsedNumber = parseInt(number)
            if(!isNaN(parsedNumber) && Number.isInteger(parsedNumber)){
                setSuffer({
                    ...buffer,
                    room: {
                        ...buffer.room,
                        capacity: parsedNumber
                    }
                })
                succressResultAnim()
                utterance.text = 'List the assets that will be present in the room';
                utterance.voice = window.speechSynthesis.getVoices()[1]
                window.speechSynthesis.speak(utterance)
                setRecordingType(35)
            }
            else{
                wrongResultAnim()
                utterance.text = 'The capacity is invalid. Try again.';
                utterance.voice = window.speechSynthesis.getVoices()[1]
                window.speechSynthesis.speak(utterance)
            }
        }
        else{
            succressResultAnim()
            utterance.text = 'List the assets that will be present in the room';
            utterance.voice = window.speechSynthesis.getVoices()[1]
            window.speechSynthesis.speak(utterance)
            setRecordingType(35)
        }
        
    }

    const processRoomEditTitle2 = () => {
        if(transcript !== 'continue')
            setSuffer({
                ...buffer,
                room: {
                    ...buffer.room,
                    title: transcript
                }
            })
        else{
            setSuffer({
                ...buffer,
                room: {
                    ...buffer.room,
                }
            })
        }
        succressResultAnim()
        utterance.text = 'Choose room new capacity or say continue not to edit it';
        utterance.voice = window.speechSynthesis.getVoices()[1]
        window.speechSynthesis.speak(utterance)
        setRecordingType(34)

    }

    const processRoomEditTitle = () => {
        const room = rooms.find(room => room.name.toLowerCase() === transcript)
        if(room){
            succressResultAnim()
            setSuffer({
                ...buffer,
                room: {
                    ...room
                }
            })
            utterance.text = 'Choose room new title or say continue not to edit it';
            utterance.voice = window.speechSynthesis.getVoices()[1]
            window.speechSynthesis.speak(utterance)
            setRecordingType(341)
        }
        else{
            wrongResultAnim()
            utterance.text = 'I cant find room with such name. Try again';
            utterance.voice = window.speechSynthesis.getVoices()[1]
            window.speechSynthesis.speak(utterance)
        }
    }

    const processDeleteFloor = () =>{
        let el = transcript.split('floor ')[1]
        if(el === '1') el = 'one'
        if(el === '2') el = 'two'
        if(el === '3') el = 'three'
        if(el === '4') el = 'four'
        if(el === '5') el = 'five'
        if(el === '6') el = 'six'
        if(el === '7') el = 'seven'
        if(el === '8') el = 'eight'
        if(el === '9') el = 'nine'
        if(el === '10') el = 'ten'
        const floor = floors.find(floor => floor.name.toLowerCase() === el)
        if(floor){
            succressResultAnim()
            dispatch(deleteFloor(floor.id))
            setRecordingType(0)
        }
        else{
            wrongResultAnim()
            utterance.text = 'Unfortunately i cant find floor with such name. Try again';
            utterance.voice = window.speechSynthesis.getVoices()[1]
            window.speechSynthesis.speak(utterance)
        }
    }

    const processRoomRegistrateAssets = () => {
        const processedValues = transcript.split(' and ').map(el => el.toLowerCase())
        const filteredAssetsIds = assets
        .filter(asset => processedValues.includes(asset.name.toLowerCase()))
        .map(val => val.id)
        const newRoomId = uuidv4()
        dispatch(createRoom(
            {
                id: newRoomId,
                name: buffer.room.title,
                capacity: buffer.room.capacity,
                assetsIds: filteredAssetsIds,
                bookingsIds: [],
                floorId: buffer.id
            }
        ))
        dispatch(addRoomToFloor({
            floorId: buffer.id,
            roomId: newRoomId
        }))
        succressResultAnim()
        setRecordingType(0)
    }

    const processFloorEdit = () => {
        succressResultAnim()
        dispatch(editFloorApiCall(
            {
                id: buffer.id,
                name: transcript,
            }
        ))
        setRecordingType(0)
    }

    const processRoomRegistrateCapacity = () => {
        const number = transcript.split('capacity is ')[1]
        const parsedNumber = parseInt(number)
        if(!isNaN(parsedNumber) && Number.isInteger(parsedNumber)){
            setSuffer({
                ...buffer,
                room: {
                    ...buffer.room,
                    capacity: parsedNumber
                }
            })
            succressResultAnim()
            utterance.text = 'List the assets that will be present in the room';
            utterance.voice = window.speechSynthesis.getVoices()[1]
            window.speechSynthesis.speak(utterance)
            setRecordingType(31)
        }
        else{
            wrongResultAnim()
            utterance.text = 'The capacity is invalid. Try again.';
            utterance.voice = window.speechSynthesis.getVoices()[1]
            window.speechSynthesis.speak(utterance)
        }
    }

    const processRoomRegistrateTitle = () => {
        setSuffer({
            ...buffer,
            room: {
                title: transcript
            }
        })
        succressResultAnim()
        utterance.text = 'Choose room capacity. It should be integer';
        utterance.voice = window.speechSynthesis.getVoices()[1]
        window.speechSynthesis.speak(utterance)
        setRecordingType(30)
    }

    const processEditFloorChoosing = (onSuccess) => {
        let el = transcript.split('floor ')[1]
        if(el === '1') el = 'one'
        if(el === '2') el = 'two'
        if(el === '3') el = 'three'
        if(el === '4') el = 'four'
        if(el === '5') el = 'five'
        if(el === '6') el = 'six'
        if(el === '7') el = 'seven'
        if(el === '8') el = 'eight'
        if(el === '9') el = 'nine'
        if(el === '10') el = 'ten'
        const floor = floors.find(floor => floor.name.toLowerCase() === el)
        if(floor){
            setSuffer(floor)
            onSuccess()
        }
        else{
            wrongResultAnim()
            utterance.text = 'Unfortunately i cant find floor with such name. Try again';
            utterance.voice = window.speechSynthesis.getVoices()[1]
            window.speechSynthesis.speak(utterance)
        }
    }

    const processFilterFloors = () => {
        const processedValues = transcript.split(' ').map(el => {
            if(el === '1') return 'one'
            if(el === '2') return 'two'
            if(el === '3') return 'three'
            if(el === '4') return 'four'
            if(el === '5') return 'five'
            if(el === '6') return 'six'
            if(el === '7') return 'seven'
            if(el === '8') return 'eight'
            if(el === '9') return 'nine'
            if(el === '10') return 'ten'
            return el
        })
        if(transcript.length)
            dispatch(setFloors(backupFloors.filter(floor => processedValues.includes(floor.name.toLowerCase()))))
        succressResultAnim()
        utterance.text = 'list the assets';
        utterance.voice = window.speechSynthesis.getVoices()[1]
        window.speechSynthesis.speak(utterance)
        setRecordingType(21)
    }

    const processClearFilters = () => {
        if(transcript === 'reset'){
            succressResultAnim()
            dispatch(setRooms(backupRooms))
            dispatch(setFloors(backupFloors))
        }
        else{
            wrongResultAnim()
            utterance.text = 'Unfortunately i cant understand your command. Try again.';
            utterance.voice = window.speechSynthesis.getVoices()[1]
            window.speechSynthesis.speak(utterance)
        }
        setRecordingType(0)
    }

    const processFilterAvailability = () => {
        const values = transcript.split(' and ')
        const availability = getAvailabilityOfRooms(backupRooms, bookings, currentPeriod, currentDate, times)
        if(values.length){
            const filteredRooms = []
            values.forEach(value => {
                if(value === 'fully available')
                    filteredRooms.push(...availability.available)
                else if(value === 'partly available')
                    filteredRooms.push(...availability.partly)
                else if(value === 'fully booked')
                    filteredRooms.push(...availability.booked)
            })
            dispatch(setRooms(filteredRooms))
        }
        succressResultAnim()
        utterance.text = 'now your rooms are filtered. Say reset to clear filters';
        utterance.voice = window.speechSynthesis.getVoices()[1]
        window.speechSynthesis.speak(utterance)
        setRecordingType(24)
    }

    const processFilterCapacity = () => {
        const processedCapacities = transcript.split(' ').map(val => parseInt(val))
        if(processedCapacities.length){
            const filteredRooms = backupRooms.filter(room => {
                return processedCapacities.includes(room.capacity)
            })
            dispatch(setRooms(filteredRooms))
        }
        succressResultAnim()
        utterance.text = 'list the availability';
        utterance.voice = window.speechSynthesis.getVoices()[1]
        window.speechSynthesis.speak(utterance)
        setRecordingType(23)
    }

    const processFilterFeatures = () => {
        const processedValues = transcript.split(' and ').map(el => el.toLowerCase())
        const filteredAssetsIds = assets
        .filter(asset => processedValues.includes(asset.name.toLowerCase()))
        .map(val => val.id)
        if(filteredAssetsIds.length){
            const filteredRooms = backupRooms.filter(room => {
                return room.assetsIds.some( id => filteredAssetsIds.includes(id))
            })
            dispatch(setRooms(filteredRooms))
        }
        succressResultAnim()
        utterance.text = 'list the capacity';
        utterance.voice = window.speechSynthesis.getVoices()[1]
        window.speechSynthesis.speak(utterance)
        setRecordingType(22)
    }

    const navigateToHome = () => {
        navigate('/')
        succressResultAnim()
    }

    const navigateToAdminPanel = () => {
        navigate('/admin')
        succressResultAnim()
    }
    
    const navigateToMyBookings = () => {
        navigate('/myBookings')
        succressResultAnim()
    }

    const handleTimesChange = (timeStart, timeEnd) => {
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

    const processNewAssetCreation = () => {
        succressResultAnim()
        dispatch(createAsset(
            {
                id: uuidv4(),
                name: transcript
            }
        ))
        setRecordingType(0)
    }

    const processNewFloorCreation = () => {
        succressResultAnim()
        dispatch(addFloor(
            {
                id: uuidv4(),
                name: transcript,
                number: 3,
                roomsIds: []
            }
        ))
        setRecordingType(0)
    }

    const processEditBookingDescription = () => {
        if(!transcript === 'continue')
            setBookingToEdit(booking => ({
                ...booking,
                description: transcript
            }))
        succressResultAnim()
        utterance.text = `Now you have the ${bookingToEdit.title} booking
between ${bookingToEdit.timeStart} and ${bookingToEdit.timeEnd} with ${transcript} description`;
        utterance.voice = window.speechSynthesis.getVoices()[1]
        window.speechSynthesis.speak(utterance)
        const bookingModel = {
            ...bookingToEdit,
            id: bookingToEdit.id,
            timeStart: bookingToEdit.timeStart.length === 4 ? '0' + bookingToEdit.timeStart : bookingToEdit.timeStart,
            timeEnd: bookingToEdit.timeEnd.length === 4 ? '0' + bookingToEdit.timeEnd : bookingToEdit.timeEnd,
            title: bookingToEdit.title,
            dates: getDatesByRecurrency(bookingToEdit.recurring, bookingToEdit.deadline),
            description: transcript
        }
        dispatch(editBooking(bookingModel))
        setRecordingType(0)
    }

    const processEditBookingRecurring = () => {
        if(transcript === 'continue'){
            succressResultAnim()
            utterance.text = 'Choose a new deadline for the booking or say continue not to change the previous value.';
            utterance.voice = window.speechSynthesis.getVoices()[1]
            window.speechSynthesis.speak(utterance)
            setRecordingType(15)
        }
        else if(['no recurring', 'once a day', 'once a week', 'once a month', 'once every two days'].includes(transcript)){
            succressResultAnim()
            setBookingToEdit(booking => ({
                ...booking,
                recurring: transcript
            }))
            utterance.text = 'Choose a new deadline for the booking or say continue not to change the previous value.';
            utterance.voice = window.speechSynthesis.getVoices()[1]
            window.speechSynthesis.speak(utterance)
            setRecordingType(15)
        }
        else{
            wrongResultAnim()
            utterance.text = 'Unfortunately the recurring is invalid. Try to choose another.';
            utterance.voice = window.speechSynthesis.getVoices()[1]
            window.speechSynthesis.speak(utterance)
        }
    }

    const processEditBookingRecurringDeadLine = () => {
        const date = moment(transcript)
        if(transcript === 'continue'){
            succressResultAnim()
            utterance.text = 'Choose a new description for the booking or say continue not to change the previous value.';
            utterance.voice = window.speechSynthesis.getVoices()[1]
            window.speechSynthesis.speak(utterance)
            setRecordingType(16)
        }
        else if(date.isValid()){
            const dateWithCurrentYear = moment(`${moment().year()}-${date.format(`MM-DD`)}`)
            if(moment() < dateWithCurrentYear){
                if(moment().year() > date.year()){
                    succressResultAnim()
                    setBookingToEdit(booking => ({
                        ...booking,
                        deadline: dateWithCurrentYear.format(`YYYY-MM-DD`)
                    }))
                }
                else{
                    succressResultAnim()
                    setBookingToEdit(booking => ({
                        ...booking,
                        deadline: date.format(`YYYY-MM-DD`)
                    }))
                }
                succressResultAnim()()
                utterance.text = 'Choose a new description for the booking or say continue not to change the previous value.';
                utterance.voice = window.speechSynthesis.getVoices()[1]
                window.speechSynthesis.speak(utterance)
                setRecordingType(16)
            }
            else{
                wrongResultAnim()
                utterance.text = 'You must select a date later than today. Try again.';
                utterance.voice = window.speechSynthesis.getVoices()[1]
                window.speechSynthesis.speak(utterance)
            }
        }
        else{
            utterance.text = 'The date is invalid. Try again.';
            utterance.voice = window.speechSynthesis.getVoices()[1]
            window.speechSynthesis.speak(utterance)
        }
    }

    const processEditBookingName = () => {
        if(transcript !== 'continue'){
            setBookingToEdit(booking => ({
                ...booking,
                title: transcript
            }))
        }
        utterance.text = 'Choose a new recurring for the booking or say continue not to change the previous value.';
        utterance.voice = window.speechSynthesis.getVoices()[1]
        window.speechSynthesis.speak(utterance)
        setRecordingType(14) 
    }

    const processEditBookingTime = () => {
        const startTime = transcript.split(' to ')[0]?.split('from ')?.[1]
        const endTime = transcript.split(' to ')?.[1]
        if(parseInt(startTime) <= parseInt(endTime) && parseInt(startTime) > 5 && parseInt(endTime) < 23){
            succressResultAnim()
            setBookingToEdit(booking => ({
                ...booking,
                timeStart: processTime(startTime),
                timeEnd: processTime(endTime)
            }))
            utterance.text = 'Choose a new title for the booking or say continue not to change the previous value.';
            utterance.voice = window.speechSynthesis.getVoices()[1]
            window.speechSynthesis.speak(utterance)
            setRecordingType(13) 
        }
        else if(transcript === 'continue'){
            succressResultAnim()
            utterance.text = 'Choose a new title for the booking or say continue not to change the previous value.';
            utterance.voice = window.speechSynthesis.getVoices()[1]
            window.speechSynthesis.speak(utterance)
            setRecordingType(13)
        }
        else{
            wrongResultAnim()
            utterance.text = 'Unfortunately this period of time is invalid. Try to choose another.';
            utterance.voice = window.speechSynthesis.getVoices()[1]
            window.speechSynthesis.speak(utterance)
        }
    }

    const processBookingEdit = () => {
        const booking = bookings.find(_booking => _booking.title.toLowerCase() === transcript)
        if(booking){
            succressResultAnim()
            setBookingToEdit(booking)
            utterance.text = `The booking ${booking.title} scheduled
between ${booking.timeStart} and ${booking.timeEnd} with ${description} description found.
        Choose a new duration for the booking or say continue not to change the previous values.`;
        utterance.voice = window.speechSynthesis.getVoices()[1]
            window.speechSynthesis.speak(utterance)
            setRecordingType(12)
        }
        else{
            wrongResultAnim()
            utterance.text = 'Unfortunately i cant find booking with such name. Try to choose another.';
            utterance.voice = window.speechSynthesis.getVoices()[1]
            window.speechSynthesis.speak(utterance)
        }
    }

    const processWorkingHours = () => {
        const startTime = transcript.split(' to ')[0]?.split('from ')?.[1]
        const endTime = transcript.split(' to ')?.[1]
        if(parseInt(startTime) <= parseInt(endTime) && parseInt(startTime) > 5 && parseInt(endTime) < 23){
            succressResultAnim()
            handleTimesChange(startTime, endTime)
            setRecordingType(0) 
        }
        else{
            wrongResultAnim()
            utterance.text = 'Unfortunately this period of time is invalid. Try to choose another.';
            utterance.voice = window.speechSynthesis.getVoices()[1]
            window.speechSynthesis.speak(utterance)
        }
    }

    const processBookingDeleteConfirmation = () => {
        if(transcript === 'delete'){
            const bookingWithoutCurrentDate = {
                ...bookingToEdit,
                dates: bookingToEdit.dates.filter(date => date !== currentDate.format('YYYY-MM-DD')),
                
            }
            dispatch(deleteBooking({
                updatedBooking: bookingWithoutCurrentDate
            }))
            setRecordingType(0)
        }
        else if(transcript !== 'cancel'){
            utterance.text = 'Unfortunately i cant recognize your command. Try again.';
            utterance.voice = window.speechSynthesis.getVoices()[1]
            window.speechSynthesis.speak(utterance)
        }
    }

    const processBookingDelete = () => {
        const booking = bookings.find(_booking => _booking.title.toLowerCase() === transcript)
        if(booking){
            succressResultAnim()
            setBookingToEdit(booking)
            utterance.text = `The booking ${booking.title} scheduled
between ${booking.timeStart} and ${booking.timeEnd} with ${description} description found.
        Say delete to confirm or say cancel to return`;
        utterance.voice = window.speechSynthesis.getVoices()[1]
            window.speechSynthesis.speak(utterance)
            setRecordingType(19)
        }
        else{
            wrongResultAnim()
            utterance.text = 'Unfortunately i cant find booking with such name. Try to choose another.';
            utterance.voice = window.speechSynthesis.getVoices()[1]
            window.speechSynthesis.speak(utterance)
        }
    }

    const processBaseRecording = () => {
        if(transcript === 'navigate to admin panel'){
            navigateToAdminPanel()
        }
        else if(transcript === 'navigate to homepage'){
            navigateToHome()
        }
        else if(transcript === 'navigate to my bookings page'){
            navigateToMyBookings()
        }
        else if(transcript === 'create a meeting'){
            succressResultAnim()
            utterance.text = 'Which room are you planning the meeting in?';
            utterance.voice = window.speechSynthesis.getVoices()[1]
            window.speechSynthesis.speak(utterance)
            setRecordingType(1)
        }
        else if(transcript === 'change working hours'){
            succressResultAnim()
            utterance.text = 'Say the opening and closing hours of the offices';
            utterance.voice = window.speechSynthesis.getVoices()[1]
            window.speechSynthesis.speak(utterance)
            setRecordingType(8)
        }
        else if(transcript === 'registrate floor'){
            succressResultAnim()
            utterance.text = 'Choose a title for the new floor';
            utterance.voice = window.speechSynthesis.getVoices()[1]
            window.speechSynthesis.speak(utterance)
            setRecordingType(9)
        }
        else if(transcript === 'registrate asset'){
            succressResultAnim()
            utterance.text = 'Choose a title for the new asset';
            utterance.voice = window.speechSynthesis.getVoices()[1]
            window.speechSynthesis.speak(utterance)
            setRecordingType(10)
        }
        else if(transcript === 'edit booking'){
            succressResultAnim()
            utterance.text = 'Choose a title for your booking that you want to edit';
            utterance.voice = window.speechSynthesis.getVoices()[1]
            window.speechSynthesis.speak(utterance)
            setRecordingType(11)
        }
        else if(transcript === 'delete booking'){
            succressResultAnim()
            utterance.text = 'Choose a title for your booking that you want to delete';
            utterance.voice = window.speechSynthesis.getVoices()[1]
            window.speechSynthesis.speak(utterance)
            setRecordingType(18)
        }
        else if(transcript === 'filter rooms'){
            succressResultAnim()
            utterance.text = 'list the floors titles';
            utterance.voice = window.speechSynthesis.getVoices()[1]
            window.speechSynthesis.speak(utterance)
            setRecordingType(20)
        }
        else if(transcript === 'edit floor'){
            succressResultAnim()
            utterance.text = 'Choose floor title that you want to edit';
            utterance.voice = window.speechSynthesis.getVoices()[1]
            window.speechSynthesis.speak(utterance)
            setRecordingType(25)
        }
        else if(transcript === 'delete floor'){
            succressResultAnim()
            utterance.text = 'Choose floor title that you want to delete';
            utterance.voice = window.speechSynthesis.getVoices()[1]
            window.speechSynthesis.speak(utterance)
            setRecordingType(27)
        }
        else if(transcript === 'registrate room'){
            succressResultAnim()
            utterance.text = 'Choose floor title that you want to registrate a room in';
            utterance.voice = window.speechSynthesis.getVoices()[1]
            window.speechSynthesis.speak(utterance)
            setRecordingType(28)
        }
        else if(transcript.toLowerCase() === 'edit room'){
            succressResultAnim()
            utterance.text = 'Choose floor title that you want to edit a room in';
            utterance.voice = window.speechSynthesis.getVoices()[1]
            window.speechSynthesis.speak(utterance)
            setRecordingType(32)
        }
        else if(transcript.toLowerCase() === 'delete room'){
            succressResultAnim()
            utterance.text = 'Choose floor title that you want to delete a room in';
            utterance.voice = window.speechSynthesis.getVoices()[1]
            window.speechSynthesis.speak(utterance)
            setRecordingType(36)
        }
        else {
            wrongResultAnim()
            utterance.text = 'Unfortunately i cant understand your command. Try again';
            utterance.voice = window.speechSynthesis.getVoices()[1]
            window.speechSynthesis.speak(utterance)
        }
    }

    const processRoomInfo = () => {
        const room = searchRoomByName(transcript)
        if(room){
            setRoom(room)
            succressResultAnim()
            utterance.text = 'Which time do you prefer to book a meeting';
            utterance.voice = window.speechSynthesis.getVoices()[1]
            window.speechSynthesis.speak(utterance)
            setRecordingType(2)
        }
        else{
            wrongResultAnim()
            utterance.text = 'Unfortunately i cant find room with such name. Try to choose another.';
            utterance.voice = window.speechSynthesis.getVoices()[1]
            window.speechSynthesis.speak(utterance)
        }
    }

    const processTime = (time) => {
        let updatedTime = time
        if(updatedTime.length < 2){
            updatedTime = '0' + updatedTime
        }
        if(!updatedTime.includes(':')){
            updatedTime += ':00'
        }
        return updatedTime
    }

    const processBookingConfirmation = () => {
        if(transcript === 'create'){
            succressResultAnim()
            handleBookingCreate()
            setRecordingType(0)
        }
        else{
            wrongResultAnim()
        }
    }

    const processDescription = () => {
        setDescription(transcript)
        succressResultAnim()
        utterance.text = `Say create to create a booking in ${room.name}
between ${startTime} and ${endTime} with ${selectedRecurring} recurring with title ${title} and ${description} description`;
        utterance.voice = window.speechSynthesis.getVoices()[1]
        window.speechSynthesis.speak(utterance)
        setRecordingType(7)
    }

    const processRecurringDeadLineInfo = () => {
        const date = moment(transcript)
        if(date.isValid()){
            const dateWithCurrentYear = moment(`${moment().year()}-${date.format(`MM-DD`)}`)
            if(moment() < dateWithCurrentYear){
                if(moment().year() > date.year()){
                    setSelectedRecurringEnd(dateWithCurrentYear.format(`YYYY-MM-DD`))
                }
                else{
                    setSelectedRecurringEnd(date.format(`YYYY-MM-DD`))
                }
                succressResultAnim()
                utterance.text = 'Choose description for the meeting';
                utterance.voice = window.speechSynthesis.getVoices()[1]
                window.speechSynthesis.speak(utterance)
                setRecordingType(6)
            }
            else{
                wrongResultAnim()
                utterance.text = 'You must select a date later than today. Try again.';
                utterance.voice = window.speechSynthesis.getVoices()[1]
                window.speechSynthesis.speak(utterance)
            }
        }
        else{
            wrongResultAnim()
            utterance.text = 'The date is invalid. Try again.';
            utterance.voice = window.speechSynthesis.getVoices()[1]
            window.speechSynthesis.speak(utterance)
        }
    }

    const processRecurringInfo = () => {
        if(['no recurring', 'once a day', 'once a week', 'once a month', 'once every two days'].includes(transcript)){
            succressResultAnim()
            setSelectedRecurring(transcript)
            utterance.text = 'Choose deadline for the meeting';
            utterance.voice = window.speechSynthesis.getVoices()[1]
            window.speechSynthesis.speak(utterance)
            setRecordingType(5)
        }
        else{
            wrongResultAnim()
            utterance.text = 'Unfortunately the recurring is invalid. Try to choose another.';
            utterance.voice = window.speechSynthesis.getVoices()[1]
            window.speechSynthesis.speak(utterance)
        }
    }

    const processTitleInfo = () => {
        setTitle(transcript)
        utterance.text = 'Choose recurring for the meeting';
        utterance.voice = window.speechSynthesis.getVoices()[1]
        window.speechSynthesis.speak(utterance)
        setRecordingType(4)
    }

    const processTimeInfo = () => {
        const prefixDate = currentDate.format('YYYY-MM-DDT')
        const startTime = processTime(transcript.split(' to ')[0].split('from ')[1])
        const processedDateStart = moment(`${prefixDate}${startTime}`)
        const endTime = processTime(transcript.split(' to ')[1])
        const processedDateEnd = moment(`${prefixDate}${endTime}`)
        if(processedDateEnd > processedDateStart){
            setStartTime(startTime)
            setEndTime(endTime)
            succressResultAnim()
            utterance.text = 'Choose title for the meeting';
            utterance.voice = window.speechSynthesis.getVoices()[1]
            window.speechSynthesis.speak(utterance)
            setRecordingType(3)
        }
        else{
            wrongResultAnim()
            utterance.text = 'Unfortunately this period of time is invalid. Try to choose another.';
            utterance.voice = window.speechSynthesis.getVoices()[1]
            window.speechSynthesis.speak(utterance)
        }
    }

    const onMicroClickHandler = () => {
        if(isVoiceRecording){
            stopListenAnim()
            console.log('stop recording')
            SpeechRecognition.stopListening()
            setIsVoiceRecording(false)
            switch(recordingType){
                case 0:
                    processBaseRecording()
                    break
                case 1:
                    processRoomInfo()
                    break
                case 2:
                    processTimeInfo()
                    break
                case 3:
                    processTitleInfo()
                    break
                case 4:
                    processRecurringInfo()
                    break
                case 5:
                    processRecurringDeadLineInfo()
                    break
                case 6:
                    processDescription()
                    break
                case 7:
                    processBookingConfirmation()
                    break
                case 8:
                    processWorkingHours()
                    break
                case 9:
                    processNewFloorCreation()
                    break
                case 10:
                    processNewAssetCreation()
                    break
                case 11:
                    processBookingEdit()
                    break
                case 12:
                    processEditBookingTime()
                    break
                case 13:
                    processEditBookingName()
                    break
                case 14:
                    processEditBookingRecurring()
                    break
                case 15:
                    processEditBookingRecurringDeadLine()
                    break
                case 16:
                    processEditBookingDescription()
                    break
                case 18:
                    processBookingDelete()
                    break
                case 19:
                    processBookingDeleteConfirmation()
                    break
                case 20:
                    processFilterFloors()
                    break
                case 21:
                    processFilterFeatures()
                    break
                case 22:
                    processFilterCapacity()
                    break
                case 23:
                    processFilterAvailability()
                    break
                case 24:
                    processClearFilters()
                    break
                case 25:
                    processEditFloorChoosing(() => {
                        succressResultAnim()
                        utterance.text = `Choose new title for the floor`;
                        utterance.voice = window.speechSynthesis.getVoices()[1]
                        window.speechSynthesis.speak(utterance)
                        setRecordingType(26)
                    })
                    break
                case 26:
                    processFloorEdit()
                    break
                case 27:
                    processDeleteFloor()
                    break
                case 28:
                    processEditFloorChoosing(() => {
                        succressResultAnim()
                        utterance.text = `Choose title for the room`;
                        utterance.voice = window.speechSynthesis.getVoices()[1]
                        window.speechSynthesis.speak(utterance)
                        setRecordingType(29)
                    })
                    break
                case 29:
                    processRoomRegistrateTitle()
                    break
                case 30:
                    processRoomRegistrateCapacity()
                    break
                case 31:
                    processRoomRegistrateAssets()
                    break
                case 32:
                    processEditFloorChoosing(() => {
                        succressResultAnim()
                        utterance.text = `Choose title for the room that you want to edit`;
                        utterance.voice = window.speechSynthesis.getVoices()[1]
                        window.speechSynthesis.speak(utterance)
                        setRecordingType(33)
                    })
                    break
                case 33:
                    processRoomEditTitle()
                    break
                case 341:
                    processRoomEditTitle2()
                    break
                case 34:
                    processRoomEditCapacity()
                    break
                case 35:
                    processRoomEditAssets()
                    break
                case 36:
                    processEditFloorChoosing(() => {
                        succressResultAnim()
                        utterance.text = `Choose title for the room that you want to delete`;
                        utterance.voice = window.speechSynthesis.getVoices()[1]
                        window.speechSynthesis.speak(utterance)
                        setRecordingType(37)
                    })
                    break
                case 37:
                    processRoomDelete()
                    break
                
            }
        }
        else{
            console.log('start recording', recordingType)
            startListenAnim()
            setIsVoiceRecording(true)
            resetTranscript()
            SpeechRecognition.startListening({continuous: true, language: 'en'})
        }
    }

    const handleBookingCreate = () => {
        const newBookingId = uuidv4()
        const bookingModel = {
            id: newBookingId,
            timeStart: startTime,
            timeEnd: endTime,
            title: title,
            teamId: 'xzvcxvc-fdhfdhhg-vnbvcnbvcb',
            purposeId: 'vcczvc-vcnbcvmh-retertret',
            dates: getDatesByRecurrency(),
            userId: currenUser.id,
            roomId: room.id,
            description: description
        }
        dispatch(addBooking(bookingModel))
        dispatch(addBookingToRoom({
            roomId: room.id,
            bookingId: newBookingId
        }))
    }

    const getDatesByRecurrency = (_selectedRecurring, _selectedRecurringEnd) => {
        const rucurring = _selectedRecurring || selectedRecurring
        const end = _selectedRecurringEnd || selectedRecurringEnd
        switch(rucurring){
            case 'no recurring':
                return generateDatesByGap(1, currentDate)
            case 'once a day':
                return generateDatesByGap(1, end)
            case 'once a week':
                return generateDatesByGap(7, end)
            case 'once a month':
                return generateDatesByGap(31, end)
            case 'once every two days':
                return generateDatesByGap(2, end)
            default:
                return [currentDate.format('YYYY-MM-DD')]
        }
    }

    const generateDatesByGap = (daysGap, recurringEndDate = '2024-01-01') => {
        const dates = []
        let processedDate = currentDate
        while(moment(processedDate) <= moment(recurringEndDate)){
            dates.push(processedDate.format('YYYY-MM-DD'))
            processedDate = moment(processedDate).add(daysGap, 'days')
        }
        return dates
    }

    return (
        <div className={styles.helperWindow}>
            <div className={styles.modelWrapper}>
                <Canvas>
                    <Controls/>
                    <Float >
                        <ambientLight intensity={1} />
                        <Mushroom mashroomActiosRef={mashroomActiosRef}/>
                    </Float>
                </Canvas>
            </div>
            <div className={styles.microWrapper}>
                <img src={microIcon} className={styles.icon} onClick={onMicroClickHandler}/>
                <div className={styles.dialogWrapper}>
                    <h5 className={styles.monologue}>- {transcript}</h5>
                </div>
            </div>
        </div>
    )
}

export default VoiceHelper