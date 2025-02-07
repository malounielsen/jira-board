import React, { createContext, useContext, useState, useEffect} from "react";


const BoardContext=createContext(); 

const BoardProvider=({children})=> {
    const [cards, setCards]=useState([]);
    const [column, setColumns]=useState([]); 
    const [boardList,setBoardList]=useState([]); 
    const [board, setBoard]= useState([]); 
    const [drop, setDrop] = useState(false); //För att hämta data igen från databsen efter drop; 
    const [newBoard, setNewBoard]=useState(); 
    const [inputVisible, setInputVisible]= useState(false); 
    const [newColumn, setNewColumn]= useState(); 
    const [columnInputVisible, setcolumnInputVisible]= useState(false); 
    const [newCard, setNewCard]= useState([]); 
    const [loggedIn, setLoggedIn]= useState(false); 
    

    //user
    const [userData, setUserData] = useState({
      email: "",
      username: "",
      password: "",
      id: null,
    });

   /* useEffect(() => {
      const storedUserData = localStorage.getItem('userId');
      if (storedUserData) {
          setUserData(JSON.parse(storedUserData));
      }
  }, []);*/

//Hämta board från db
    useEffect(()=>{
      if(userData.id){
      fetch(`http://localhost:8000/api/Board.php?user_id=${userData.id}`)//ändra till användarens userID
        .then(response=> response.json())
        .then((data)=>{
          setBoardList(data)
          setBoard(data[0])
        })

      }
    }, [userData.id])

useEffect(() => {
  if(board){
  fetch(`http://localhost:8000/api/Column.php?board_id=${board.board_id}`)
    .then((response) => response.json())
    .then((columnData) => {
        const taskPromises = columnData.map((columns) => {
            return fetch(`http://localhost:8000/api/Task.php?column_id=${columns.column_id}`)
                .then((response) => response.json())
                .then((taskData) => {
                    return { ...columns, task: taskData };
                });
        });
        Promise.all(taskPromises)
            .then((columnsWithTasks) => {
                setColumns(columnsWithTasks);
            })
            .catch((error) => {
                console.error(error);
            });
    })
    .catch((error) => {
        console.error(error);
    })}
    }, [board, drop]);

    //hantera dropet och uppdatera databasen med nytt column id på task
    const handleDrop = (event) => {
        const { active, over } = event;
        if (!over) {
          return;
        }
        fetch('http://localhost:8000/api/MoveTask.php', {
          method: "PUT", 
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            task_id: `${active.id}`,  
            column_id: `${over.id}` 
          }),
        })
          .then((response) => response.text())
          .then((data) => {
            setDrop(!drop)
          })
          .catch((error) => {
            console.error(error); 
          });

        
      };
        //Skapa en ny board
    const createNewBoard=()=>{
      fetch(`http://localhost:8000/api/NewBoard.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: `${userData.id}`,  
          board_name: `${newBoard}` 
        }),
      })
      .then((response)=>response.text())
      .then((data)=>{ 
        setInputVisible(false)
      setDrop(!drop)})
      
    }; 
//skapa ny column
    const createNewColumn=()=>{
      fetch(`http://localhost:8000/api/NewColumn.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          board_id: `${board.board_id}`,
          column_name: `${newColumn}`,
          order_index: `${column.length}`
        }),
      })
      .then((response)=>response.text())
      .then((data)=>{

        setDrop(!drop); 
        setcolumnInputVisible(false)})
    }

    //skapa ny card
    useEffect(()=>{
      fetch(`http://localhost:8000/api/NewCard.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          column_id: `${newCard.colId}`,
          title: `${newCard.title}`,
          description: `${newCard.description}`   
        }),
      })
      .then((response)=>response.text())
      .then((data=> setDrop(!drop)))
    }, [newCard])


   const contextValues={
    handleDrop,
    cards,
    setCards,
    column, 
    setColumns,
    userData, 
    setUserData,
    board,
    setBoard,
    drop, 
    setDrop,
    boardList,
    setBoardList,
    createNewBoard,
    newBoard, 
    setNewBoard,
    inputVisible, 
    setInputVisible,
    newColumn, 
    setNewColumn,
    columnInputVisible, 
    setcolumnInputVisible,
    createNewColumn,
    newCard, 
    setNewCard,
    loggedIn, 
    setLoggedIn
   }

    return (
        <BoardContext.Provider value={contextValues}>
            {children}
        </BoardContext.Provider>
    );
    };

export default BoardProvider; 
export const useBoard=()=> useContext(BoardContext); 
