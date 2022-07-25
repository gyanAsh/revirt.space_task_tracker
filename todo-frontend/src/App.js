import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import Register from './Component/Auth/Register/Register';
import Login from './Component/Auth/Login/Login';
import Header from './Component/Header/Header';
import Todos from './Component/Todos/Todos';
import TasksState from './Context/Tasks/TasksState';
import UserState from './Context/User/UserState';

function App() {
  return (
    <div className="App">
      <UserState>
        <TasksState>

          <Router>
            <Header />

              <Routes>
                <Route exact path='/' element={<Todos />} />
                <Route exact path='/auth/register' element={<Register />} />
                <Route exact path='/auth/login' element={<Login />} />
              </Routes>
            
          </Router>
          
        </TasksState>
      </UserState>
      
    </div>
  );
}

export default App;
