import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MinimalNavbar from "../components/minimalnavbar";

function LoginRegister({ setIsAuthenticated }) {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = isLogin
        ? await axios.post('/api/inventory/login', { username, password }, { headers: { 'Content-Type': 'application/json' }})
        : await axios.post('/api/inventory/register', { username, password }, { headers: { 'Content-Type': 'application/json' }});

      if (isLogin && response.status === 200) {
        localStorage.setItem('token', response.data.token || 'your_jwt_secret_key');
        setIsAuthenticated(true);
        navigate('/');
      } else if (!isLogin && response.status === 201) {
        setIsLogin(true);
        navigate('/login');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div 
      className='vh-100'
      style={{
        backgroundColor: '#f0f0f5',
      }}  
    >
      <div>
      {/* Minimal Navbar */}
      <MinimalNavbar />
    <div
      className="d-flex justify-content-center align-items-center mt-5"
      style={{
        backgroundColor: '#f0f0f5',
        padding: '20px',
      }}
    >
      <div
        className="card"
        style={{
          width: '100%',
          maxWidth: '400px',
          padding: '20px',
          borderRadius: '15px',
          boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
          background: 'linear-gradient(145deg, #ffffff, #e6e6e6)',
          border: 'none',
        }}
      >
        <div className="card-body">
          {/* Tabs */}
          <div className="d-flex mb-3">
            <button
              className="btn"
              onClick={() => setIsLogin(true)}
              style={{
                width: '50%',
                backgroundColor: isLogin ? 'red' : 'lightgray',
                color: isLogin ? 'white' : 'black',
                border: isLogin ? '1px solid red' : '1px solid lightgray',
                borderRadius: '12px 0 0 12px',
                fontWeight: 'bold',
              }}
            >
              Login
            </button>
            <button
              className="btn"
              onClick={() => setIsLogin(false)}
              style={{
                width: '50%',
                backgroundColor: !isLogin ? 'red' : 'lightgray',
                color: !isLogin ? 'white' : 'black',
                border: !isLogin ? '1px solid red' : '1px solid lightgray',
                borderRadius: '0 12px 12px 0',
                fontWeight: 'bold',
              }}
            >
              Register
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                style={{ borderRadius: '10px' }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ borderRadius: '10px' }}
              />
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <button
              type="submit"
              className="btn btn-danger w-100"
              style={{
                backgroundColor: 'red',
                color: 'white',
                borderRadius: '10px',
                fontWeight: 'bold',
              }}
            >
              {isLogin ? 'Login' : 'Register'}
            </button>
          </form>

          {/* Link for toggling */}
          <div className="text-center mt-3">
            <p>
              {isLogin ? (
                <>
                  Not yet registered?{' '}
                  <span
                    className="text-primary"
                    style={{
                      cursor: 'pointer',
                      textDecoration: 'underline',
                      fontWeight: 'bold',
                    }}
                    onClick={() => setIsLogin(false)}
                  >
                    Register here
                  </span>
                </>
              ) : (
                <>
                  Already registered?{' '}
                  <span
                    className="text-primary"
                    style={{
                      cursor: 'pointer',
                      textDecoration: 'underline',
                      fontWeight: 'bold',
                    }}
                    onClick={() => setIsLogin(true)}
                  >
                    Login here
                  </span>
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
    </div>
    </div>
    
  );
}

export default LoginRegister;
