import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import { useSelector } from 'react-redux'
import PrimaryButton from '../buttons/PrimaryButton/PrimaryButton'
import { useDispatch } from 'react-redux'
import { setModalContent, setIsModalVisible, setIsSubmitDisabled, setOnSubmitFunk } from '../../redux/modalSlice'
import { createAsset } from '../../redux/assetsSlice'
import { v4 as uuidv4 } from 'uuid';

const assetCreateForm = (handleChangeValue) => {
    return () => {
        return (
            <div className={styles.formWrapper}>
                <input className={styles.input} onChange={handleChangeValue} placeholder='Title'/>
            </div>
        )
    }
}

const AdminAssetsEditor = () => {

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
            dispatch(createAsset(
                {
                    id: uuidv4(),
                    name: title
                }
            ))
            dispatch(setIsModalVisible(false))
        }
    }

    useEffect(() => {
        dispatch(setOnSubmitFunk(assetCreate(title)))
    }, [title])

    const dispatch = useDispatch()
    
    const assets = useSelector(store => store.assetsSlice.assets)
    
    const setModalInfo = () => {
        dispatch(setIsSubmitDisabled(true))
        dispatch(setModalContent(assetCreateForm(handleChangeValue)))
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
                    assets.map(floor => {
                        return (
                            <div className={styles.floorWrapper}>
                                <p className={styles.floorTitle}>{floor.name}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default AdminAssetsEditor

