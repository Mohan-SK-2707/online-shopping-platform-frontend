// User.js
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BeatLoader } from 'react-spinners'; //, BounceLoader, BeatLoader 
import AddUser from './AddUser';
import './User.css';

const User = () => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [loading, setLoading] = useState(true);
    const [showAddUserForm, setShowAddUserForm] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
                setUsers(response.data);
                setTimeout(() => {
                    setLoading(false);
                }, 500);
            } catch (error) {
                console.error('Error fetching data:', error);
                setTimeout(() => {
                    setLoading(false);
                }, 500);
            }
        };

        fetchData();
    }, []);

    // Calculate the index of the last item on the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    // Calculate the index of the first item on the current page
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    // Get the current page of items
    const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);

    const createuser = () => {
        // alert('Create user clicked....!');
        setShowAddUserForm(true);
    };

    const edituser = () => {
        alert('Edit user clicked....!');
    };



    const paginate = (direction) => {
        if (direction === 'prev' && currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
        } else if (direction === 'next' && currentPage < Math.ceil(users.length / itemsPerPage)) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    return (
        <><div>
            {showAddUserForm && <AddUser onCancel={() => setShowAddUserForm(false)} />}
            {loading ? (
                <div className="overlay">
                    <div className="spinner">
                        <BeatLoader color='white' loading />
                    </div>
                </div>
            ) : (
                <div>
                    <button className="createuser" onClick={createuser}>
                        Create User
                    </button><button className="edituser" onClick={edituser}>
                        Edit User
                    </button>

                    <div className="table-container">
                        <table className="table-class">
                            <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>Title</th>
                                    <th>Completed</th>
                                    <th>UserId</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map((row, index) => (
                                    <tr key={row.id}>
                                        <td>{indexOfFirstItem + index + 1}</td>
                                        <td>{row.title}</td>
                                        <td>{row.completed ? 'Yes' : 'No'}</td>
                                        <td>{row.userId}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="pagination">
                        <label> Total No of pages {Math.ceil(users.length / itemsPerPage)}</label>
                        <label>Page {currentPage} of {Math.ceil(users.length / itemsPerPage)}</label>
                        <button className='paginate-button' onClick={() => paginate('prev')} disabled={currentPage === 1}>
                            {'prev'}
                        </button>
                        <button className='paginate-button' onClick={() => paginate('next')} disabled={currentPage === Math.ceil(users.length / itemsPerPage)}>
                            {'next'}
                        </button>
                    </div>
                </div>
            )}
        </div></>
    );
};

export default User;
