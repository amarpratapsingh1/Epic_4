import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setEmail, setUserData, setOTP }from "../redux/loginSlice";

import axios from "axios";

const LoginForm = () => {
  const [state, setState] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const Submit = (event) => {
    event.preventDefault();
    // console.log(state.email);
  
    axios
      .post("http://localhost:4000/users/requestUser", {
        email: state,
      })
      .then(function (response) {
        console.log(response.data);
        const { userID, sessionID } = response.data;
        dispatch(setEmail(state));
        dispatch(setUserData({ userID, sessionID }));
        navigate("/otp");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // add data on localstroage
  // useEffect(()=>{
  //     localStorage.setItem("login", JSON.stringify(state))
  //   }, [state])

  return (
    <>
      <h1> Login Page</h1>

      <div className="container">
        <form
        // style={{
        //   display: "flex",
        // style={{ textAlign: "center" }}
        //   justifyContent: "center",
        //   alignContent: "center",
        // }}
        >
          <label>
            Email:
            <input
              type="email"
              name="email"
              className="form-control my-3"
              placeholder="Your Email Id"
              value={state}
              onChange={(e) => {
                setState(e.target.value);
                dispatch(setEmail(e.target.value));
              }}
            />
          </label>
          <input type="button" value="Submit" onClick={Submit} />
        </form>
      </div>
    </>
  );
};

export default LoginForm;

// import React, { useState } from 'react';
// import axios from "axios";

// const LoginForm = () => {
//   const [email, setEmail] = useState('');
//   const [otp, setOTP] = useState('');
//   const [isOTPSent, setOTPSent] = useState(false);
//   const [error, setError] = useState('');

//   const handleSubmitEmail = (e) => {
//     e.preventDefault();
//     axios
//       .post("http://localhost:4000/users/requestUser", {
//         email: email,
//       })
//     // Make API call to send email with OTP using the provided email
//     // Handle success and error responses accordingly
//     // For simplicity, let's assume the API endpoint is /send-otp
//     fetch('/send-otp', {
//       method: 'POST',
//       body: JSON.stringify({ email }),
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         if (data.success) {
//           setOTPSent(true);
//         } else {
//           setError(data.error);
//         }
//       })
//       .catch((error) => {
//         setError('Something went wrong. Please try again later.');
//       });
//   };

//   const handleSubmitOTP = (e) => {
//     e.preventDefault();
//     axios
//     .get("http://localhost:4000/users/tasks", {
//       otp: otp,
//     })
//     // Make API call to verify the entered OTP
//     // Handle success and error responses accordingly
//     // For simplicity, let's assume the API endpoint is /verify-otp
//     fetch('/verify-otp', {
//       method: 'POST',
//       body: JSON.stringify({ email, otp }),
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         if (data.success) {
//           // Save the userID and sessionID in localStorage or as a cookie
//           localStorage.setItem('userID', data.userID);
//           localStorage.setItem('sessionID', data.sessionID);
//           // Redirect the user to the Dashboard page
//           window.location.href = '/dashboard';
//         } else {
//           setError(data.error);
//         }
//       })
//       .catch((error) => {
//         setError('Something went wrong. Please try again later.');
//       });
//   };

//   const handleResendOTP = () => {
//     // Make API call to resend the OTP using the provided email
//     // Handle success and error responses accordingly
//     // For simplicity, let's assume the API endpoint is /resend-otp
//     fetch('/resend-otp', {
//       method: 'POST',
//       body: JSON.stringify({ email }),
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         if (data.success) {
//           setOTPSent(true);
//         } else {
//           setError(data.error);
//         }
//       })
//       .catch((error) => {
//         setError('Something went wrong. Please try again later.');
//       });
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       {!isOTPSent ? (
//         <form onSubmit={handleSubmitEmail}>
//           <input
//             type="email"
//             placeholder="Enter your email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//           <button type="submit">Login with OTP</button>
//         </form>
//       ) : (
//         <form onSubmit={handleSubmitOTP}>
//           <input
//             type="text"
//             placeholder="Enter OTP"
//             value={otp}
//             onChange={(e) => setOTP(e.target.value)}
//             required
//           />
//           <button type="submit">Verify OTP</button>
//           <button type="button" onClick={handleResendOTP}>Resend OTP</button>
//         </form>
//       )}
//       {error && <p>{error}</p>}
//     </div>
//   );
// };

// export default LoginForm;
