import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import { useSelector } from 'react-redux'
import PrimaryButton from '../buttons/PrimaryButton/PrimaryButton'
import { useDispatch } from 'react-redux'
import { setModalContent, setIsModalVisible, setIsSubmitDisabled, setOnSubmitFunk, setModalTitle } from '../../redux/modalSlice'
import { createAsset } from '../../redux/assetsSlice'
import { v4 as uuidv4 } from 'uuid';
import Modal from '../Modal/Modal'
import Edit from '../../assets/icons/edit.svg'
import Delete from '../../assets/icons/delete.svg'
import { editAsset } from '../../redux/assetsSlice'
import WarningPopup from '../Modal/WarningPopup/WarningPopup'
import { deleteAsset } from '../../redux/assetsSlice'

const AdminAssetsEditor = () => {

    const [title, setTitle] = useState('')
    const [chosenId, setChosenId] = useState('')
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

    const assetCreateForm = () => {
        return (
            <div className={styles.formWrapper}>
                <input className={styles.input} onChange={handleChangeValue} value={title} placeholder='Title'/>
            </div>
        )
    }

    const assetCreate = () => {
        dispatch(createAsset(
            {
                id: uuidv4(),
                name: title
            }
        ))
        setIsModalVisible(false)
    }

    const assetEdit = () => {
        dispatch(editAsset(
            {
                id: chosenId,
                name: title
            }
        ))
        setIsModalVisible(false)
    }

    const handleOpenWarning = (e, asset) => {
        setChosenId(asset.id)
        e.stopPropagation()
        setIsWarningVisible(true)
    }

    const handleCloseWarning = () => {
        setIsWarningVisible(false)
    }

    const dispatch = useDispatch()
    
    const assets = useSelector(store => store.assetsSlice.assets)

    const openAssetCreateModal = () => {
        setIsModalCreateMode(true)
        setIsModalVisible(true)
    }

    const closeAssetCreateModal = () => {
        setIsModalVisible(false)
        setTitle('')
    } 

    const handleOpenEditForm = (e, asset) => {
        setChosenId(asset.id)
        setIsModalCreateMode(false)
        setTitle(asset.name)
        setIsModalVisible(true)
        e.stopPropagation()
    }

    const submitDelete = () => {
        dispatch(deleteAsset(chosenId))
    }

    return (
        <div className={styles.contentWrapper}>
            <div className={styles.buttonWrapper}>
                <PrimaryButton text="+ ASSET" onClick={openAssetCreateModal}/>
            </div>
            <div className={styles.floorsWrapper}>
                {
                    assets.map(floor => {
                        return (
                            <div className={styles.floorWrapper}>
                                <p className={styles.floorTitle}>{floor.name}</p>
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
                modalContent={assetCreateForm}
                modalTitle={isModalCreateMode ? "Create asset" : "Edit asset"}
                onCloseModal={closeAssetCreateModal}
                isSubmitDisabled={isSubmitDisabled}
                onSubmit={isModalCreateMode ? assetCreate : assetEdit}
            />}
            {isWarningVisible &&
                <WarningPopup
                    title="Delete asset"
                    text="Delete selected asset? This action can’t be undone"
                    handleClosePopup={handleCloseWarning}
                    onSubmit={submitDelete}
                />}
        </div>
    )
}

export default AdminAssetsEditor

