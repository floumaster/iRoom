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
import { editFloor as  editFloorApiCall} from '../../redux/floorsSlice'
import WarningPopup from '../Modal/WarningPopup/WarningPopup'
import { deleteFloor } from '../../redux/floorsSlice'

const AdminFloorsEditor = ({ setContentTitle }) => {

    const [chosenId, setChosenId] = useState('')
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [isWarningVisible, setIsWarningVisible] = useState(false)
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true)
    const [title, setTitle] = useState('')
    const [selectedFloorId, setSelectedFloorId] = useState('')
    const [isModalCreateMode, setIsModalCreateMode] = useState(true)

    const selectFloor = (id, floorName) => {
        setContentTitle(`Floor ${floorName}`)
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

    const editFloor = () => {
        dispatch(editFloorApiCall(
            {
                id: chosenId,
                name: title,
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
        setIsModalCreateMode(true)
        setTitle('')
        setIsModalVisible(true)
    }

    const onCloseModal = () => {
        setIsModalVisible(false)
    }

    const unselectFloor = () => {
        setSelectedFloorId(null)
    }

    const handleOpenWarning = (e, floor) => {
        e.stopPropagation()
        setChosenId(floor.id)
        setIsWarningVisible(true)
    }

    const submitDelete = () => {
        dispatch(deleteFloor(chosenId))
    }

    const handleCloseWarning = () => {
        setIsWarningVisible(false)
    }

    const handleOpenEditForm = (e, floor) => {
        e.stopPropagation()
        setChosenId(floor.id)
        setIsModalCreateMode(false)
        setTitle(floor.name)
        setIsModalVisible(true)
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
                                    <div className={floor.id === selectedFloorId ? `${styles.floorWrapper} ${styles.selected}` : styles.floorWrapper} onClick={() => selectFloor(floor.id, floor.name)}>
                                        <p className={styles.floorTitle}>Floor {floor.name}</p>
                                        <div className={styles.iconWrapper}>
                                            <img src={Edit} alt="edit" className={styles.icon} onClick={(e) => handleOpenEditForm(e, floor)}/>
                                            <img src={Delete} alt="delete" className={styles.icon} onClick={(e) => handleOpenWarning(e, floor)}/>
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
            isCreateMode={isModalCreateMode}
            modalContent={floorCreateForm}
            modalTitle={isModalCreateMode ? "Create floor" : "Edit floor"}
            onCloseModal={onCloseModal}
            isSubmitDisabled={isSubmitDisabled}
            onSubmit={isModalCreateMode ? floorCreate : editFloor}
        />}
        {isWarningVisible &&
        <WarningPopup
            title="Delete floor"
            text="Delete selected floor? This action can’t be undone"
            handleClosePopup={handleCloseWarning}
            onSubmit={submitDelete}
        />}
        </>
    )
}

export default AdminFloorsEditor

