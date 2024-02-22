
import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import axios from 'axios';

axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.baseURL = "http://127.0.0.1:8000/";
axios.defaults.withCredentials = true;
axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem('auth_token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
})

import Login from "./components/admin/auth/Login";
import Register from "./components/admin/auth/Register";

import Dashboard from "./components/admin/Dashboard";
import AddTask from "./components/admin/Task/Add_Task";
import AllTask from "./components/admin/Task/All_Task";
import EditTask from "./components/admin/Task/Edit_Task";
import CompleteTask from "./components/admin/Task/CompleteTask";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={< Login />} />
          <Route path="/register" element={< Register />} />

          {/* Task routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin/allTask" element={< AllTask />} />
          <Route path="/admin/addTask" element={< AddTask />} />
          <Route path="/admin/edit-task/:id" element={< EditTask />} />
          <Route path="/admin/completeTask" element={< CompleteTask />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
