import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../features/auth/authThunks';

const SignIn = () => {
    const emailid = useRef();
    const pwd = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, loginError } = useSelector((state) => state.auth);

    const handleSubmit = async (event) => {
        event.preventDefault();
            const email = emailid.current.value;
            const password = pwd.current.value;
            emailid.current.value = "";
            pwd.current.value = "";
            const result = await dispatch(loginUser({ email, password }));
            if (loginUser.fulfilled.match(result)) {
                navigate('/');
    }
};
    return (
        <div className="main">
            <div className="left-container">
                <img src="/login.jpg" className="image" alt="Main Image"/>
            </div>
       
            <div className="right-container">
                <form onSubmit={handleSubmit} className="form">   
                <h2>Log in</h2>
                    <input 
                        type="email"
                        ref={emailid}
                        placeholder="Email"
                        required
                        className="TextBox"
                    />
                    <input
                        type="password"
                        ref={pwd}
                        placeholder="Password"
                        required
                        className="TextBox"
                    />
                    <button type="submit" className="button" disabled={loading}>
                        {loading ? 'Signing In...' : 'Sign In'}
                    </button>
                    {loginError && <p className="mt-4 text-center text-red-600">{loginError}</p>}
               
                <div className="text-center mt-4">
                    <Link to="/register" 
                    style={{ fontFamily: 'Roboto', fontSize:'15px', color: 'darkgreen', textDecoration: 'underline' }}>Don't have an account? Register</Link>
                </div>
                </form>
        </div>
     </div>
    );
};

export default SignIn;
