import react, {useState} from "react";
import classes from './layout.module.css'; 
import { useBoard } from "./Context/BoardContext";

export const Menu=()=>{
const {boardList, setBoard, setNewBoard, newBoard, createNewBoard, inputVisible, setInputVisible}=useBoard(); 
const handleInputChange = (event) => {
    setNewBoard(event.target.value); // Uppdatera newBoard med värdet från inputfältet
  };

return(
    <div className={classes.menubar}>
        <h2>Profile</h2>
        <h2>Boards</h2>
       {boardList ? <div>
        {boardList.map((b)=><div onClick={()=>setBoard(b)}>{b.name}</div>)}
        </div>: <div></div>}
        {inputVisible? <div><input placeholder="BoardName" onChange={handleInputChange} value={newBoard} name="newboard"></input><div onClick={createNewBoard}>Click to create</div></div>: <></>}
        <button onClick={()=>setInputVisible(!inputVisible)}>Create new board+</button>
        <button onClick={()=>localStorage.clear()}>Log out</button>
    </div>)


}