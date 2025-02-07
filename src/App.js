import './App.css';
import {Board} from './Components/Board'; 
import { DndContext } from '@dnd-kit/core';
import { useBoard } from './Context/BoardContext';
import Login from './Components/Login';
// <Board/>
// <Login/>

function App() {
  const { handleDrop } = useBoard(); 
  return (
    <div>
      <DndContext onDragEnd={handleDrop}>
      <Board/>
      </DndContext>
     

  </div>
  );
}

export default App;
