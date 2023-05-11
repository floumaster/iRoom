import React, { useState } from "react";
import styles from "./styles.module.css"
import ColNamings from "../ColNamings/ColNamings";
import Room from '../Room/Room'
import { useSelector } from "react-redux";
import Arrow from '../../assets/icons/arrow.svg'

const Floor = ({ floor }) => {

    const rooms = useSelector(store => store.roomsSlice.rooms)
    const [hiddenIds, setHiddenIds] = useState([])
    const { name } = floor

    const getRoomsByFloor = (floor) => {
        const roomsIds = floor.roomsIds
        return rooms.filter(room => roomsIds.includes(room.id))
    }

    const handleFloorHide = (id) => {
        hiddenIds.includes(id)
        ? setHiddenIds(hiddenIds => hiddenIds.filter(_id => _id !== id))
        : setHiddenIds(hiddenIds => [...hiddenIds, id])
    }

    const roomOnCurrentFloor = getRoomsByFloor(floor)

    const isFloorHidden = (id) => hiddenIds.includes(id)

    return !!roomOnCurrentFloor.length &&
        (
            <div className={styles.floorWrapper}>
                <div className={styles.floorTitleWrapper}>
                    <p className={styles.floor}>{`Floor ${name}`}</p>
                    <img src={Arrow} alt="arrow" className={!isFloorHidden(floor.id) ? `${styles.arrow} ${styles.rotated}` : styles.arrow} onClick={() => handleFloorHide(floor.id)}/>
                </div>
                {!isFloorHidden(floor.id) && <div className={styles.schedulerContentWrapper}>
                    <ColNamings />
                    <div className={styles.roomsWrapper}>
                        {
                            roomOnCurrentFloor.map(room => {
                                return <Room room={room} floor={floor}/>
                            })
                        }
                    </div>
                </div>}
            </div>
        )
}

export default Floor
