import {useDraggable} from '@dnd-kit/core';
import react from 'react';

const Draggable=({id, children})=>{
    const {attributes, listeners, setNodeRef,transform}=useDraggable({id}); 

   const styles={
        cursor: "grab",
        userSelect: "none",
        opacity: 1,
        transform: `translate(${transform?.x ?? 0}px, ${transform?.y ?? 0}px)`
    }; 
  return (
    <div ref={setNodeRef} style={styles} {...listeners} {...attributes}>
   {children}
    </div>
  );
}

export default Draggable; 
/*
  const styles = {
    cursor: isDragging ? "grabbing" : "grab",  // Ändra kursorn när dragningen pågår
    userSelect: "none",                       // Förhindra textmarkering när du drar
    opacity: isDragging ? 0.5 : 1,            // Ändra opacitet när dragning pågår
    transform: `translate(${transform?.x ?? 0}px, ${transform?.y ?? 0}px)` // Lägg till transformering för att flytta elementet
  */