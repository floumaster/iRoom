import React from "react";
import styles from "./styles.module.css"
import { useSelector } from "react-redux";
import Floor from "../Floor/Floor";
import filtrationImg from '../../assets/icons/filtration.png'


const Scheduler = ({isAnyRoom}) => {

    const floors = useSelector(store => store.floorsSlice.floors)

    return (
        <div className={styles.scheduler}>
            {
                isAnyRoom ? 
                floors.map(floor => {
                    return <Floor floor={floor}/>
                }) : 
                <div className={styles.noRoomsWarning}>
                    <img src={filtrationImg} className={styles.noRoomsWarningImg}/>
                    <div>
                        <p className={styles.warningTitle}>Unfortunately, there are no such rooms that satisfy your wishes.</p>
                        <p>Change your filters and we'll try to find something relevant for you.</p>
                    </div>
                </div>
            }
        </div>
    )
}

export default Scheduler
