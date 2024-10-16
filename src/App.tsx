import React from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import { Routes, Route } from "react-router-dom";
import UserPosts from "./components/UserPosts/UserPosts";

function App() {
  return (
    <div className='App'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='posts/:id' element={<UserPosts />} />
      </Routes>
    </div>
  );
}

export default App;
