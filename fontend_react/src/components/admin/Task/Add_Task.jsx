import React, { useState } from 'react'
import MasterLayout from '../../../layouts/admin/MasterLayout'
import axios from 'axios';
import { swal } from 'sweetalert';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";


const AddTask = () => {
  const navigate = useNavigate();
  const [taskInput, setTask] = useState({
    title: '',
    description: '',
    status: '',
    date: '',
    error_list: [],
  });
  const handleInput = (e) => {
    setTask({ ...taskInput, [e.target.name]: e.target.value }); 
  }
  const submitTaskFrom = (e) => {
    axios.post(`api/add-task`, data).then(res => {
      if (res.data.status === 200) {
        swal("Success", res.data.message, "success");
        document.getElementById('categoryFrom').reset();
      }
      else if (res.data.status === 400) {
        setTask({ ...taskInput, error_list: res.data.errors });
      }
    });
   
    e.preventDefault();
    navigate('/admin/allTask')
  }
  const data = {
    title: taskInput.title,
    description: taskInput.description,
    status: taskInput.status,
    date: taskInput.date,
  }


  return (
    <div className='ms-3'>
      <MasterLayout>
        <div className='container-fluid'>
          <div className="p-3">
            <div><h2>Add Task +
              <Link to="/admin/allTask" className='btn btn-primary float-end'>All Task</Link>
            </h2>
            </div>
          </div>
          <form onSubmit={submitTaskFrom}>
            <div className='row'>
              <div className="col-md-6 mb-3 ">
                <label htmlFor="title " className="form-label">Title</label>
                <input type="text" name='title' onChange={handleInput} value={taskInput.title} className="form-control" id="title" aria-describedby="emailHelp" placeholder='Title' />
              </div>
              <div className="col-md-6 mb-3 ">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea type="textarea" name='description' onChange={handleInput} value={taskInput.description} className="form-control" id="description" aria-describedby="emailHelp" placeholder='description' />
              </div>
              <div className="col-md-6">
                <div className="mb-2">
                  <label htmlFor="status">Status</label>
                  <select name="status" onChange={handleInput} value={taskInput.status} id="status" className="form-control">
                    <option value="2">none</option>
                    <option value="1">Active</option>
                    <option value="0">Block</option>
                  </select>
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-2">
                <input type="date" name="date" value={taskInput.date} onChange={handleInput} />    
                </div>
              </div>
              <div className=" mb-3">
                <button type="submit" className="btn btn-primary">Submit</button>
              </div>
            </div>
          </form>
        </div>
      </MasterLayout>


    </div>
  )
}

export default AddTask


