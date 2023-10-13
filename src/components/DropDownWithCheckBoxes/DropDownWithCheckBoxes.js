import React, { useEffect, useState } from "react";
import styles from './styles.module.css'

const DropdownWithCheckBoxes = ({ items, itemName, onChange, selectedIds }) => {

    const [title, setTitle] = useState(`Selected 0 ${itemName}`)

    const [isOpened, setIsOpened] = useState(false)

    const [selectedItems, setSelectedItems] = useState(selectedIds)
    const [unselectedItem, setUnselectedItems] = useState(items.filter(item => !selectedIds.find(id => item.id === id)))

    useEffect(() => {
        setTitle(`Selected ${selectedItems.length} ${itemName}`)
        onChange(selectedItems)
    }, [selectedItems])

    const selectItem = (item) => {
        setSelectedItems(selectedItems => [...selectedItems, item])
        const unselectedItemsNew = [...unselectedItem].filter(_item => _item.id !== item.id)
        setUnselectedItems(unselectedItemsNew)
    }

    const unSelectItem = (item) => {
        setUnselectedItems(unselectedItem => [...unselectedItem, item])
        const SelectedItemsNew = [...selectedItems].filter(_item => _item.id !== item.id)
        setSelectedItems(SelectedItemsNew)
    }

    const toggleOpen = () => {
        setIsOpened(isOpened => !isOpened)
    }

    return (
        <>
            <div className={styles.dropDownWrapper} onClick={toggleOpen}>
                <p className={styles.title}>{title}</p>
            </div>
            {isOpened && <div className={styles.dropDownContentWrapper}>
                {!!selectedItems.length && <div className={styles.selectedContainer}>
                    {
                        selectedItems.map(item => {
                            return (
                                <div className={styles.itemWrapper} onClick={() => unSelectItem(item)}>
                                    <p className={styles.itemTitle}>{item.name}</p>
                                </div>
                            )
                        })
                    }
                </div>}
                {!!unselectedItem.length && <div className={styles.unselectedContainer}>
                    {
                        unselectedItem.map(item => {
                            return (
                                <div className={`${styles.itemWrapper} ${styles.itemWrapperUnselected}`} onClick={() => selectItem(item)}>
                                    <p className={styles.itemTitle}>{item.name}</p>
                                </div>
                            )
                        })
                    }
                </div>}
            </div>}
        </>
    )
}

export default DropdownWithCheckBoxes