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

const AdminAssetsEditor = () => {

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

    const dispatch = useDispatch()
    
    const assets = useSelector(store => store.assetsSlice.assets)

    const openAssetCreateModal = () => {
        setIsModalVisible(true)
    }

    const closeAssetCreateModal = () => {
        setIsModalVisible(false)
        setTitle(false)
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
                modalContent={assetCreateForm}
                modalTitle="Create asset"
                onCloseModal={closeAssetCreateModal}
                isSubmitDisabled={isSubmitDisabled}
                onSubmit={assetCreate}
            />}
        </div>
    )
}

export default AdminAssetsEditor

