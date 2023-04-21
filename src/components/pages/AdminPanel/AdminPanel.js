import React, { useState } from "react";
import styles from './styles.module.css'
import AdminNavigation from "../../AdminNavigation/AdminNavigation";
import AdminEditor from "../../AdminEditor/AdminEditor";
import AdminTimeEditor from "../../AdminTimeEditor/AdminTimeEditor";
import AdminFloorsEditor from "../../AdminFloorsEditor/AdminFloorsEditor";
import AdminAssetsEditor from "../../AdminAssetsEditor/AdminAssetsEditor";

const AdminPanel = () => {

    const navElements = [
        {
            id: 1,
            name: 'Working hours',
            component: <AdminTimeEditor />
        },
        {
            id: 2,
            name: 'Floors + Rooms',
            component: <AdminFloorsEditor />
        },
        {
            id: 3,
            name: 'Assets',
            component: <AdminAssetsEditor />
        },
        {
            id: 4,
            name: 'Purposes'
        },
        {
            id: 5,
            name: 'Users'
        },
        {
            id: 6,
            name: 'Business units'
        }
    ]

    const getContentTitle = () => {
        switch(activeItemId){
            case 1:
                return 'Default working hours'
            case 2:
                return 'Floors'
            case 3: 
                return 'Assets'
            case 4:
                return 'Purposes'
            case 5:
                return 'Users'
            case 6:
                return 'Business units'
            default:
                return ''
        }
    }

    const getCurrentChildComponent = () => {
        return navElements.find(element => element.id === activeItemId).component
    }

    const [activeItemId, setActiveItemId] = useState(1)
    const contentTitle = getContentTitle()

    return (
        <div className={styles.contentWrapper}>
            <AdminNavigation
                navElements={navElements}
                activeItemId={activeItemId}
                setActiveItemId={setActiveItemId}
            />
            <AdminEditor
                title={contentTitle}
            >
                {
                    getCurrentChildComponent()
                }
            </AdminEditor>
        </div>
    )
}

export default AdminPanel