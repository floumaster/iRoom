import { v4 as uuidv4 } from 'uuid';
import moment from "moment";

export const getNextMonthWeeks = (currentDate) => {
    const daysInMonths = moment().daysInMonth()
    const weeksInMonths = daysInMonths / 7
    const monthWeeks = []
    for(let i = 0; i < weeksInMonths; i++){
        const daysleft = daysInMonths - 7 * i
        const nextdaysNumber = daysleft < 7 ? daysleft : 7
        const nextMonthDays = daysleft < 7 ? (i) * 7 + daysleft : (i + 1) * 7
        monthWeeks.push({
            id: uuidv4(),
            time: `${moment(currentDate).add(i * 7, 'days').format('MMM DD')} to ${moment(currentDate).add(nextMonthDays, 'days').format('MMM DD')}`,
            days: getNextWeekofSomeDay(moment(currentDate).add(i * 7, 'days'), nextdaysNumber)
        })
    }
    return monthWeeks
}

export const getNextWeekDays = (currentDate) => {
    const weekDays = []
    for(let i = 0; i < 7; i++){
        weekDays.push({
            id: uuidv4(),
            time: moment(currentDate).add(i, 'days').format('dddd MMMM DD'),
            date: moment(currentDate).add(i, 'days')
        })
    }
    return weekDays
}

export const getNextWeekofSomeDay = (day, maxDays = 6) => {
    const weekDays = []
    for(let i = 0; i < maxDays; i++){
        weekDays.push({
            id: uuidv4(),
            title: moment(day).add(i, 'days').format('dd').substring(0, 1),
            date: moment(day).add(i, 'days')
        })
    }
    return weekDays
}

export const checkTimeForBooking = (time, bookings, currentDate) => {
    const formatedCurrentDate = currentDate.format('YYYY-MM-DD')
    const formatedTime = moment(`${formatedCurrentDate}T${time}`)
    let _booking = null
    bookings.forEach(booking => {
        booking.dates.forEach(date => {
            const dateStart = moment(`${date}T${booking.timeStart}`)
            const dateEnd = moment(`${date}T${booking.timeEnd}`)
            if(dateStart <= formatedTime && formatedTime < dateEnd){
                _booking = booking
                return _booking
            }
        })
    })
    return _booking
}