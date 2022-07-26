import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import Register from './Component/Auth/Register/Register';
import Login from './Component/Auth/Login/Login';
import Header from './Component/Header/Header';
import PrivateAuth from './Component/Auth/PrivateAuth/PrivateAuth';
import Todos from './Component/Todos/Todos';
import TasksState from './Context/Tasks/TasksState';
import UserState from './Context/User/UserState';
import AlertState from './Context/Alert/AlertState';
import Alert from './Component/Alert/Alert';

function App() {
  return (
    <div className="App">
      <UserState>
        <TasksState>
          <AlertState>

              <Router>
                <Header />
                <Alert/>

                <Routes>
                  <Route exact path='/' element={<PrivateAuth><Todos /></PrivateAuth>} />
                  <Route exact path='/auth/register' element={<Register />} />
                  <Route exact path='/auth/login' element={<Login />} />
                </Routes>
              
            </Router>

          </AlertState>
        </TasksState>
      </UserState>
      
    </div>
  );
}

export default App;
