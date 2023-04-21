import React from 'react'
import styles from './styles.module.css'

const AdminNavigation = ({ navElements, activeItemId, setActiveItemId }) => {

    const handleSelectItemId = (id) => {
        setActiveItemId(id)
    }

    return (
        <nav className={styles.navigation}>
            {
                navElements.map(element => {
                    return (
                        <div
                            className={element.id === activeItemId ?
                                `${styles.navigationElement} ${styles.active}`
                                : styles.navigationElement}
                            onClick={() => handleSelectItemId(element.id)}
                        >
                            <p className={styles.elementTitle}>{element.name}</p>
                        </div>
                    )
                })
            }
        </nav>
    )
}

export default AdminNavigation