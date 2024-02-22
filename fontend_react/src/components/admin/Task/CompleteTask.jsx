
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import MasterLayout from '../../../layouts/admin/MasterLayout'


const CompleteTask = () => {
    const [loading, setLoading] = useState(true);
    const [completeList, setCompleteList] = useState([]);

    useEffect(() => {
        document.title = "View Task"
        axios.get(`/api/allCompleteTask`).then(res => {
            if (res.status === 200) {
                setCompleteList(res.data.complete)
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


    var viewTask = '';
    if (loading) {
        return <h3 className='text-center mt-5'>Loaging Task...</h3>
    } else {
        viewTask =
            completeList.map((items) => {
                return (
                    <tr key={items.id}>
                        {/* <td>{items.id}</td> */}
                        <td>{items.title}</td>
                        <td>{items.description}</td>
                        <td>{items.status == 1 ? "Completed":"Incomplete" }</td>
                        <td>{items.date}</td>
                        <td>
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
                            <samp className='fs-3'><i class="fa-solid fa-check-double"></i> Completed Task </samp>
                            <Link to="/admin/allTask" className='btn btn-primary me-3 float-end'>Back</Link>
                        </div>
                    </div>

                    <div className="card-body">
                        <table className='table table-striped' id="datatablesSimple">
                            <thead>
                                <tr>
                                    {/* <th># ID</th> */}
                                    <th>Title</th>
                                    <th style={{ width: "500px" }}>Description</th>
                                    <th>Status</th>
                                    <th>Completed Date</th>
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