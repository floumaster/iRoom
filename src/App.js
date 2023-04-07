import './App.css';
import HomePage from './components/pages/HomePage/HomePage';
import { Provider } from 'react-redux';
import { store } from './redux/index'

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <HomePage />
      </div>
    </Provider>
  );
}

export default App;
