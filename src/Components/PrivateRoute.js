import { Navigate } from "react-router-dom";
import { useBoard } from "../Context/BoardContext";

export const PrivateRoute = ({ children}) => {

    //const isAuthenticated = false;
    const {userData}=useBoard(); 
        
    if (userData.id) {
      return children
    }
      
    return <Navigate to="/login" />
  }