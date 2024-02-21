
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import MasterLayout from '../../../layouts/admin/MasterLayout'


const CompleteTask = () => {
    const [loading, setLoading] = useState(true);
    const [tasklist, setTasklist] = useState([]);

    useEffect(() => {
        document.title = "View Task"
        axios.get(`/api/all-task`).then(res => {
            if (res.status === 200) {
                setTasklist(res.data.task)
            }
            setLoading(false);
        });
    }, []);

    var viewTask = '';
    if (loading) {
        return <h3 className='text-center mt-5'>Loaging Task...</h3>
    } else {
        viewTask =
            tasklist.map((items) => {
                return (
                    <tr key={items.id}>
                        <td>{items.id}</td>
                        <td>{items.title}</td>
                        <td>{items.description}</td>
                        <td>{items.status}</td>
                        <td>
                            <Link to={`/admin/edit-category/${items.id}`} className='btn btn-success btn-sm me-1'><i className="fa-solid fa-pen"></i></Link>
                            <button type='button' onClick={(e) => deleteTask(e, items.id)} className='btn btn-danger btn-sm'><i className="fa-solid fa-trash-can"></i></button>
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
                        <div className='text-center pt-4'>
                            <h2><i class="fa-solid fa-check-double"></i> Completed Task </h2>
                        </div>
                    </div>

                    <div className="card-body">
                        <table className='table table-striped' id="datatablesSimple">
                            <thead>
                                <tr>
                                    <th># ID</th>
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

export default CompleteTask