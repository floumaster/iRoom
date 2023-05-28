import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import { useSelector } from 'react-redux'
import PrimaryButton from '../buttons/PrimaryButton/PrimaryButton'
import { useDispatch } from 'react-redux'
import { createPurpose } from '../../redux/purposesSlice'
import { v4 as uuidv4 } from 'uuid';
import Modal from '../Modal/Modal'
import Edit from '../../assets/icons/edit.svg'
import Delete from '../../assets/icons/delete.svg'
import { editPurpose } from '../../redux/purposesSlice'
import WarningPopup from '../Modal/WarningPopup/WarningPopup'
import { deletePurpose } from '../../redux/purposesSlice'

const AdminPurposesEditor = () => {

    const [chosenId, setChosenId] = useState('')
    const [title, setTitle] = useState('')
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true)
    const [isModalCreateMode, setIsModalCreateMode] = useState(true)
    const [isWarningVisible, setIsWarningVisible] = useState(false)

    const handleChangeValue = (e) =>{
        if(e.target.value.length === 0){
            setIsSubmitDisabled(true)
        }
        else{
            setIsSubmitDisabled(false)
        }
        setTitle(e.target.value)
    }

    const purposeCreate = () => {
        dispatch(createPurpose(
            {
                id: uuidv4(),
                value: title
            }
        ))
        setIsModalVisible(false)
    }

    const purposeEdit = () => {
        dispatch(editPurpose(
            {
                id: chosenId,
                value: title
            }
        ))
        setIsModalVisible(false)
    }

    const dispatch = useDispatch()
    
    const purposes = useSelector(store => store.purposesSlice.purposes)

    const openPurposeCreateModal = () => {
        setIsModalCreateMode(true)
        setIsModalVisible(true)
    }

    const closePurposeCreateModal = () => {
        setIsModalVisible(false)
        setTitle('')
    } 

    const purposeCreateForm = () => {
        return (
            <div className={styles.formWrapper}>
                <input className={styles.input} onChange={handleChangeValue} value={title} placeholder='Purpose'/>
            </div>
        )
    }

    const handleOpenEditForm = (e, purpose) => {
        setChosenId(purpose.id)
        setIsModalCreateMode(false)
        setIsModalVisible(true)
        setTitle(purpose.value)
        e.stopPropagation()
    }

    const handleOpenWarning = (e, purpose) => {
        setChosenId(purpose.id)
        e.stopPropagation()
        setIsWarningVisible(true)
    }

    const handleCloseWarning = () => {
        setIsWarningVisible(false)
    }

    const submitDelete = () => {
        dispatch(deletePurpose(chosenId))
    }

    return (
        <div className={styles.contentWrapper}>
            <div className={styles.buttonWrapper}>
                <PrimaryButton text="+ PURPOSE" onClick={openPurposeCreateModal}/>
            </div>
            <div className={styles.floorsWrapper}>
                {
                    purposes.map(floor => {
                        return (
                            <div className={styles.floorWrapper}>
                                <p className={styles.floorTitle}>{floor.value}</p>
                                <div className={styles.iconWrapper}>
                                    <img src={Edit} alt="edit" className={styles.icon} onClick={(e) => handleOpenEditForm(e, floor)}/>
                                    <img src={Delete} alt="delete" className={styles.icon} onClick={(e) => handleOpenWarning(e, floor)}/>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            {isModalVisible &&
            <Modal
                isCreateMode={isModalCreateMode}
                modalContent={purposeCreateForm}
                modalTitle={isModalCreateMode ? "Create purpose" : "Edit purpose"}
                onCloseModal={closePurposeCreateModal}
                isSubmitDisabled={isSubmitDisabled}
                onSubmit={isModalCreateMode ? purposeCreate : purposeEdit}
            />}
            {isWarningVisible &&
                <WarningPopup
                    title="Delete purpose"
                    text="Delete selected purpose? This action can’t be undone"
                    handleClosePopup={handleCloseWarning}
                    onSubmit={submitDelete}
                />}
        </div>
    )
}

export default AdminPurposesEditor

