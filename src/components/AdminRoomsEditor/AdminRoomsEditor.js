import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import { useSelector } from 'react-redux'
import PrimaryButton from '../buttons/PrimaryButton/PrimaryButton'
import CommonButton from '../buttons/CommonButton/CommonButton'
import { useDispatch } from 'react-redux'
import { createRoom } from '../../redux/roomsSlice'
import { addRoomToFloor } from '../../redux/floorsSlice'
import { v4 as uuidv4 } from 'uuid';
import DropdownWithCheckBoxes from '../DropDownWithCheckBoxes/DropDownWithCheckBoxes'
import Modal from '../Modal/Modal'
import Edit from '../../assets/icons/edit.svg'
import Delete from '../../assets/icons/delete.svg'

const AdminRoomsEditor = ({ floorId, setContentTitle, unselectFloor }) => {
    
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true)
    const [title, setTitle] = useState('')
    const [capacity, setCapacity] = useState(0)
    const [selectedAssetId, setSelectedAssetId] = useState('')

    const onAssetsSelect = (assets) => {
        setSelectedAssetId(assets.map(asset => asset.id))
    }

    const handleChangeTitle = (e) =>{
        setTitle(e.target.value)
    }

    const handleChangeCapacity = (e) =>{
        setCapacity(e.target.value)
    }

    const roomCreate = () => {
        const newRoomId = uuidv4()
        dispatch(createRoom(
            {
                id: newRoomId,
                name: title,
                capacity: capacity,
                assetsIds: selectedAssetId,
                bookingsIds: [],
                floorId: floorId
            }
        ))
        dispatch(addRoomToFloor({
            floorId,
            roomId: newRoomId
        }))
        setIsModalVisible(false)
    }


    useEffect(() => {
        if(title.length && capacity){
            setIsSubmitDisabled(false)
        }
    }, [title, capacity, selectedAssetId])

    const dispatch = useDispatch()
    
    const selectedFloor = useSelector(store => store.floorsSlice.floors).find(floor => floor.id === floorId)
    const rooms = useSelector(store => store.roomsSlice.rooms).filter(room => selectedFloor.roomsIds.includes(room.id))
    const assets = useSelector(store => store.assetsSlice.assets)

    const getAssetsByRoom = (room) => {
        return assets.filter(asset => room.assetsIds.includes(asset.id))
    }

    const openFloorCreateModal = () => {
        setContentTitle(`Floor ${selectedFloor.name}`)
        setCapacity(0)
        setSelectedAssetId([])
        setIsModalVisible(true)
    }

    const goBack = () => {
        setContentTitle(`Floors`)
        unselectFloor()
    }

    const onCloseModal = () => {
        setIsModalVisible(false)
    }

    const roomCreateForm = () => {
        return (
            <div className={styles.formWrapper}>
                <input className={styles.input} onChange={handleChangeTitle} placeholder='Title'/>
                <input className={styles.input} onChange={handleChangeCapacity} placeholder='Capacity' type='number' min={1}/>
                <DropdownWithCheckBoxes items={assets} itemName="assets" onChange={onAssetsSelect} />
            </div>
        )
    }

    return (
        <div className={styles.contentWrapper}>
            <div className={styles.buttonWrapper}>
                <PrimaryButton text="+ ROOM" onClick={openFloorCreateModal}/>
            </div>
            <div className={styles.commonButtonWrapper}>
                <CommonButton text="Go back" onClick={goBack}/>
            </div>
            <div className={styles.floorsWrapper}>
                <div className={styles.colsTitle}>
                    <div className={styles.colWrapper}>
                        <p className={styles.colTitle}>Title</p>
                    </div>
                    <div className={styles.colWrapper}>
                        <p className={styles.colTitle}>Capacity</p>
                    </div>
                    <div className={styles.colAssetsWrapper}>
                        <p className={styles.colTitle}>Assets</p>
                    </div>
                    <div className={styles.colWrapperLast}>
                        
                    </div>
                </div>
                {
                    rooms.map(room => {
                        const assetsInRoom = getAssetsByRoom(room)
                        return (
                            <div className={styles.colsTitle}>
                                <div className={styles.colWrapper}>
                                    <p className={styles.colTitle}>{room.name}</p>
                                </div>
                                <div className={styles.colWrapper}>
                                    <p className={styles.colTitle}>{room.capacity}</p>
                                </div>
                                <div className={styles.colAssetsWrapperValues}>
                                    {
                                        assetsInRoom.map(asset => {
                                            return (
                                                <p className={styles.colTitle}>{asset.name}</p>
                                            )
                                        })
                                    }
                                </div>
                                <div className={styles.colWrapperLast}>
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
                    modalContent={roomCreateForm}
                    modalTitle="Create room"
                    onCloseModal={onCloseModal}
                    isSubmitDisabled={isSubmitDisabled}
                    onSubmit={roomCreate}
                />}
        </div>
    )
}

export default AdminRoomsEditor

