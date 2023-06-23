import { setEmail, setUserData, setOTP, setTasks } from "./loginSlice";

export const updateEmail = (email) => {
    return (dispatch) => {
      dispatch(setEmail(email));
    };
  };
  
  export const updateUserData = (userID, sessionID) => {
    return (dispatch) => {
      dispatch(setUserData({ userID, sessionID }));
    };
  };
  
  export const updateOTP = (otp) => {
    return (dispatch) => {
      dispatch(setOTP(otp));
    };
  };
  
  export const updateTasks = (tasks) => {
    return (dispatch) => {
      dispatch(setTasks(tasks));
    };
  };

  export {
    updateEmail,
    updateUserData,
    updateOTP,
    updateTasks
  };
  