import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
// import { setTasks } from '../redux/loginSlice';
import setTasks from "../redux/loginSlice"
import { createTask, deleteTaskById, getAllTasks, updateTaskById } from "../services/task.service";


const Deepak = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.login.tasks);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const fetchedTasks = await getAllTasks();
    if (fetchedTasks?.result?.length) {
      dispatch(setTasks(fetchedTasks.result));
    }  
  };

  const groupTasks = () => {
    const completedTasks = tasks.filter((task) => task.completed === 1);
    const incompleteTasks = tasks.filter((task) => task.completed === 0);
    return { completedTasks, incompleteTasks };
  };

  const toggleTaskStatus = (taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    dispatch(setTasks(updatedTasks));
  };

  const addNewTask = async (name) => {
    const res = await createTask({
      userID: localStorage.getItem('userID'),
      sessionID: localStorage.getItem('sessionID'),
      task: name,
    });

    if (res) {
      const newTask = {
        id: res.taskID,
        task: name,
        completed: "0",
      };
      dispatch(setTasks([newTask, ...tasks]));
    }
  };

  const deleteTask = async (id) => {
    const updatedTasks = tasks.filter((t) => t?.id !== id);
    dispatch(setTasks(updatedTasks));
    await deleteTaskById(id);
  };

  const updateTask = async (id, task, completed) => {
    let latestTasks = [...tasks];
    let index = latestTasks.findIndex((t) => t?.id === id);
    const res = await updateTaskById(id, { task, completed: completed === '0' ? false : true });
    if (res) {
      latestTasks[index].task = task;
      latestTasks[index].completed = completed === '0' ? '0' : '1';
      dispatch(setTasks(latestTasks));
    }
  };

  const handleKeyPress = async (e) => {
    if (e.key === "Enter") {
      await addNewTask(name);
      setName('');
    }
  };

  const onAddTask = async () => {
    await addNewTask(name);
    setName('');
  };

  const { completedTasks, incompleteTasks } = groupTasks();
  const [name, setName] = useState('');

  return (
    <>
      <div className="container">
        <div className="row mt-5 mb-2">
          <div className="col-4 pe-0"><button className="btn btn-primary" onClick={onAddTask}>Add Task</button></div>
          <div className="col-8 ps-0">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyUp={handleKeyPress}
              className="form-control"
            />
          </div>
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
                {renderTasks(incompleteTasks, toggleTaskStatus, updateTask, deleteTask)}
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
                {renderTasks(completedTasks, toggleTaskStatus, updateTask, deleteTask)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Deepak;

const renderTasks = (taskList, toggleTaskStatus, updateTask, deleteTask) => {
  return taskList?.length ? taskList.map((task) => (
    <React.Fragment key={task.id}>
      <Task task={task} toggle={toggleTaskStatus} updateTask={updateTask} deleteTask={deleteTask} />
    </React.Fragment>
  )) : <>No Any Task</>;
};

const Task= ({ tasks }) => {
  const dispatch = useDispatch();

  const updateTask = async (id, task, completed) => {
    let latestTasks = [...tasks];
    let index = latestTasks.findIndex((t) => t?.id === id);
    const res = await updateTaskById(id, { task, completed: completed === '0' ? false : true });
    if (res) {
      latestTasks[index].task = task;
      latestTasks[index].completed = completed === '0' ? '0' : '1';
      dispatch(setTasks(latestTasks));
    }
  };

  const deleteTask = async (id) => {
    let latestTasks = tasks.filter((t) => t?.id !== id);
    dispatch(setTasks(latestTasks));
    await deleteTaskById(id);
  };

  return (
    <div className="d-flex mb-1">
      <input
        type="checkbox"
        className="form-check-input col-1 p-1 me-2 mt-2"
        onChange={(e) => {
          updateTask(tasks?.id, tasks.tasks, e.target.checked ? '1' : '0');
          e.stopPropagation();
        }}
        checked={tasks.completed === 1}
      />
      <input
        type="text"
        value={tasks?.tasks}
        onChange={(e) => {
          updateTask(tasks?.id, e.target.value, tasks?.completed);
          e.stopPropagation();
        }}
        className="form-control"
      />
      <div className="dropdown col-2">
        <button
          className="btn"
          type="button"
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i className="bi bi-three-dots-vertical"></i>
        </button>

        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          <li onClick={(e) => {
            deleteTask(tasks?.id);
            e.stopPropagation();
          }}>
            <span className="ms-2">Delete</span>
          </li>
        </ul>
      </div>
    </div>
  );
};






