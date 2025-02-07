import React, {useState} from "react";
import classes from './card.module.css'; 
import { useBoard } from "../Context/BoardContext";


const NewCard=({onClose, colId})=>{
    const {newCard, setNewCard}= useBoard(); 
    const [title, setTitle] = useState(''); 
    const [description, setDescription] = useState(''); 
  
   
    const handleTitleChange = (e) => {
      setTitle(e.target.value);
    };
  
    // Hantera ändringar i beskrivning-input
    const handleDescriptionChange = (e) => {
      setDescription(e.target.value);
    };
    
    const save=()=>{
       setNewCard({title, description, colId});
       onClose(); 
    }

    return (
        <div className={classes.container}>
            <label htmlFor="title">Title</label>
            <input onChange={handleTitleChange} value={title} ></input>
            <label htmlFor="description">Description</label>
            <textarea onChange={handleDescriptionChange}value={description}></textarea>
            <button onClick={()=>save()}>New Card</button>
        </div>
    )
}

export default NewCard; 