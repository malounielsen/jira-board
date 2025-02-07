import react from "react";
import classes from './card.module.css';



export const Cards=(props)=>{
    const {title, id, ref, deadline}=props;

return (
    <div red={ref}className={classes.container}>
    <div className={classes.header}>
        {title}
    </div>
    <div className={classes.deadline}>
        {deadline}
    </div>
    </div>
)
}