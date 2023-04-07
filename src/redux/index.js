import { combineReducers, configureStore } from '@reduxjs/toolkit'
import roomsSlice from './roomsSlice'
import floorsSlice from './floorsSlice'
import timesSlice from './timesSlice'
import assetsSlice from './assetsSlice'
import bookingsSlice from './bookingsSlice'
import teamsSlice from './teamsSlice'

const rootReducer = combineReducers({
    roomsSlice: roomsSlice,
    floorsSlice: floorsSlice,
    timesSlice: timesSlice,
    assetsSlice: assetsSlice,
    bookingsSlice: bookingsSlice,
    teamsSlice: teamsSlice
})

export const store = configureStore({
    reducer: rootReducer
})