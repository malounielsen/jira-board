import react, {useEffect, useState } from "react";
import classes from './column.module.css'; 
import {Cards} from './Cards'; 
import Draggable from './Draggable'; 
import NewCard from "./NewCard";
import { useBoard } from "../Context/BoardContext";


export const Column=(props)=>{
    const {column}=props; 
    //const {newCardOpen, setNewCardOpen}= useBoard();  
    const [isCardOpen, setIsCardOpen]=useState(false); 



    const createNewCard=()=>{
      console.log("new card funcion")
      return <NewCard key={column.id}/>
    }
    
    return (
        <div className={classes.container}>
            <div className={classes.columnname}>{column.name} <button onClick={()=>setIsCardOpen(true)}>Add Card</button></div>
            <div className={classes.cards}>
             {isCardOpen? <NewCard onClose={()=>setIsCardOpen(false)} key={column.id} colId={column.column_id}/>: <></>} 
            {column && column.task && column.task.length>0? column.task.map((card,index)=>
              <Draggable id={card.task_id} key={card.task_id}>
                <Cards id={card.task_id} title={card.title} deadline={card.deadline}/></Draggable>): <div></div>}
                </div>
        </div>
   )
}