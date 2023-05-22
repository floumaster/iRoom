import React from 'react'
import styles from './styles.module.css'
import CommonButton from '../buttons/CommonButton/CommonButton'
import PrimaryButton from '../buttons/PrimaryButton/PrimaryButton'
import { useSelector, useDispatch } from 'react-redux'
import { setIsModalVisible } from '../../redux/modalSlice'

const Modal = ({modalContent, isSubmitDisabled, modalTitle, onSubmit, onCloseModal}) => {

    return (
        <div className={styles.modalWrapper}>
            <div className={styles.modalHeader}>
                <p className={styles.title}>{modalTitle}</p>
            </div>
            <div className={styles.contentWrapper}>
                {
                    modalContent && modalContent()
                }
            </div>
            <div className={styles.footer}>
                <div className={styles.buttonWrapper}>
                    <CommonButton text="CANCEL" onClick={onCloseModal}/>
                </div>
                <div className={styles.buttonWrapper}>
                    <PrimaryButton text="CREATE" onClick={onSubmit} isDisabled={isSubmitDisabled}/>
                </div>
            </div>
        </div>
    )
}

export default Modal