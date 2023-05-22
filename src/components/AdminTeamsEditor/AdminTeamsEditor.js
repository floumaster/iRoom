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

const AdminTeamsEditor = () => {

    const [title, setTitle] = useState('')
    const [color, setColor] = useState('')
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

    const handleChangeColor = (e) =>{
        setColor(e.target.value)
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
        setIsModalVisible(false)
        setTitle('')
        setColor('')
    }

    const businessUnitCreateForm = () => {
        return (
            <div className={styles.formWrapper}>
                <input className={styles.input} onChange={handleChangeValue} placeholder='Title'/>
                <input className={styles.input} onChange={handleChangeColor} type="color" />
            </div>
        )
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
                modalContent={businessUnitCreateForm}
                modalTitle="Create business unit"
                onCloseModal={closeFloorCreateModal}
                isSubmitDisabled={isSubmitDisabled}
                onSubmit={teamCreate}
            />}
        </div>
    )
}

export default AdminTeamsEditor

