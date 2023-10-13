import styles from "./styles.module.css"
import HomePage from './components/pages/HomePage/HomePage';
import MyBookings from "./components/pages/MyBookings/MyBookings";
import CreateBooking from './components/pages/CreateBooking/CreateBooking';
import EditBooking from "./components/pages/EditBooking/EditBooking";
import { Provider, useDispatch } from 'react-redux';
import { store } from './redux/index'
import Header from './components/Header/Header';
import { useSelector } from "react-redux";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AdminPanel from "./components/pages/AdminPanel/AdminPanel";
import Modal from "./components/Modal/Modal";
import { getTimes } from "./redux/timesSlice";
import { getAssets } from "./redux/assetsSlice";
import { getFloors } from "./redux/floorsSlice";
import { getRooms } from "./redux/roomsSlice";
import { getBookings } from "./redux/bookingsSlice";
import { getPurposes } from "./redux/purposesSlice";
import { getRecurrings } from "./redux/recurringsSlice";
import { getTeams } from "./redux/teamsSlice";
import { getUsers } from "./redux/usersSlice";
import Register from "./components/pages/Register/Register";
import { useEffect } from "react";
import Login from "./components/pages/Login/Login";
import VoiceHelper from "./components/VoiceHelper/VoiceHelper";

const router = createBrowserRouter([
  {
    path: "/",
    element: <><Header /><HomePage /></>
  },
  {
    path: "/myBookings",
    element: <><Header /><MyBookings /></>
  },
  {
    path: "/createBooking",
    element: <><Header /><CreateBooking /></>
  },
  {
    path: "/editBooking",
    element: <><Header /><EditBooking /></>
  },
  {
    path: "/admin",
    element: <><Header /><AdminPanel /></>
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
]);

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getTimes())
    dispatch(getAssets())
    dispatch(getFloors())
    dispatch(getRooms())
    dispatch(getBookings())
    dispatch(getPurposes())
    dispatch(getRecurrings())
    dispatch(getTeams())
    dispatch(getUsers())
  }, [])

  return (
    <div className={styles.App}>
      <main className={styles.mainWrapper} >
        <RouterProvider router={router} />
      </main>
      <VoiceHelper />
    </div>
  );
}

export default () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
};
