import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    // for simplicity, we are checking if token and user are in localStorage to determine if the user is authenticated
    if (!localStorage.getItem('token') || !localStorage.getItem('user')) {
        return <Navigate to="/login" />;
    }
    return children;
};

export default PrivateRoute;
