import react from "react";
import Board from "./Components/Board";
import classes from './layout.module.css'; 
import {Menu} from './Menu'; 

export const Layout=({children})=> {
return (
<div>
    <div className={classes.header}>
    <h1>Maljira board</h1>
    </div>
    <div className={classes.body}>
    <Menu/>
    {children}
    </div>
</div>
)

}

