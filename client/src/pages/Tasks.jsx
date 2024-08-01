import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTasks } from '../features/task/taskThunks.js';
import TaskCard from '../components/TaskCard';
import Navbar from '../components/Navbar';
import Modal from '../components/Modal';

const Tasks = () => {
    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.tasks?.tasks);
    const loading = useSelector((state) => state.tasks?.loading);
    const error = useSelector((state) => state.tasks?.error);
    const [sortByPriority, setSortByPriority] = useState(true);
    const [sortedTasks, setSortedTasks] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [gettasks,setTasks] = useState([]);

    useEffect(() => {
        dispatch(fetchTasks());
    }, [dispatch]);

    useEffect(() => {
        if (tasks && tasks.length > 0) {
            const sorted = [...tasks].sort((a, b) => {
                const priorityOrder = { critical: 3, moderate: 2, minor: 1 };
                return sortByPriority ? priorityOrder[b.priority] - priorityOrder[a.priority] : priorityOrder[a.priority] - priorityOrder[b.priority];
            });
            setSortedTasks(sorted);
        }
    }, [tasks, sortByPriority]);

    const toggleSortByPriority = () => {
        setSortByPriority(!sortByPriority);
    };

    const handleUpdateClick =(task) => {
        setShowModal(true);
        setTasks(task)
    }

    
    return (
        <div className="min-h-screen flex flex-col" style={{backgroundColor: "#fcfdfb"}}> 
            {showModal && <Modal  task={gettasks} onClose={()=> setShowModal(false)}/> }
            <Navbar/>
            {/* {loading && <p>Loading tasks...</p>} */}
            <div className="flex flex-col items-center mt-8">
                {tasks && tasks.length > 1 && (
                    <div className="self-end mr-8 mb-4">
                        <button
                            onClick={toggleSortByPriority}
                            className="bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-800">
                            {sortByPriority ? 'Reverse' : 'Sort by Priority'}
                             
                        </button>
                    </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-5xl mx-auto">
                    {error && <p className="text-red-500">{error}</p>}
                    {!error && tasks && tasks.length > 0 ? (
                        sortedTasks.map((task) => <TaskCard key={task._id} task={task} onUpdateClick={handleUpdateClick} />)
                    ) : (
                        <div className="flex-1 flex justify-center items-center">
                            <p className="text-gray-500 whitespace-nowrap">
                                No tasks added.
                            </p>
                        </div>
                        
                    )}
                </div>
            </div>
    </div>
    );
};

export default Tasks;