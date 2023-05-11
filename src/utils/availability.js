import moment from "moment"

const minutes = ['00', 15, 30, 45]

export const checkTimeAndDateForBooking = (time, date, bookings) => {
    const formatedCurrentDate = date.format('YYYY-MM-DD')
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

export const checkDayForBusiness = (day, bookingsInCurrentRoom, times) => {
    let availableTimesNumber = 0
    times.forEach(time => {
        minutes.forEach(subTime => {
            const formatedTime = `${time.title}:${subTime}`
            const booking = checkTimeAndDateForBooking(formatedTime, day.date, bookingsInCurrentRoom)
            if(!booking){
                availableTimesNumber++
            }
        })
    })
    return availableTimesNumber
}

export const getColorByDayAvailability = (availableTimes, times) => {
    const maxTimes = times.length * minutes.length
    if(availableTimes === maxTimes)
        return 'transparent'
    if(availableTimes === 0)
        return '#ff0000'
    return '#ffb300'
}

export const getAvailabilityOfRooms = (rooms, bookings, period, day, times) => {
    const maxTimesPerDay = times.length * minutes.length
    const partly = []
    const booked = []
    const available = []
    rooms.forEach(room => {
        if(period.id === 0){
            const bookingsInCurrentRoom = bookings.filter(booking => room.bookingsIds.includes(booking.id))
            const availableTimesNumber = checkDayForBusiness({ date: day }, bookingsInCurrentRoom, times)
            if(availableTimesNumber === maxTimesPerDay)
                available.push(room)
            else if(availableTimesNumber === 0)
                booked.push(room)
            else
                partly.push(room)
        }
        else if(period.id === 1){
            let availableTimesNumber = 0
            for(let i = 0; i < 7; i++){
                const currentDate = moment(day).add(i, 'days')
                const bookingsInCurrentRoom = bookings.filter(booking => room.bookingsIds.includes(booking.id))
                availableTimesNumber += checkDayForBusiness({ date: currentDate }, bookingsInCurrentRoom, times)
            }
            if(availableTimesNumber === maxTimesPerDay * 7)
                available.push(room)
            else if(availableTimesNumber === 0)
                booked.push(room)
            else
                partly.push(room)
        }
        else{
            let availableTimesNumber = 0
            for(let i = 0; i < moment(day).daysInMonth(); i++){
                const currentDate = moment(day).add(i, 'days')
                const bookingsInCurrentRoom = bookings.filter(booking => room.bookingsIds.includes(booking.id))
                availableTimesNumber += checkDayForBusiness({ date: currentDate }, bookingsInCurrentRoom, times)
            }
            if(availableTimesNumber === maxTimesPerDay * moment(day).daysInMonth())
                available.push(room)
            else if(availableTimesNumber === 0)
                booked.push(room)
            else
                partly.push(room)
        }
    })
    const result = {
        partly,
        booked,
        available
    }
    return result
}

const processTime = (time) => {
    return time?.length === 5 ? time : 0+time
}

export const getAllAvailableStartTimes = (times, bookings, currentDate, currentBooking) => {
    const prefixDate = currentDate.format('YYYY-MM-DDT')
    const hoursWithMinutes = []
    times.forEach(hour => {
        minutes.forEach(minute => {
            hoursWithMinutes.push(`${hour}:${minute}`)
        })
    })
    const availableStartTimes = []
    hoursWithMinutes.forEach(time => {
        const processedTime = processTime(time)
        let isTimeAvailable = true
        const processedDate = `${prefixDate}${processedTime}`
        bookings.filter(booking => booking.id !== currentBooking?.id).forEach(booking => {
            const dateStart = moment(`${prefixDate}${booking.timeStart}`)
            const dateEnd = moment(`${prefixDate}${booking.timeEnd}`)
            if(dateStart <= moment(processedDate) && moment(processedDate) < dateEnd)
                isTimeAvailable = false
        });
        if(isTimeAvailable)
            availableStartTimes.push(time)
    })
    return availableStartTimes
}

export const getAllAvailableEndTimes = (times, bookings, currentDate, selectedStartTime, currentBooking) => {
    const hoursWithMinutes = []
    times.forEach(hour => {
        minutes.forEach(minute => {
            hoursWithMinutes.push(`${hour}:${minute}`)
        })
    })
    console.log(times)
    const prefixDate = currentDate.format('YYYY-MM-DDT')
    const endTimes = []
    const lastHour = parseInt(hoursWithMinutes[hoursWithMinutes.length - 1].split(':')[0])
    hoursWithMinutes.push(`${lastHour + 1}:00`)
    hoursWithMinutes.forEach((time, id) => {
        const processedTime = processTime(time)
        const processedStartTime = processTime(selectedStartTime)
        const processedDate = `${prefixDate}${processedTime}`
        const processedStartDate = `${prefixDate}${processedStartTime}`
        if(moment(processedDate) > moment(processedStartDate)){
            const isTimeAvailable = bookings.filter(booking => {
                const dateStart = moment(`${prefixDate}${booking.timeStart}`)
                return dateStart > moment(processedStartDate) && booking.id !== currentBooking?.id
            }).every(booking => {
                const dateStart = moment(`${prefixDate}${booking.timeStart}`)
                return moment(processedDate) <= dateStart && moment(processedDate) > moment(processedStartDate)
            })
            if(isTimeAvailable)
                endTimes.push(time)
            else
                return endTimes
        }
    })
    return endTimes
}