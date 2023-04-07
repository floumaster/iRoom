import React from "react";
import styles from "./styles.module.css"

import Header from "../../Header/Header";
import ContentWrapper from "../../ContentWrapper/ContentWrapper";

const HomePage = () => {
    return (
        <main className={styles.mainWrapper}>
            <Header />
            <ContentWrapper />
        </main>
    )
}

export default HomePage