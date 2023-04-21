import React from "react";
import styles from "./styles.module.css"
import { useSelector } from "react-redux";
import Floor from "../Floor/Floor";


const Scheduler = () => {

    const floors = useSelector(store => store.floorsSlice.floors)

    return (
        <div className={styles.scheduler}>
            {
                floors.map(floor => {
                    return <Floor floor={floor}/>
                })
            }
        </div>
    )
}

export default Scheduler
