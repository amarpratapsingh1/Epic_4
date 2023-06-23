// import React from 'react';
// import LoginForm from './components/LoginForm';
// import {Routes, Route} from "react-router-dom"
// import OTPForm from "./components/OTPForm"
// import Dashboard from "./components/Dashboard"
// import Deepak from './components/Deepak';



// <link rel="stylesheet" href="App.css"></link>

// const App = () => {
//   return (
//    <>

//   <Routes>
//     <Route path='/'  element={<LoginForm/>}/>
//     <Route path="/otp" element={<OTPForm/>} />
//     {/* <Route path="/dashboard" element={<Dashboard/>} /> */}
//     <Route path="/dashboard" element={<Deepak/>} />

//     {/* <Route path="/taskList " element={<TaskList />} /> */}


//     </Routes>
//    </>
//   )
// }

// export default App



















import Dashboard from "./components/Dashboard";
import React from 'react';
import { Routes, Route } from "react-router-dom";
import LoginForm from './components/LoginForm';
import OTPForm from "./components/OTPForm";
import Deepak from './components/Deepak';
// import Dashboard from "./components/Dashboard";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/otp" element={<OTPForm />} />
      <Route path="/dashboard" element={<Deepak/>} />
      {/* <Route path="/dashboard" element={<Dashboard />} /> */}

    </Routes>
  );
};

export default App;






