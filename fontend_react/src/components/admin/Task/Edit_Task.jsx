import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import MasterLayout from '../../../layouts/admin/MasterLayout'
import { swal } from 'sweetalert';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function EditCategory() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [taskInput, setTask] = useState([]);
    useEffect(() => {
        axios.get(`/api/edit-task/${id}`).then(res => {
            if (res.data.status === 200) {
                setTask(res.data.task);
            } else if (res.data.status === 404) {
                swal("Error", res.data.message, "error");
            }
        });
    }, [id]);

    const handleInput = (e) => {
        e.persist();
        setTask({ ...taskInput, [e.target.name]: e.target.value })
    }

    const updateTask = (e) => {

        const data = taskInput;
        axios.put(`/api/update-task/${id}`, data).then(res => {
            if (res.data.status === 200) {
                swal('Success', res.data.message, 'success');
            }
            else if (res.data.status === 422) {
                swal('error', res.data.message, 'error');
            }
        })
        e.preventDefault();
        navigate('/admin/allTask')
    }
    return (
        <div className='ms-3'>
            <MasterLayout>
                <div className='container-fluid'>
                    <div className="p-3">
                        <div><h2>Edit Task
                            <Link to="/admin/allTask" className='btn btn-primary float-end'>Back</Link>
                        </h2>
                        </div>
                    </div>
                    <form onSubmit={updateTask}>
                        <div className='row'>
                            <div className="col-md-6 mb-3 ">
                                <label htmlFor="title " className="form-label">Title</label>
                                <input type="text" name='title' onChange={handleInput} value={taskInput.title} className="form-control" id="title" aria-describedby="emailHelp" placeholder='Title' />
                            </div>
                            <div className="col-md-6 mb-3 ">
                                <label htmlFor="description" className="form-label">Slug</label>
                                <textarea type="text" name='description' onChange={handleInput} value={taskInput.description} className="form-control" id="description" aria-describedby="emailHelp" placeholder='Description' />
                            </div>
                            <div className="col-md-6">
                                <div className="mb-2">
                                    <label htmlFor="status">Status</label>
                                    <select name="status" onChange={handleInput} value={taskInput.status} id="status" className="form-control">
                                        <option value="1">Active</option>
                                        <option value="0">Block</option>
                                    </select>
                                </div>
                            </div>
                            <div className=" mb-3">
                                <button type="submit" className="btn btn-primary">Updete</button>
                            </div>
                        </div>
                    </form>
                </div>
            </MasterLayout>
        </div>
    )
}

export default EditCategory