import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { setOTP } from "../redux/loginSlice";
import setOTP from "../redux/loginSlice"
import axios from "axios";

const OTPForm = ({ onVerify, onResend }) => {
  const dispatch = useDispatch();
  const otp = useSelector((state) => state.login.otp);
  
  // const setOTP = useSelector((state) => state.login.otp);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/dashboard");

    axios
      .get("http://localhost:4000/users/tasks", {
        otp: otp,
      })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => dispatch(setOTP(e.target.value))}
      />
      <button type="submit" onClick={onVerify}>Verify OTP</button>
      <button type="button" onClick={onResend}>Resend OTP</button>
    </form>
  );
};

export default OTPForm;