import React, { useState } from "react";
import { useBoard } from "../Context/BoardContext";
import classes from './login.module.css'; 
import { useNavigate } from "react-router-dom";


const Login=()=> {
    const { userData, setUserData, loggedIn, setLoggedIn}= useBoard(); 
    const [newUser, setNewUser]=useState(false); 
    const navigate = useNavigate();

        const handleChange=(event)=> {
            const {name,value}=event.target; 
            setUserData({ ...userData, [name]: value }); 
        }

        const handleLogin=()=>{
          fetch('http://localhost:8000/api/login.php', {
            method: "POST",
            body: JSON.stringify({
              password: `${userData.password}`,
              email: `${userData.email}`
            }),
          })
          .then((response) => response.json())
          .then((data) => {
            setUserData({...userData, id: data})
            console.log(data); 
            //localStorage.setItem('userId', JSON.stringify(data));
            navigate('/');
          })
            .catch((error) => {
              console.log(error);
            });
    }
        
        const createUser=()=>{
            console.log(userData);
            fetch('http://localhost:8000/api/NewUser.php', {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  username: `${userData.username}`,
                  password: `${userData.password}`,
                  email: `${userData.email}`
                }),
              })
                .then((response) => response.json())
                .then((data) => {
                  setUserData({...userData, id: data})
                  navigate('/');
                })
                .catch((error) => {
                  console.log(error);
                });
               
        }


        return(
            <div className={classes.modal}>
                <label htmlFor="email">Email:</label>
                <input type="email" name="email" onChange={handleChange} value={userData.email} placeholder="E-mail"/>
                <label htmlFor="username">Username</label>
                <input type="text" name="username" onChange={handleChange} value={userData.username} placeholder="Username"/>
                <label htmlFor="password">Password </label>
                <input type="password" name="password" onChange={handleChange} autoComplete="on"value={userData.password} placeholder="Password"/>
                <button onClick={handleLogin}>Login</button>
                <button onClick={createUser}>Create new user</button>
            </div>
        )
}

export default Login; 