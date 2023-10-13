import React, { useEffect, useState } from "react";
import styles from './styles.module.css'
import AdminNavigation from "../../AdminNavigation/AdminNavigation";
import AdminEditor from "../../AdminEditor/AdminEditor";
import AdminTimeEditor from "../../AdminTimeEditor/AdminTimeEditor";
import AdminFloorsEditor from "../../AdminFloorsEditor/AdminFloorsEditor";
import AdminAssetsEditor from "../../AdminAssetsEditor/AdminAssetsEditor";
import AdminPurposesEditor from "../../AdminPurposesEditor/AdminPurposesEditor";
import AdminUsersEditor from "../../AdminUsersEditor/AdminUsersEditor";
import AdminTeamsEditor from "../../AdminTeamsEditor/AdminTeamsEditor";

const AdminPanel = () => {

    const getCurrentChildComponent = () => {
        return navElements.find(element => element.id === activeItemId).component
    }

    const [activeItemId, setActiveItemId] = useState(1)
    const [title, setTitle] = useState('')

    const navElements = [
        {
            id: 1,
            name: 'Working hours',
            component: <AdminTimeEditor />
        },
        {
            id: 2,
            name: 'Floors + Rooms',
            component: <AdminFloorsEditor setContentTitle={setTitle}/>
        },
        {
            id: 3,
            name: 'Assets',
            component: <AdminAssetsEditor />
        },
        {
            id: 5,
            name: 'Users',
            component: <AdminUsersEditor />
        },
    ]

    const getContentTitle = () => {
        switch(activeItemId){
            case 1:
                return 'Office working hours'
            case 2:
                return 'Floors'
            case 3: 
                return 'Assets'
            case 5:
                return 'Users'
            default:
                return ''
        }
    }

    useEffect(() => {
        setTitle(getContentTitle())
    }, [activeItemId])

    return (
        <div className={styles.contentWrapper}>
            <AdminNavigation
                navElements={navElements}
                activeItemId={activeItemId}
                setActiveItemId={setActiveItemId}
            />
            <AdminEditor
                title={title}
            >
                {
                    getCurrentChildComponent()
                }
            </AdminEditor>
        </div>
    )
}

export default AdminPanel