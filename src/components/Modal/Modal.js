import React from 'react'
import styles from './styles.module.css'
import CommonButton from '../buttons/CommonButton/CommonButton'
import PrimaryButton from '../buttons/PrimaryButton/PrimaryButton'
import { useSelector, useDispatch } from 'react-redux'
import { setIsModalVisible } from '../../redux/modalSlice'

const Modal = () => {

    const dispatch = useDispatch()

    const modalContent = useSelector(store => store.modalSlice.modalContent)
    const isSubmitDisabled = useSelector(store => store.modalSlice.isSubmitDisabled)
    console.log(isSubmitDisabled)
    const onSubmit = useSelector(store => store.modalSlice.onSubmit)

    const closeButton = () => {
        dispatch(setIsModalVisible(false))
    }

    return (
        <div className={styles.modalWrapper}>
            <div className={styles.modalHeader}>
                <p className={styles.title}>Create floor</p>
            </div>
            <div className={styles.contentWrapper}>
                {
                    modalContent && modalContent()
                }
            </div>
            <div className={styles.footer}>
                <div className={styles.buttonWrapper}>
                    <CommonButton text="CANCEL" onClick={closeButton}/>
                </div>
                <div className={styles.buttonWrapper}>
                    <PrimaryButton text="CREATE" onClick={onSubmit} isDisabled={isSubmitDisabled}/>
                </div>
            </div>
        </div>
    )
}

export default Modal