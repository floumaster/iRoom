import React from "react";
import styles from "./styles.module.css"
import ColNamings from "../ColNamings/ColNamings";
import Room from '../Room/Room'
import { useSelector } from "react-redux";

const Floor = ({ floor }) => {

    const rooms = useSelector(store => store.roomsSlice.rooms)
    const { name } = floor

    const getRoomsByFloor = (floor) => {
        const roomsIds = floor.roomsIds
        return rooms.filter(room => roomsIds.includes(room.id))
    }

    const roomOnCurrentFloor = getRoomsByFloor(floor)

    return !!roomOnCurrentFloor.length &&
        (
            <div className={styles.floorWrapper}>
                <div className={styles.floorTitleWrapper}>
                    <p className={styles.floor}>{`Floor ${name}`}</p>
                </div>
                <div className={styles.schedulerContentWrapper}>
                    <ColNamings />
                    <div className={styles.roomsWrapper}>
                        {
                            roomOnCurrentFloor.map(room => {
                                return <Room room={room} floor={floor}/>
                            })
                        }
                    </div>
                </div>
            </div>
        )
}

export default Floor
