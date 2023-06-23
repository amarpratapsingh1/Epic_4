import "../TaskDashboard.css";

const Task = ({ task, toggle ,updateTask,deleteTask }) => {
    if (task.completed==="0"){task.completed=false}else{task.completed=true}
    return (
      <div className=" d-flex mb-1">
        <input
          type="checkbox"
          className="form-check-input col-1 p-1 me-2 mt-2"
          onChange={() => toggle(task.id)}
          checked={task.completed}
        />
        <input type="text" value={task?.task} onChange={(e)=>updateTask(task?.id,e.target.value)} className="form-control" />
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
            <li onClick={()=>deleteTask(task?.id)}>
              <span className="ms-2"><i className="bi bi-trash-fill">Delete</i></span>
            </li>
          </ul>
        </div>
      </div>
    );
  };

  export default Task;