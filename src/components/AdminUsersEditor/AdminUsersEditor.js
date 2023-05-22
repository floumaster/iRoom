import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import { useSelector } from 'react-redux'
import PrimaryButton from '../buttons/PrimaryButton/PrimaryButton'
import CommonButton from '../buttons/CommonButton/CommonButton'
import CommonButtonWithExport from '../buttons/ButtonWithExport/CommonButton'
import { useDispatch } from 'react-redux'
import { setModalContent, setIsModalVisible, setIsSubmitDisabled, setOnSubmitFunk, setModalTitle } from '../../redux/modalSlice'
import { createRoom } from '../../redux/roomsSlice'
import { addRoomToFloor } from '../../redux/floorsSlice'
import CommonButtonWithInput from '../buttons/ButtonWithInput/CommonButton'
import { createUser, setUsers } from '../../redux/usersSlice'
import { v4 as uuidv4 } from 'uuid';
import Dropdown from 'react-dropdown'
import DropdownWithCheckBoxes from '../DropDownWithCheckBoxes/DropDownWithCheckBoxes'
import Modal from '../Modal/Modal'
import Edit from '../../assets/icons/edit.svg'
import Delete from '../../assets/icons/delete.svg'

const AdminUsersEditor = ({ }) => {

    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [email, setEmail] = useState('')
    const [teamId, setTeamId] = useState('')
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true)

    const onTeamSelect = (team) => {
        const teamName = team.value
        setTeamId(businessUnits.find(team => team.name === teamName).id)
    }

    const handleChangeName = (e) =>{
        setName(e.target.value)
    }

    const handleChangeSurname = (e) =>{
        setSurname(e.target.value)
    }

    const handleChangeEmail = (e) =>{
        setEmail(e.target.value)
    }

    const dispatch = useDispatch()

    const closeUserCreateModal = () => {
        setIsModalVisible(false)
        setName('')
        setSurname('')
        setEmail('')
        setTeamId('')
    } 

    const userCreate = () => {
        dispatch(createUser(
            {
                id: uuidv4(),
                name,
                surname,
                email,
                businessUnitId: teamId
            }
        ))
        closeUserCreateModal()
    }

    useEffect(() => {
        if(name.length && surname.length && email.length && teamId){
            setIsSubmitDisabled(false)
        }
    }, [name, surname, email, teamId])
    
    const users = useSelector(store => store.usersSlice.users)
    const businessUnits = useSelector(store => store.teamsSlice.teams)
    const processedBusinessUnits = businessUnits.map(team => team.name)

    const getBusinessUnitByUser = (user) => {
        return businessUnits.find(team => team.id === user.businessUnitId)?.name
    }

    const openUserCreateModal = () => {
        setIsModalVisible(true)
    }

    const processCsvUsers = (file) => {
        const rows = file.split('\r\n')
        const users = []
        rows.forEach(row => {
            const splitedRow = row.split(';')
            if(splitedRow[0]){
                const user = {
                    id: uuidv4(),
                    name: splitedRow[0],
                    surname: splitedRow[1],
                    email: splitedRow[2],
                    businessUnitId: splitedRow[3]
                }
                users.push(user)
            }
        })
        dispatch(setUsers(users))
    }

    const [file, setFile] = useState();

    const handleFileChange = (e) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const createExportFileContent = () => {
        const formatUsers = users.map(user => {
            return `${user.name};${user.surname};${user.email};${user.businessUnitId}`
        }).join('\r\n')
        return formatUsers
    }

    const handleUploadClick = () => {
        if (file) {
        fetch('https://httpbin.org/post', {
            method: 'POST',
            body: file,
            headers: {
                'content-type': file.type,
                'content-length': `${file.size}`,
            },
        })
        .then((res) => res.json())
        .then((data) => processCsvUsers(data.data))
        .catch((err) => console.error(err));
    }}

    useEffect(() => {
        if(file){
            handleUploadClick()
        }
    }, [file])

    const userCreateForm = () => {
        return (
            <div className={styles.formWrapper}>
                <input className={styles.input} onChange={handleChangeName} placeholder='Name'/>
                <input className={styles.input} onChange={handleChangeSurname} placeholder='Surname'/>
                <input className={styles.input} onChange={handleChangeEmail} placeholder='Email'/>
                <Dropdown options={processedBusinessUnits} onChange={onTeamSelect}/>
            </div>
        )
    }

    return (
        <div className={styles.contentWrapper}>
            <div className={styles.buttonWrapper}>
                <PrimaryButton text="+ USER" onClick={openUserCreateModal}/>
            </div>
            <div className={styles.commonButtonWrapper}>
                <CommonButtonWithInput text="Import" handleFileChange={handleFileChange}/>
            </div>
            <div className={styles.commonButtonWrapper2}>
                <CommonButtonWithExport text="Export file" data={createExportFileContent()}/>
            </div>
            <div className={styles.floorsWrapper}>
                <div className={styles.colsTitle}>
                    <div className={styles.colWrapper}>
                        <p className={styles.colTitle}>Name</p>
                    </div>
                    <div className={styles.colWrapper}>
                        <p className={styles.colTitle}>Surname</p>
                    </div>
                    <div className={styles.colWrapper}>
                        <p className={styles.colTitle}>Email</p>
                    </div>
                    <div className={styles.colWrapper}>
                        <p className={styles.colTitle}>Business unit</p>
                    </div>
                    <div className={styles.colWrapperExtra}>
                    </div>
                </div>
                {
                    users.map(user => {
                        const teamName = getBusinessUnitByUser(user)
                        return (
                            <div className={styles.colsTitle}>
                                <div className={styles.colWrapper}>
                                    <p className={styles.colTitle}>{user.name}</p>
                                </div>
                                <div className={styles.colWrapper}>
                                    <p className={styles.colTitle}>{user.surname}</p>
                                </div>
                                <div className={styles.colWrapper}>
                                    <p className={styles.colTitle}>{user.email}</p>
                                </div>
                                <div className={styles.colWrapper}>
                                    <p className={styles.colTitle}>{teamName}</p>
                                </div>
                                <div className={styles.colWrapperExtra}>
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
                modalContent={userCreateForm}
                modalTitle="Create user"
                onCloseModal={closeUserCreateModal}
                isSubmitDisabled={isSubmitDisabled}
                onSubmit={userCreate}
            />}
        </div>
    )
}

export default AdminUsersEditor

