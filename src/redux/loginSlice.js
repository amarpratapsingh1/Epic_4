import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login",
  initialState: {
    email: "",
    userID: "",
    sessionID: "",
    otp: "",
    tasks: [],
  },
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },

    setUserData: (state, action) => {
      const { userID, sessionID } = action.payload;
      state.userID = userID;
      state.sessionID = sessionID;
    },

    setOTP: (state, action) => {
      state.otp = action.payload;
    },

    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
    
  },
});

export const { setEmail, setUserData } = loginSlice.actions;
export default loginSlice.reducer;
