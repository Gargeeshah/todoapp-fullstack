import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
        
    };

    const handleAddTask = () => {
        navigate('/create-task');
        
    };

    const handleMyTask = () => {
        navigate('/my-tasks')
        
    }
    return (

        <nav className="bg-white  border-transparent " style={{ height: '80px',backgroundColor: "#fcfdfb"}}>
        <div className="container mx-auto px-4 py-3 flex justify-between items-center h-full">
                <div className="flex items-center">
                    <Link to="/" style={{ color: '#006400', fontSize: '1.25rem', fontWeight: '700' }}>TodoSprint  </Link>
                </div>
                <div className="flex items-center space-x-4">
                    <button className={`font-bold`}
                     style={{ color: '#006400' }} 
                     onClick={handleMyTask}>My Tasks
                     </button>

                    <button className={`font-bold`}
                    style={{ color: '#006400' }} 
                    onClick={handleAddTask}>Add Task
                    </button>

                    <button  className={`font-bold`}
                    style={{ color: '#006400' }} 
                    onClick={handleLogout}>Logout
                    </button>
                </div>
        </div>
        </nav>

    );
};

export default Navbar;


    


 


