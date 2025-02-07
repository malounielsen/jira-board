import React from "react";

const NewBoard=()=>{

return(
    <div>
        <input placeholder="Name on board"></input>
        
        <button onClick={()=> createNewBoard()}>New board</button>
    </div>
)
}

export default NewBoard; 