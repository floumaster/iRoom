import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import { useSelector } from 'react-redux'
import PrimaryButton from '../buttons/PrimaryButton/PrimaryButton'
import { useDispatch } from 'react-redux'
import { setModalContent, setIsModalVisible, setIsSubmitDisabled, setOnSubmitFunk, setModalTitle } from '../../redux/modalSlice'
import { createPurpose } from '../../redux/purposesSlice'
import { v4 as uuidv4 } from 'uuid';

const purposeCreateForm = (handleChangeValue) => {
    return () => {
        return (
            <div className={styles.formWrapper}>
                <input className={styles.input} onChange={handleChangeValue} placeholder='Purpose'/>
            </div>
        )
    }
}

const AdminPurposesEditor = () => {

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

    const assetCreate = (title) => {
        return () => {
            dispatch(createPurpose(
                {
                    id: uuidv4(),
                    value: title
                }
            ))
            dispatch(setIsModalVisible(false))
        }
    }

    useEffect(() => {
        dispatch(setOnSubmitFunk(assetCreate(title)))
    }, [title])

    const dispatch = useDispatch()
    
    const purposes = useSelector(store => store.purposesSlice.purposes)
    
    const setModalInfo = () => {
        dispatch(setIsSubmitDisabled(true))
        dispatch(setModalContent(purposeCreateForm(handleChangeValue)))
        dispatch(setModalTitle('Create purpose'))
        dispatch(setIsModalVisible(true))
    }

    const openFloorCreateModal = () => {
        setModalInfo()
    }

    return (
        <div className={styles.contentWrapper}>
            <div className={styles.buttonWrapper}>
                <PrimaryButton text="+ ASSET" onClick={openFloorCreateModal}/>
            </div>
            <div className={styles.floorsWrapper}>
                {
                    purposes.map(floor => {
                        return (
                            <div className={styles.floorWrapper}>
                                <p className={styles.floorTitle}>{floor.value}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default AdminPurposesEditor

