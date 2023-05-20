import { combineReducers, configureStore } from '@reduxjs/toolkit'
import roomsSlice from './roomsSlice'
import floorsSlice from './floorsSlice'
import timesSlice from './timesSlice'
import assetsSlice from './assetsSlice'
import bookingsSlice from './bookingsSlice'
import teamsSlice from './teamsSlice'
import dateSlice from './dateSlice'
import periodSlice from './periodSlice'
import recurringsSlice from './recurringsSlice'
import purposesSlice from './purposesSlice'
import modalSlice from './modalSlice'
import usersSlice from './usersSlice'
import meetingModalSlice from './meetingModalSlice'

const rootReducer = combineReducers({
    roomsSlice: roomsSlice,
    floorsSlice: floorsSlice,
    timesSlice: timesSlice,
    assetsSlice: assetsSlice,
    bookingsSlice: bookingsSlice,
    teamsSlice: teamsSlice,
    dateSlice: dateSlice,
    periodSlice: periodSlice,
    recurringsSlice: recurringsSlice,
    purposesSlice: purposesSlice,
    modalSlice: modalSlice,
    usersSlice: usersSlice,
    meetingModalSlice: meetingModalSlice
})

export const store = configureStore({
    reducer: rootReducer
})