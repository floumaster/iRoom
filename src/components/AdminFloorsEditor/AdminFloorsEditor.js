import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import { useSelector } from 'react-redux'
import PrimaryButton from '../buttons/PrimaryButton/PrimaryButton'
import { useDispatch } from 'react-redux'
import { setModalContent, setIsModalVisible, setIsSubmitDisabled, setOnSubmitFunk, setModalTitle } from '../../redux/modalSlice'
import { addFloor } from '../../redux/floorsSlice'
import { v4 as uuidv4 } from 'uuid';
import AdminRoomsEditor from '../AdminRoomsEditor/AdminRoomsEditor'
import Modal from '../Modal/Modal'
import Edit from '../../assets/icons/edit.svg'
import Delete from '../../assets/icons/delete.svg'

const AdminFloorsEditor = ({ setContentTitle }) => {

    const [isModalVisible, setIsModalVisible] = useState(false)
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true)
    const [title, setTitle] = useState('')
    const [selectedFloorId, setSelectedFloorId] = useState('')

    const selectFloor = (id) => {
        setSelectedFloorId(id)
    }

    const dispatch = useDispatch()

    const floorCreate = () => {
        dispatch(addFloor(
            {
                id: uuidv4(),
                name: title,
                number: 3,
                roomsIds: []
            }
        ))
        setIsModalVisible(false)
    }

    const handleChangeValue = (e) =>{
        if(e.target.value.length === 0){
            setIsSubmitDisabled(true)
        }
        else{
            setIsSubmitDisabled(false)
        }
        setTitle(e.target.value)
    }

    const floorCreateForm = () => {

        return (
            <div className={styles.formWrapper}>
                <input className={styles.input} onChange={handleChangeValue} value={title} placeholder='Title'/>
            </div>
        )
    }
    
    const floors = useSelector(store => store.floorsSlice.floors)


    const openFloorCreateModal = () => {
        setTitle('')
        setIsModalVisible(true)
    }

    const onCloseModal = () => {
        setIsModalVisible(false)
    }

    const unselectFloor = () => {
        setSelectedFloorId(null)
    }

    return (
        <>
        {
            selectedFloorId ? (
                <AdminRoomsEditor floorId={selectedFloorId} setContentTitle={setContentTitle} unselectFloor={unselectFloor}/>
            ) : (
                <div className={styles.contentWrapper}>
                    <div className={styles.buttonWrapper}>
                        <PrimaryButton text="+ FLOOR" onClick={openFloorCreateModal}/>
                    </div>
                    <div className={styles.floorsWrapper}>
                        {
                            floors.map(floor => {
                                return (
                                    <div className={floor.id === selectedFloorId ? `${styles.floorWrapper} ${styles.selected}` : styles.floorWrapper} onClick={() => selectFloor(floor.id)}>
                                        <p className={styles.floorTitle}>Floor {floor.name}</p>
                                        <div className={styles.iconWrapper}>
                                            <img src={Edit} alt="edit" className={styles.icon} onClick={() => {}}/>
                                            <img src={Delete} alt="delete" className={styles.icon} onClick={() => {}}/>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            )
        }
        {isModalVisible &&
        <Modal
            modalContent={floorCreateForm}
            modalTitle="Create floor"
            onCloseModal={onCloseModal}
            isSubmitDisabled={isSubmitDisabled}
            onSubmit={floorCreate}
        />}
        </>
    )
}

export default AdminFloorsEditor

