import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import PrimaryButton from '../buttons/PrimaryButton/PrimaryButton'
import CommonButton from '../buttons/CommonButton/CommonButton'
import CommonButtonWithExport from '../buttons/ButtonWithExport/CommonButton'
import { useDispatch, useSelector } from 'react-redux'
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
import { editUser } from '../../redux/usersSlice'
import WarningPopup from '../Modal/WarningPopup/WarningPopup'
import { deleteUser } from '../../redux/usersSlice'

const AdminUsersEditor = ({ }) => {

    const [chosenId, setChosenId] = useState('')
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [email, setEmail] = useState('')
    const [teamId, setTeamId] = useState('')
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true)
    const [isModalCreateMode, setIsModalCreateMode] = useState(true)
    const [isWarningVisible, setIsWarningVisible] = useState(false)
    const teams = useSelector(store => store.teamsSlice.teams)

    const businessUnits = useSelector(store => store.teamsSlice.teams)
    const processedBusinessUnits = businessUnits.map(team => team.name)

    const onTeamSelect = (team) => {
        const teamName = team.value
        setTeamId(businessUnits.find(team => team.name === teamName).id)
    }

    const getTeamById = (teamId) => {
        return businessUnits.find(team => team.id === teamId)?.name || ''
    }

    const selectedTeam = getTeamById(teamId)

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

    const userEdit = () => {
        dispatch(editUser(
            {
                id: chosenId,
                name,
                surname,
                email,
                businessUnitId: teamId
            }
        ))
        closeUserCreateModal()
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

    const getBusinessUnitByUser = (user) => {
        return businessUnits.find(team => team.id === user.businessUnitId)?.name
    }

    const openUserCreateModal = () => {
        setIsModalCreateMode(true)
        setIsModalVisible(true)
    }

    const handleOpenWarning = (e, user) => {
        setChosenId(user.id)
        e.stopPropagation()
        setIsWarningVisible(true)
    }

    const handleCloseWarning = () => {
        setIsWarningVisible(false)
    }

    const processCsvUsers = (file) => {
        const rows = file.split('\r\n')
        const importedUsers = []
        console.log(rows, teams)
        rows.forEach(row => {
            const splitedRow = row.split(';')
            if(splitedRow[0]){
                const user = {
                    id: uuidv4(),
                    name: splitedRow[0],
                    surname: splitedRow[1],
                    email: splitedRow[2],
                    businessUnitId: teams.find(team => team.name === splitedRow[3]).id,
                    isAdmin: false
                } 
                importedUsers.push(user)
            }
        })
        const usersToAdd = importedUsers.filter(user => {
            return !users.some(_user => _user.email === user.email)
        })
        dispatch(setUsers(usersToAdd))
    }

    const [file, setFile] = useState();

    const handleFileChange = (e) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const createExportFileContent = () => {
        const formatUsers = users.map(user => {
            const teamName = teams.find(team => team.id === user.businessUnitId)?.name
            return `${user.name};${user.surname};${user.email};${teamName}`
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
                <input className={styles.input} onChange={handleChangeName} placeholder='Name' value={name}/>
                <input className={styles.input} onChange={handleChangeSurname} placeholder='Surname' value={surname}/>
                <input className={styles.input} onChange={handleChangeEmail} placeholder='Email' value={email}/>
                <Dropdown options={processedBusinessUnits} onChange={onTeamSelect} value={selectedTeam}/>
            </div>
        )
    }

    const handleOpenEditForm = (e, user) => {
        setChosenId(user.id)
        setName(user.name)
        setSurname(user.surname)
        setEmail(user.email)
        setTeamId(user.teamId)
        setIsModalCreateMode(false)
        setIsModalVisible(true)
        e.stopPropagation()
    }

    const submitDelete = () => {
        dispatch(deleteUser(chosenId))
    }

    return (
        <div className={styles.contentWrapper}>
            <div className={styles.buttonWrapper}>
                <PrimaryButton text="+ USER" onClick={openUserCreateModal}/>
            </div>
            <div className={styles.commonButtonWrapper}>
                <CommonButtonWithInput text="Import file" handleFileChange={handleFileChange}/>
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
                            <div className={`${styles.colsTitle} ${styles.values}`}>
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
                                    <img src={Edit} alt="edit" className={styles.icon} onClick={(e) => handleOpenEditForm(e, user)}/>
                                    <img src={Delete} alt="delete" className={styles.icon} onClick={(e) => handleOpenWarning(e, user)}/>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            {isModalVisible &&
            <Modal
                isCreateMode={isModalCreateMode}
                modalContent={userCreateForm}
                modalTitle={isModalCreateMode ? "Create user" : "Edit user"}
                onCloseModal={closeUserCreateModal}
                isSubmitDisabled={isSubmitDisabled}
                onSubmit={isModalCreateMode ? userCreate : userEdit}
            />}
            {isWarningVisible &&
                <WarningPopup
                    title="Delete user"
                    text="Delete selected user? This action can’t be undone"
                    handleClosePopup={handleCloseWarning}
                    onSubmit={submitDelete}
                />}
        </div>
    )
}

export default AdminUsersEditor

