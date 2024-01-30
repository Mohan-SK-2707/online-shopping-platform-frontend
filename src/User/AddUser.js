import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import '../User/AddUser.css';
import { BeatLoader } from 'react-spinners';

const AddUser = ({ onCancel }) => {
    const [id] = useState('');
    const [userId, setUserId] = useState('');
    const [title, setTitle] = useState('');
    const [completed, isCompleted] = useState(false);
    const [loading, setLoading] = useState(false);

    const showToast = (message, id) => {
        toast.success(message + id);
    };

    const addUser = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await axios.post('https://jsonplaceholder.typicode.com/todos', {
                id: id,
                userId: userId,
                title: title,
                completed: isCompleted
            });
            setTimeout(() => {
                setLoading(false);
            }, 500);
            console.log('Api call triggered and got response -', response.data.id);
            showToast('User added successfully - ', response.data.id);
            onCancel(false);
        } catch (error) {
            console.error('Exception occured while adding the user data - ', error);
            setTimeout(() => {
                setLoading(false);
            }, 500);
        } finally {
            setLoading(false);
        }
    };




    return (
        <div>
            <div className={`overlay ${onCancel ? 'show' : 'user'}`}>
                {loading ? (<div className="overlay">
                    <div className="spinner">
                        <BeatLoader color='white' loading />
                    </div>
                </div>) : (<form className='adduserform' onSubmit={addUser}>
                    <label className='lab' htmlFor="title">Title:</label>
                    <input
                        type='text'
                        id="title"
                        placeholder='Enter the title'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <label className='lab' htmlFor="userId">UserId:</label>
                    <input
                        type='number'
                        id="userId"
                        placeholder='Enter the userId'
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        required
                    />
                    <label className='lab' htmlFor="completed">Completed:</label>
                    <input
                        type='checkbox'
                        id="completed"
                        checked={completed}
                        onChange={(e) => isCompleted(e.target.checked)}
                    />
                    <button className='addUbtn' type="submit" >Add</button>
                    <button className='addUbtn' type="close" onClick={onCancel}>Cancel</button>
                </form>)}
            </div>
        </div>
    );
};

export default AddUser;