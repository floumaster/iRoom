import React, { useState } from "react";
import styles from "./styles.module.css"
import PrimaryButton from "../buttons/PrimaryButton/PrimaryButton";
import CommonButton from "../buttons/CommonButton/CommonButton";

const filterData = [
    {
        title: 'Floor',
        items: [
            {
                title: 'Eight',
                type: 'checkbox'
            },
            {
                title: 'Thirteen',
                type: 'checkbox'
            }
        ]
    },
    {
        title: 'Features',
        items: [
            {
                title: 'Mac Lab',
                type: 'checkbox'
            },
            {
                title: 'PC Lab',
                type: 'checkbox'
            },
            {
                title: 'Projector',
                type: 'checkbox'
            },
            {
                title: 'TV',
                type: 'checkbox'
            },
            {
                title: 'Operable walls',
                type: 'checkbox'
            },
            {
                title: 'Whiteboard',
                type: 'checkbox'
            },
            {
                title: 'Power outlets',
                type: 'checkbox'
            }
        ]
    },
    {
        title: 'Capacity',
        items: [
            {
                title: '16 seats',
                type: 'checkbox'
            },
            {
                title: '18 seats',
                type: 'checkbox'
            },
            {
                title: '20 seats',
                type: 'checkbox'
            },
            {
                title: '24 seats',
                type: 'checkbox'
            },
            {
                title: '40 seats',
                type: 'checkbox'
            }
        ]
    },
    {
        title: 'Availability',
        items: [
            {
                title: 'Fully available',
                type: 'checkbox'
            },
            {
                title: 'Partly available',
                type: 'checkbox'
            },
            {
                title: 'Fully booked',
                type: 'checkbox'
            }
        ]
    },
]

const FilterSection = () => {


    return (
        <div className={styles.filterWrapper}>
            <div className={styles.filter}>
                <p className={styles.filterTitle}>Filter by</p>
                <div className={styles.filterItemsWrapper}>
                    {
                        filterData.map(filterItem => {
                            return (
                                <div className={styles.filterItemWrapper}>
                                    <p className={styles.filterItemTitle}>{filterItem.title}</p>
                                    <div className={styles.filterSubItemsWrapper}>
                                        {
                                            filterItem.items.map(subItem => {
                                                return (
                                                    <div className={styles.filterSubItemWrapper}>
                                                        {
                                                            subItem.type === 'checkbox' ?
                                                            <input type="checkbox"/> :
                                                            null
                                                        }
                                                        <p className={styles.filterSubItemTitle}>{subItem.title}</p>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className={styles.rangeWrapper}>
                    <div className={styles.startRangeWrapper}>
                        <p className={styles.startRangeTitle}>From</p>
                        <input className={styles.startRangeInput}/>
                    </div>
                    <div className={styles.startRangeWrapper}>
                        <p className={styles.startRangeTitle}>To</p>
                        <input className={styles.startRangeInput} />
                    </div>
                </div>
                <div className={styles.buttonsWrapper}>
                    <PrimaryButton />
                    <CommonButton />
                </div>
            </div>
        </div>
    )
}

export default FilterSection