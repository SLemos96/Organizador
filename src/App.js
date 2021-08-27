import logo from './logo.svg';
import './App.css';
import TaskList from './TaskList'
import tarefas from './assets/tarefas.json';

function App() {
  return (
    <div className="App">
      <TaskList tarefas={tarefas} />
    </div>
  );
}

export default App;
