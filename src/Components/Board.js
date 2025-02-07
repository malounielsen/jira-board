import react, { useState , useEffect} from "react";
import classes from './board.module.css'; 
import { Column } from "./Column";
import Droppable from "./Droppable";
import { useBoard } from "../Context/BoardContext";


export const Board=()=>{
   const {column, board, columnInputVisible, setcolumnInputVisible, newColumn, setNewColumn, createNewColumn}=useBoard(); 
   const handleInputChange = (event) => {
    setNewColumn(event.target.value); 
  };

return (
    
    
    <div className={classes.board}>
       { board ? <div><div className={classes.boardheader}><div><h2>{board.name}</h2> </div><div className={classes.newcolumnbutton}>
       {columnInputVisible? <div><input placeholder="ColumnName" onChange={handleInputChange} value={newColumn} name="newColumn"></input><button onClick={createNewColumn}>Click to create</button></div>: <></>}
        <button onClick={()=>setcolumnInputVisible(!columnInputVisible)}>Create new Column</button></div></div>
        <div className={classes.background}>
        {column ? column.map((col)=><Droppable id={col.column_id}key={col.column_id}> <Column column={col}/></Droppable>): <div></div>}
        </div></div>: <div></div>}

    </div>
)
}
