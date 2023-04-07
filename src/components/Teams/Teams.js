import React from 'react'
import styles from "./styles.module.css"
import { useSelector } from 'react-redux'

const Teams = () => {

    const teams = useSelector(store => store.teamsSlice.teams)

    return (
        <div className={styles.teamsWrapper}>
            <div className={styles.teams}>
                <p className={styles.teamsTitleWrapper}>Teams</p>
                <div className={styles.teamsList}>
                    {
                        teams.map(team => {

                            return (
                                <div className={styles.teamWrapper}>
                                    <div className={styles.teamColor} style={{backgroundColor: team.color}}/>
                                    <p className={styles.teamName}>{team.name}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Teams