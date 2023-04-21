import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import { useSelector } from 'react-redux'
import PrimaryButton from '../buttons/PrimaryButton/PrimaryButton'
import { useDispatch } from 'react-redux'
import { setModalContent, setIsModalVisible, setIsSubmitDisabled, setOnSubmitFunk } from '../../redux/modalSlice'
import { createFloor } from '../../redux/floorsSlice'
import { v4 as uuidv4 } from 'uuid';

const floorCreateForm = (handleChangeValue) => {
    return () => {
        return (
            <div className={styles.formWrapper}>
                <input className={styles.input} onChange={handleChangeValue} placeholder='Title'/>
            </div>
        )
    }
}

const AdminFloorsEditor = () => {

    const [title, setTitle] = useState('')

    const handleChangeValue = (e) =>{
        if(e.target.value.length === 0){
            dispatch(setIsSubmitDisabled(true))
        }
        else{
            dispatch(setIsSubmitDisabled(false))
        }
        setTitle(e.target.value)
    }

    const floorCreate = (title) => {
        return () => {
            dispatch(createFloor(
                {
                    id: uuidv4(),
                    name: title,
                    number: 3,
                    roomsIds: []
                }
            ))
            dispatch(setIsModalVisible(false))
        }
    }

    useEffect(() => {
        dispatch(setOnSubmitFunk(floorCreate(title)))
    }, [title])

    const dispatch = useDispatch()
    
    const floors = useSelector(store => store.floorsSlice.floors)
    
    const setModalInfo = () => {
        dispatch(setIsSubmitDisabled(true))
        dispatch(setModalContent(floorCreateForm(handleChangeValue)))
        dispatch(setIsModalVisible(true))
    }

    const openFloorCreateModal = () => {
        setModalInfo()
    }

    return (
        <div className={styles.contentWrapper}>
            <div className={styles.buttonWrapper}>
                <PrimaryButton text="+ FLOOR" onClick={openFloorCreateModal}/>
            </div>
            <div className={styles.floorsWrapper}>
                {
                    floors.map(floor => {
                        return (
                            <div className={styles.floorWrapper}>
                                <p className={styles.floorTitle}>Floor {floor.name}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default AdminFloorsEditor

