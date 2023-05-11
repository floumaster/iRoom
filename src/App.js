import styles from "./styles.module.css"
import HomePage from './components/pages/HomePage/HomePage';
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
import { useEffect } from "react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <><Header /><HomePage /></>
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
]);

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    console.log('kekw')
    dispatch(getTimes())
  }, [])

  const isModalVisible = useSelector(store => store.modalSlice.isModalVisible)

  return (
    <div className={styles.App}>
      <main className={isModalVisible ? `${styles.mainWrapper} ${styles.inactive}` : styles.mainWrapper} >
        <RouterProvider router={router} />
      </main>
      {isModalVisible && <Modal />}
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
