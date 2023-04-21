import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import { useSelector } from 'react-redux'
import PrimaryButton from '../buttons/PrimaryButton/PrimaryButton'
import { useDispatch } from 'react-redux'
import { setModalContent, setIsModalVisible, setIsSubmitDisabled, setOnSubmitFunk, setModalTitle } from '../../redux/modalSlice'
import { createAsset } from '../../redux/assetsSlice'
import { v4 as uuidv4 } from 'uuid';
import { addTeam } from '../../redux/teamsSlice'

const businessUnitCreateForm = (handleChangeValue, handleChangeColor) => {
    return () => {
        return (
            <div className={styles.formWrapper}>
                <input className={styles.input} onChange={handleChangeValue} placeholder='Title'/>
                <input className={styles.input} onChange={handleChangeColor} type="color" />
            </div>
        )
    }
}

const AdminTeamsEditor = () => {

    const [title, setTitle] = useState('')
    const [color, setColor] = useState('')

    const handleChangeValue = (e) =>{
        if(e.target.value.length === 0){
            dispatch(setIsSubmitDisabled(true))
        }
        else{
            dispatch(setIsSubmitDisabled(false))
        }
        setTitle(e.target.value)
    }

    const handleChangeColor = (e) =>{
        setColor(e.target.value)
    }

    const teamCreate = (title, color) => {
        return () => {
            dispatch(addTeam(
                {
                    id: uuidv4(),
                    name: title,
                    color
                },
            ))
            dispatch(setIsModalVisible(false))
        }
    }

    useEffect(() => {
        dispatch(setOnSubmitFunk(teamCreate(title, color)))
    }, [title, color])

    const dispatch = useDispatch()
    
    const teams = useSelector(store => store.teamsSlice.teams)
    
    const setModalInfo = () => {
        dispatch(setIsSubmitDisabled(true))
        dispatch(setModalContent(businessUnitCreateForm(handleChangeValue, handleChangeColor)))
        dispatch(setModalTitle('Create business unit'))
        dispatch(setIsModalVisible(true))
    }

    const openFloorCreateModal = () => {
        setModalInfo()
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
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default AdminTeamsEditor

