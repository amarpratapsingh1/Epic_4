import React, { useState, useEffect, useRef } from "react";
import { createTask,deleteTask, getAllTasks } from "../services/task.service";
import Task from "./Task";

import "../TaskDashboard.css"; // Import your CSS file for styling

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
//   const [data, setdata] = useState("");

  const newTaskRef = useRef();
       const userID = localStorage.getItem('userID');
       const sessionID = localStorage.getItem('sessionID');
  useEffect(() => {
    // Fetch tasks from backend API or database
    // Update the tasks state with the fetched tasks
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    // Implement your fetch logic here
    // Return the fetched tasks
    const fetchedTasks = await getAllTasks(); // Replace with your actual fetch function
    setTasks(fetchedTasks?.result);
    // return [
    //   { id: 1, name: "Task 1", completed: true },
    //   { id: 2, name: "Task 2", completed: false },
    //   // Add more tasks as needed
    // ];
  };

  const groupTasks = () => {
    
    const completedTasks = tasks.filter((task) => task.completed=="1");
    const incompleteTasks = tasks.filter((task) => !task.completed=="0");
    console.log("tasks:",tasks)
    return { completedTasks, incompleteTasks };
  };



// const groupTasks = () => {
//     if (!tasks) {
//       return { completedTasks: [], incompleteTasks: [] };
//     }
  
//     const completedTasks = tasks.filter((task) => task.completed);
//     const incompleteTasks = tasks.filter((task) => !task.completed);
    
//     return { completedTasks, incompleteTasks };
//   };
  



  const toggleTaskStatus = (taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, completed: "1" };
      }
      return task;
    });
    // let latestTasks = [...tasks];
    // setTasks(updatedTasks, ...latestTasks]);
  };

  const addNewTask = () => {
    const newTask = {
      id: Date.now(), // Generate a unique ID (you can use a library for this)
      name: "",
      completed: false,
    };
    let latestTasks = [...tasks];
    setTasks([newTask, ...latestTasks]);
  };

  const deleteTaskUI = (id) => {
    let latestTasks = tasks.filter((t) => t?.id !== id);
    
    setTasks([...latestTasks]);
    // console.log(id,userID,sessionID)
    // deleteTask(id,localStorage.getItem('userID'), localStorage.getItem('sessionID'));
    
  };

  const updateTask = (id, task) => {
    let latestTasks = [...tasks];
    let index = latestTasks.findIndex((t) => t?.id === id);
    latestTasks[index].name = task;
    setTasks([...latestTasks]);
  };

  // const handleKeyPress = (e) => {
  //   if (e.key === "Enter") {
  //     console.log("Enter Key pressed", newTaskRef.current.value);
  //     // addNewTask();
  //     if(newTaskRef.current.value!==""){
  //       const task = {
  //         userID: window.userID,
  //         sessionID:window.sessionID,
  //         task: newTaskRef.current.value
  //       };
  //       setTasks([...tasks, task]);
  //       newTaskRef.current.value = "";
        
  //       createTask(task)
  //       getAllTasks()
  //     }
  //   }
  // };   


//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") {
//       console.log("Enter Key pressed", newTaskRef.current.value);
//       craetetask({userID, sessionID, value: newTaskRef.current.value}, () => {
//         //Task Created Successfully
//         //Call LIST TASKS API
// getAllTasks({userID, sessionID }, (taskList) => {
//     //Got Tasks list from backend
//     setTasks(taskList);
// } , (error) => {
//         //List Task was not successful
//         //Tell the user about the problem
//       })
//     }, (error) => {
//         //Create Task was not successful
//         //Tell the user about the problem
//       })};












const handleKeyPress = (e) => {
    e.stopPropagation()
    if (e.key === "Enter") {
      console.log("Enter Key pressed", newTaskRef.current.value);
      
      createTask(
        {
          userID: localStorage.getItem('userID'),
          sessionID: localStorage.getItem('sessionID'),
          task: newTaskRef.current.value
        },
        (task) => {
          // Task Created Successfully
          // Call LIST TASKS API
          getAllTasks(
            { userID: tasks.userID, sessionID: tasks.sessionID },
            (taskList) => {
              // Got Tasks list from backend
              setTasks(taskList);
            },
            (error) => {
              // List Task was not successful
              // Tell the user about the problem
            }
          );
        },
        (error) => {
          // Create Task was not successful
          // Tell the user about the problem
        }
      );
    //   const newTask = {
    //     id:localStorage.getItem('userID'), 
    //     name: newTaskRef.current.value,
    //     completed: false,
    //   };
      let latestTasks = [...tasks];
        setTasks([ ...latestTasks]);

    }
  };
  
























  const { completedTasks, incompleteTasks } = groupTasks();

  return (
    <>
      <div className="container">
        <div className="mt-5 mb-2">
          <button className="btn btn-primary" onClick={addNewTask} >
            {" "}
            <i className="bi bi-plus-circle-fill"></i> Add Task
          </button>
          <span className="handle">
            <input type="text"  onKeyPress={handleKeyPress}  ref={newTaskRef} />
          </span>
        </div>
        <div className="accordion" id="accordionExample">
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingOne">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                Incomplete Tasks
              </button>
            </h2>
            <div
              id="collapseOne"
              className="accordion-collapse collapse show"
              aria-labelledby="headingOne"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                {renderTasks(
                  incompleteTasks,
                  toggleTaskStatus,
                  updateTask,
                  deleteTaskUI
                )}
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingTwo">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo"
                aria-expanded="false"
                aria-controls="collapseTwo"
              >
                Completed Tasks
              </button>
            </h2>
            <div
              id="collapseTwo"
              className="accordion-collapse collapse show"
              aria-labelledby="headingTwo"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                {renderTasks(
                  completedTasks,
                  toggleTaskStatus,
                  updateTask,
                  deleteTaskUI
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

const renderTasks = (taskList, toggleTaskStatus, updateTask, deleteTask) => {
  return taskList?.length ? (
    taskList.map((task) => (
      <React.Fragment key={task.id}>
        <Task
          task={task}
          toggle={toggleTaskStatus}
          updateTask={updateTask}
          deleteTask={deleteTask}
        />
      </React.Fragment>
    ))
  ) : (
    <>No Any Task</>
  );
};














































































// import React from 'react';

// const Dashboard = () => {
//   // Check if the user is logged in by retrieving the userID and sessionID from localStorage
//   const userID = localStorage.getItem('userID');
//   const sessionID = localStorage.getItem('sessionID');

//   if (!userID || !sessionID) {
//     // Redirect the user to the Login page if not logged in
//     window.location.href = '/login';
//     return null;
//   }

//   return (
//     <div>
//       <h2>Welcome to the Dashboard, {userID}!</h2>
//       {/* Add your dashboard content here */}
//     </div>
//   );
// };

// export default Dashboard;
