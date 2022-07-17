import './App.css';
import Header from './Component/Header/Header';
import Todos from './Component/Todos/Todos';
import TasksState from './Context/Tasks/TasksState';

function App() {
  return (
    <div className="App">
      <Header />
        <TasksState>
          <Todos/>
        </TasksState>
    </div>
  );
}

export default App;
