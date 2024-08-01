import { useRef } from 'react';
import { createTask } from '../features/task/taskThunks';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const TaskForm = () => {
    const taskname = useRef();
    const describe = useRef();
    const preference = useRef();
    const deadline = useRef();
    const notifyYes = useRef();
  

    const dispatch = useDispatch();
    const loading = useSelector((state) => state.tasks.loading);
    const navigate = useNavigate();

    const handleCreateTask = async (newTask) => {
        await dispatch(createTask(newTask));
        navigate('/my-tasks');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const title = taskname.current.value;
        const description = describe.current.value;
        const priority = preference.current.value;
        const dueDate = deadline.current.value;
        let reminder = "";
        if (notifyYes.current.checked === true){
            reminder = true
        }
        else{
            reminder = false
        };
        taskname.current.value = "";
        describe.current.value = "";
        preference.current.value = "";
        deadline.current.value = "";
        notifyYes.current.value = "";
        const newTask = {
            title,
            description,
            priority,
            dueDate,
            reminder
        }
        handleCreateTask(newTask);
    };

    return (
        <form onSubmit={handleSubmit} className="form">
            <div className="mb-4">
                <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Title:</label>
                <input
                    id="title"
                    type="text"
                    ref={taskname}
                    className="addtask"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Description:</label>
                <textarea
                    id="description"
                    ref={describe}
                    className="addtask"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="priority" className="block text-gray-700 font-bold mb-2">Priority:</label>
                <select
                    id="priority"
                    ref={preference}
                    className="addtask"
                >
                    <option value="minor">Minor</option>
                    <option value="moderate">Moderate</option>
                    <option value="critical">Critical</option>
                </select>
            </div>
        
            <div className="mb-4">
                <label htmlFor="dueDate" className="block text-gray-700 font-bold mb-2">Due Date:</label>
                <input
                    id="dueDate"
                    type="date"
                    ref={deadline}
                    className="addtask"
                    min={new Date().toISOString().split('T')[0]}
                />
            </div>
            <div className="mb-4">
                <label htmlFor="Reminder" className="block text-gray-700 font-bold mb-2 radio">Reminder: &nbsp;
                    <label className='radio-space'>
                        <input className="radio-button" type="radio" name="reminder" value="no"/> No
                    </label>
                    <label className='radio-space'>
                        <input className="radio-button" type="radio" name="reminder" value="yes" ref={notifyYes}/> Yes
                    </label>
                </label>
            </div>
           
            <button type="submit" className="bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-800" disabled={loading}>
                {loading ? 'Creating Task...' : 'Add Task'}
            </button>
            </form>
    );
};

export default TaskForm;
