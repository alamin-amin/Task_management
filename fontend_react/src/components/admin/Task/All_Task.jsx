
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import MasterLayout from '../../../layouts/admin/MasterLayout'
import { useNavigate } from "react-router-dom";


const All_Task = () => {
    const [loading, setLoading] = useState(true);
    const [tasklist, setTasklist] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "View Task"
        axios.get(`/api/all-task`).then(res => {
            if (res.status === 200) {
                setTasklist(res.data.task)
            }
            setLoading(false);
        });
    }, []);


    const deleteTask = (e, id) => {
        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Deleting";

        axios.delete(`api/delete-task/${id}`).then(res => {
            if (res.data.status === 200) {
                swal('Success', res.data.message, 'success');
                thisClicked.closest("tr").remove();
            }
            else if (res.data.status === 404) {
                swal('Success', res.data.message, 'success');
                thisClicked.innerText = "Delete";
            }
        });
        e.preventDefault();
    }

    const completeTasks = (e, id) => {
        e.preventDefault();
        axios.put(`/api/complete-tasks/${id}`).then(res => {
            if (res.data.status === 200) {
                swal('Success', res.data.message, 'success');
                thisClicked.innerText = "Update";
            }
            else if (res.data.status === 422) {
                swal('error', res.data.message, 'error');
            }
        })
        navigate('/admin/completeTask')
    }

    var viewTask = '';
    if (loading) {
        return <h3 className='text-center mt-5'>Loaging Task...</h3>
    } else {
        viewTask =
            tasklist.map((items) => {
                return (
                    <tr key={items.id}>
                        <td>{items.title}</td>
                        <td>{items.description}</td>
                        <td>{items.status == 0 ? 'incomplete' : 'complete'}</td>
                        <td>
                            <Link to={`/admin/edit-task/${items.id}`} className='btn btn-success btn-sm me-1'><i className="fa-solid fa-pen"></i></Link>
                            <button type='button' onClick={(e) => deleteTask(e, items.id)} className='btn btn-danger btn-sm'><i className="fa-solid fa-trash-can"></i></button>
                            <button type='button' onClick={(e) => completeTasks(e, items.id)} className='btn btn-warning btn-sm ms-2'>complete</button>

                        </td>
                    </tr>
                )
            });
    }

    return (
        <div>
            <MasterLayout>
                <div className="card mb-4">
                    <div className="p-3">
                        <div><h3>All Task
                            <Link to="/admin/completeTask" className='btn btn-primary ms-5'>Completed Task</Link>
                            <Link to="/admin/addTask" className='btn btn-primary float-end ms-4'>Add Task +</Link>
                            <samp className='float-end fs-5 ms-3 mt-1'><i class="fa-solid fa-sliders"></i></samp>
                            <samp className='float-end fs-5 ms-3 mt-1'><i class="fa-solid fa-user-group"></i></samp>
                            <samp className='float-end fs-5 ms-3 mt-1'><i class="fa-solid fa-arrow-rotate-right"></i></samp>
                            <samp className='float-end fs-5 mt-1'><i class="fa-solid fa-arrow-rotate-left"></i></samp>
                        </h3>
                        </div>
                    </div>

                    <div className="card-body">
                        <table className='table table-striped' id="datatablesSimple">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th style={{ width: "500px" }}>Description</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {viewTask}
                            </tbody>
                        </table>
                    </div>
                </div>
            </MasterLayout>
        </div>
    )
}
export default All_Task