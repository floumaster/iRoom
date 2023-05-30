import React from "react";
import styles from "./styles.module.css"
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/usersSlice";
import logoutIcon from '../../assets/icons/logout.svg'
import bookingsIcon from '../../assets/icons/bookings.svg'
import adminIcon from '../../assets/icons/admin.svg'
import availabilityIcon from '../../assets/icons/availability.svg'
import logoIcon from '../../assets/icons/logo.svg'

const Header = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector(store => store.usersSlice.currentUser)
    const isAdmin = user?.isAdmin

    const navigateToHome = () => {
        navigate('/')
    }

    const navigateToAdminPanel = () => {
        navigate('/admin')
    }

    const navigateToLogin = () => {
        navigate('/login')
    }

    const navigateToMyBookings = () => {
        navigate('/myBookings')
    }

    const onAuthButtonClick = () => {
        if(user){
            dispatch(logout())
            navigateToLogin()
        }
        else
            navigateToLogin()
    }

    const authButtonText = user ? 'Logout' : 'Login'

    return (
        <header className={styles.headerWrapper}>
            <div className={styles.headerMenuLeft}>
                <p className={styles.logoMenuItem}>iRoom</p>
                <div className={styles.menuItemWrapper}>
                    <img src={availabilityIcon} alt="admin" className={styles.biggerIcon}/>
                    <p className={styles.menuItem} onClick={navigateToHome}>View availability</p>
                </div>
                <div className={styles.menuItemWrapper}>
                    <img src={bookingsIcon} alt="bookings" className={styles.icon}/>
                    <p className={styles.menuItem} onClick={navigateToMyBookings}>My bookings</p>
                </div>
                {isAdmin && <div className={styles.menuItemWrapper}>
                    <img src={adminIcon} alt="admin" className={styles.icon}/>
                    <p className={styles.menuItem} onClick={navigateToAdminPanel}>Admin panel</p>
                </div>}
            </div>
            <div className={styles.headerMenuRight}>
                <div className={styles.menuItemWrapper}>
                    <img src={logoutIcon} alt="logout" className={styles.icon}/>
                    <p className={styles.menuItem} onClick={onAuthButtonClick}>{authButtonText}</p>
                </div>
            </div>
        </header>
    )
}

export default Header