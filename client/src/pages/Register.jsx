import {useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import { registerUser } from '../features/auth/authThunks';
import { clearErrors, clearSuccess } from '../features/auth/authSlice';

const Register = () => {
  
  const username = useRef();
  const emailid = useRef();
  const pwd = useRef();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { registrationErrors, registrationSuccess, loading } = useSelector((state) => state.auth);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const name = username.current.value;
    const email = emailid.current.value;
    const password = pwd.current.value;
    username.current.value = "";
    emailid.current.value = "";
    pwd.current.value = "";
    await dispatch(registerUser({ name, email, password }));
  };
  console.log(registrationSuccess)
  if (registrationSuccess) {
    dispatch(clearSuccess());
    navigate('/login');
  }

  // Clear errors on component unmount
  useEffect(() => {
    return () => {
      dispatch(clearErrors());
    };
  }, [dispatch]);

  return (
    <div className="main">
          <div className="left-container">
          <img src="/signup.gif" className="gif" alt="Loading GIF" />
          <div className="quote-box">
           
           The key to progress is to begin. <br/>
           Start by breaking complex tasks into smaller,  <br/>
           manageable steps, and tackle the first one. <br/>
           {/* and starting on the first one. <br/> */}
                <div className="quote-author">- Mark Twain</div>
                </div> 
            </div>
            <div className="right-container">
              <form onSubmit={handleSubmit} className="form">
                <h2>Start Organizing</h2>
              <input
                  type="text"
                  ref={username}
                  placeholder="Name"
                  required
                  className="TextBox"
              />
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

            {registrationErrors.length > 0 && (
                <div className="mt-4 text-center text-red-500">
                  {registrationErrors.map((error, index) => (
                      <p key={index}>{error}</p>
                  ))}
                </div>
            )}

              <button type="submit" className="button">
                {loading ? 'Registering...' : 'Register'}
              </button>

              <div className="text-center mt-4">
                <Link to="/login" style={{ fontFamily: 'Roboto', fontSize:'15px', color: 'darkgreen', textDecoration: 'underline' }}>
                  Already have an account? Log In
                </Link>
              </div>
            </form>
          </div>
      </div>
  );
};

export default Register;
