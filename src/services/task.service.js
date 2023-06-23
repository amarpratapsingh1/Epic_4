// import axios from "axios";
// const API_URL = process.env.REACT_APP_API_URL;

// export const getAllTasks = async (data, success, error) => {
//   try {
//     const res = await axios.get(API_URL + "users/tasks");
//     if (res.status === 200) {
//       success(res.data);
//     } else {
//       error(res.error);
//     }
//   } catch (error) {
//     console.log(error);
//     error(error);
//   }
// };

// export const createTask = async (data, success, error) => {
//   try {
//     const res = await axios.post(API_URL + "users/task", {
//       userID: data.userID,
//       sessionID: data.sessionID,
//       task: data.task,
//     });
//     if (res.status === 100) {
//       success();
//     } else {
//       error(res);
//     }
//   } catch (error) {
//     console.error(error);
//     error(error);
//   }
// };

// export const updatetask = async () => {
//   try {
//     const res = await axios.post(API_URL + "/users/task/:id");
//     return res.data;
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const deletetask = async () => {
//   try {
//     const res = await axios.delete(API_URL + "/users/task/:id");
//     return res.data;
//   } catch (error) {
//     console.log(error);
//   }
// };















































import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;

export const getAllTasks = async (success, error) => {
  try {
    const res = await axios.get(`${API_URL}/users/tasks`);
    if (res.status === 200) {
      return(res.data);
    } else {
      error(res.error);
    }
  } catch (err) {
    console.log(err);
    // error(err);
  }
};

export const createTask = async (data) => {
  try {
    console.log("data.task:",data.task)
    const res = await axios.post(`${API_URL}/users/task`, {
      userID: data.userID,
      sessionID: data.sessionID,
      task: data.task,
    });
    if (res.status === 201) {
      return res.data;
    } else{
      return res.data;
    }
  } catch (err) {
    console.error(err);
  }
};

export const updateTaskById = async (id,payload) => {
  try {
    const bodyParams = { userID:localStorage.getItem('userID'), sessionID:  localStorage.getItem('sessionID'),
     ...payload }; // Replace with your actual body parameters

    const res = await axios.post(`${API_URL}/users/task/${id}`,bodyParams);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

export const deleteTaskById = async (id) => {
    try {
      const bodyParams = { userID:localStorage.getItem('userID'), sessionID:  localStorage.getItem('sessionID') }; // Replace with your actual body parameters

      const res = await axios.delete(`${API_URL}/users/task/${id}`,{data:bodyParams});
      return res.data;
    } catch (err) {
      console.error(err);
    }
  };





  