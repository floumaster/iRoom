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

const AdminPurposesEditor = () => {

    const [title, setTitle] = useState('')
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true)

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

    const dispatch = useDispatch()
    
    const purposes = useSelector(store => store.purposesSlice.purposes)

    const openPurposeCreateModal = () => {
        setIsModalVisible(true)
    }

    const closePurposeCreateModal = () => {
        setIsModalVisible(false)
        setTitle(false)
    } 

    const purposeCreateForm = () => {
        return (
            <div className={styles.formWrapper}>
                <input className={styles.input} onChange={handleChangeValue} value={title} placeholder='Purpose'/>
            </div>
        )
    }

    return (
        <div className={styles.contentWrapper}>
            <div className={styles.buttonWrapper}>
                <PrimaryButton text="+ ASSET" onClick={openPurposeCreateModal}/>
            </div>
            <div className={styles.floorsWrapper}>
                {
                    purposes.map(floor => {
                        return (
                            <div className={styles.floorWrapper}>
                                <p className={styles.floorTitle}>{floor.value}</p>
                                <div className={styles.iconWrapper}>
                                    <img src={Edit} alt="edit" className={styles.icon} onClick={() => {}}/>
                                    <img src={Delete} alt="delete" className={styles.icon} onClick={() => {}}/>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            {isModalVisible &&
            <Modal
                modalContent={purposeCreateForm}
                modalTitle="Create purpose"
                onCloseModal={closePurposeCreateModal}
                isSubmitDisabled={isSubmitDisabled}
                onSubmit={purposeCreate}
            />}
        </div>
    )
}

export default AdminPurposesEditor

