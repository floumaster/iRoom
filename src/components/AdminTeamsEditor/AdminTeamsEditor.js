import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import { useSelector } from 'react-redux'
import PrimaryButton from '../buttons/PrimaryButton/PrimaryButton'
import { useDispatch } from 'react-redux'
import { setModalContent, setIsModalVisible, setIsSubmitDisabled, setOnSubmitFunk, setModalTitle } from '../../redux/modalSlice'
import { createAsset } from '../../redux/assetsSlice'
import { v4 as uuidv4 } from 'uuid';
import { addTeam } from '../../redux/teamsSlice'
import Modal from '../Modal/Modal'
import Edit from '../../assets/icons/edit.svg'
import Delete from '../../assets/icons/delete.svg'
import { editTeam } from '../../redux/teamsSlice'
import WarningPopup from '../Modal/WarningPopup/WarningPopup'
import { deleteTeam } from '../../redux/teamsSlice'

const AdminTeamsEditor = () => {

    const [chosenId, setChosenId] = useState('')
    const [title, setTitle] = useState('')
    const [color, setColor] = useState('')
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

    const handleChangeColor = (e) =>{
        setColor(e.target.value)
    }

    const teamEdit = () => {
        dispatch(editTeam(
            {
                id: chosenId,
                name: title,
                color
            }
        ))
        closeFloorCreateModal()
    }

    const teamCreate = () => {
        dispatch(addTeam(
            {
                id: uuidv4(),
                name: title,
                color
            },
        ))
        closeFloorCreateModal()
    }

    const dispatch = useDispatch()
    
    const teams = useSelector(store => store.teamsSlice.teams)

    const openFloorCreateModal = () => {
        setIsModalVisible(true)
    }

    const closeFloorCreateModal = () => {
        setIsModalCreateMode(true)
        setIsModalVisible(false)
        setTitle('')
        setColor('')
    }

    const businessUnitCreateForm = () => {
        return (
            <div className={styles.formWrapper}>
                <input className={styles.input} onChange={handleChangeValue} placeholder='Title' value={title}/>
                <input className={styles.input} onChange={handleChangeColor} type="color" value={color}/>
            </div>
        )
    }

    const handleOpenEditForm = (e, team) => {
        setChosenId(team.id)
        setIsModalCreateMode(false)
        setIsModalVisible(true)
        setTitle(team.name)
        setColor(team.color)
        e.stopPropagation()
    }

    const handleOpenWarning = (e, team) => {
        setChosenId(team.id)
        e.stopPropagation()
        setIsWarningVisible(true)
    }

    const handleCloseWarning = () => {
        setIsWarningVisible(false)
    }

    const submitDelete = () => {
        dispatch(deleteTeam(chosenId))
    }

    return (
        <div className={styles.contentWrapper}>
            <div className={styles.buttonWrapper}>
                <PrimaryButton text="+ BUSINESS UNIT" onClick={openFloorCreateModal}/>
            </div>
            <div className={styles.floorsWrapper}>
                {
                    teams.map(team => {
                        return (
                            <div className={styles.floorWrapper}>
                                <p className={styles.floorTitle}>{team.name}</p>
                                <div className={styles.iconWrapper}>
                                    <img src={Edit} alt="edit" className={styles.icon} onClick={(e) => handleOpenEditForm(e, team)}/>
                                    <img src={Delete} alt="delete" className={styles.icon} onClick={(e) => handleOpenWarning(e, team)}/>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            {isModalVisible &&
            <Modal
                isCreateMode={isModalCreateMode}
                modalContent={businessUnitCreateForm}
                modalTitle={isModalCreateMode ? "Create business unit" : "Edit business unit"}
                onCloseModal={closeFloorCreateModal}
                isSubmitDisabled={isSubmitDisabled}
                onSubmit={isModalCreateMode ? teamCreate : teamEdit}
            />}
            {isWarningVisible &&
                <WarningPopup
                    title="Delete business unit"
                    text="Delete selected business unit? This action can’t be undone"
                    handleClosePopup={handleCloseWarning}
                    onSubmit={submitDelete}
                />}
        </div>
    )
}

export default AdminTeamsEditor

