import React, { useEffect } from "react";
import ContentWrapper from "../../ContentWrapper/ContentWrapper";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const HomePage = () => {

    const navigate = useNavigate()
    const currentUser = useSelector(store => store.usersSlice.currentUser)
    useEffect(() => {
        if(!currentUser){
            navigate('/login')
        }
    }, [currentUser])

    return (
        <ContentWrapper />
    )
}

export default HomePage