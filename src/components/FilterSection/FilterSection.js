import React, { useState, useCallback } from "react";
import styles from "./styles.module.css"
import PrimaryButton from "../buttons/PrimaryButton/PrimaryButton";
import CommonButton from "../buttons/CommonButton/CommonButton";
import { useDispatch, useSelector } from "react-redux";
import { setFloors } from "../../redux/floorsSlice";
import { setRooms } from "../../redux/roomsSlice";
import { getAvailabilityOfRooms } from '../../utils/availability'


const FilterSection = () => {

    const dispatch = useDispatch()
    const floors = useSelector(store => store.floorsSlice.floors)
    const [backupFloors, setBackUpFloors] = useState(floors)
    const assets = useSelector(store => store.assetsSlice.assets)
    const rooms = useSelector(store => store.roomsSlice.rooms)
    const currentPeriod = useSelector(store => store.periodSlice.period)
    const bookings = useSelector(store => store.bookingsSlice.bookings)
    const currentDate = useSelector(store => store.dateSlice.date)
    const times = useSelector(store => store.timesSlice.times)
    const [backupRooms, setBackUpRooms] = useState(rooms)
    const capacities = [...new Set(backupRooms.map(room => room.capacity))].map(capacity => ({
        title: `${capacity} seats`,
        type: 'checkbox'
    }))

    const filterData = [
        {
            title: 'Floor',
            items: backupFloors.map(asset => ({
                ...asset,
                title: asset.name,
                type: 'checkbox'
            }))
        },
        {
            title: 'Features',
            items: assets.map(asset => ({
                ...asset,
                title: asset.name,
                type: 'checkbox'
            }))
        },
        {
            title: 'Capacity',
            items: capacities
        },
        {
            title: 'Availability',
            items: [
                {
                    title: 'Fully available',
                    type: 'checkbox'
                },
                {
                    title: 'Partly available',
                    type: 'checkbox'
                },
                {
                    title: 'Fully booked',
                    type: 'checkbox'
                }
            ]
        },
    ]

    const filterByFloor = (values) => {
        const processedValues = values.map(value => value.name)
        if(processedValues.length)
            dispatch(setFloors(backupFloors.filter(floor => processedValues.includes(floor.name))))
    }

    const filterByFeature = (values) => {
        const filteredAssetsIds = assets
        .filter(asset => values.map(value => value.name).includes(asset.name))
        .map(val => val.id)
        if(filteredAssetsIds.length){
            const filteredRooms = backupRooms.filter(room => {
                return room.assetsIds.some( id => filteredAssetsIds.includes(id))
            })
            dispatch(setRooms(filteredRooms))
        }   
    }

    const filterByCapacity = (values) => {
        const processedCapacities = values.map(val => parseInt(val.name.split(' ')[0]))
        if(processedCapacities.length){
            const filteredRooms = backupRooms.filter(room => {
                return processedCapacities.includes(room.capacity)
            })
            dispatch(setRooms(filteredRooms))
        }  
    }

    const filterByAvailability = (values) => {
        const availability = getAvailabilityOfRooms(backupRooms, bookings, currentPeriod, currentDate, times)
        if(values.length){
            const filteredRooms = []
            values.forEach(value => {
                if(value.name === 'Fully available')
                    filteredRooms.push(...availability.available)
                else if(value.name === 'Partly available')
                    filteredRooms.push(...availability.partly)
                else
                    filteredRooms.push(...availability.booked)
            })
            dispatch(setRooms(filteredRooms))
        }  
    }

    const handleResetFilter = (e) => {
        Array.from(document.getElementsByClassName('filterCheckbox')).forEach(element => element.checked = false)
        e.preventDefault()
        dispatch(setFloors([...backupFloors]))
        dispatch(setRooms([...backupRooms]))
    }

    const filterEntities = (filterData) => {
        filterData.forEach(data => {
            switch(data.name){
                case 'Floor':
                    filterByFloor(data.values)
                    break;
                case 'Features':
                    filterByFeature(data.values)
                    break;
                case 'Capacity':
                    filterByCapacity(data.values)
                    break;
                case 'Availability':
                    filterByAvailability(data.values)
                    break;
                default:
                    break;
            }
        })
    }

    const handleOnSubmit = (e) => {
        e.preventDefault()
        const _filterData = []
        let iterator = 0
        filterData.forEach((filterItem, id) => {
            const _filterItem = {
                name: filterItem.title,
                values: []
            }
            filterItem.items.forEach((subItem, subId) => {
                if(e.target[iterator].checked)
                    _filterItem.values.push({
                        name: subItem.title
                    })
                iterator++
            })
            _filterData.push(_filterItem)
        })
        filterEntities(_filterData)
    }

    return (
        <div className={styles.filterWrapper}>
            <form className={styles.filter} onSubmit={handleOnSubmit}>
                <p className={styles.filterTitle}>Filter by</p>
                <div className={styles.filterItemsWrapper}>
                    {
                        filterData.map(filterItem => {
                            return (
                                <div className={styles.filterItemWrapper}>
                                    <p className={styles.filterItemTitle}>{filterItem.title}</p>
                                    <div className={styles.filterSubItemsWrapper}>
                                        {
                                            filterItem.items.map(subItem => {
                                                return (
                                                    <div className={styles.filterSubItemWrapper}>
                                                        {
                                                            subItem.type === 'checkbox' ?
                                                            <input type="checkbox" className="filterCheckbox"/> :
                                                            null
                                                        }
                                                        <p className={styles.filterSubItemTitle}>{subItem.title}</p>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className={styles.rangeWrapper}>
                    <div className={styles.startRangeWrapper}>
                        <p className={styles.startRangeTitle}>From</p>
                        <input className={styles.startRangeInput}/>
                    </div>
                    <div className={styles.startRangeWrapper}>
                        <p className={styles.startRangeTitle}>To</p>
                        <input className={styles.startRangeInput} />
                    </div>
                </div>
                <div className={styles.buttonsWrapper}>
                    <PrimaryButton />
                    <CommonButton text="Reset" onClick={handleResetFilter}/>
                </div>
            </form>
        </div>
    )
}

export default FilterSection