import TaskForm from '../components/TaskForm';
import Navbar from '../components/Navbar';

const CreateTask = () => {
    return (
        <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#88bab4' }}>
            <Navbar />
            <div className="container mx-auto p-8 flex items-start">
                <div className="flex-1">
                    <TaskForm />
                
                    <img src="/home.gif" alt="Task GIF" className="w-64 h-auto home-gif" />
                </div>
            </div>
        </div>

    );
};

export default CreateTask;
