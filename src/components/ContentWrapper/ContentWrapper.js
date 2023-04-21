import React from "react";
import styles from "./styles.module.css"
import TimeManager from "../TimeManager/TimeManager";
import SchedulerWrapper from "../SchedulerWrapper/SchedulerWrapper";
import FilterSection from "../FilterSection/FilterSection";
import Teams from "../Teams/Teams";

const ContentWrapper = () => {
    return (
        <div className={styles.contentWrapper}>
            <div className={styles.contentLeftWrapper}>
                <TimeManager title="Book a room"/>
                <FilterSection />
                <Teams />
            </div>
            <div className={styles.contentRightWrapper}>
                <SchedulerWrapper />
            </div>
        </div>
    )
}

export default ContentWrapper