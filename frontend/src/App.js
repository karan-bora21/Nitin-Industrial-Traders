import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from './pages/home';
import ViewBill from './pages/ViewBill';
import CreateBill from './pages/CreateBill';
import ExcelBill from './pages/ExcelBill';
import SearchBill from './pages/SearchBill';
import AddParty from './pages/AddParty';
import LoginRegister from './pages/LoginRegister';
import EditBill from './pages/EditBill';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token')); // Initially set to null

  // Check if the user is authenticated on page load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);  // If token exists, set as authenticated
    } else {
      setIsAuthenticated(false); // No token found, not authenticated
    }
  }, []); // Run once on component mount

  const handleLogout = () => {
    setIsAuthenticated(false); // Update the state after logout
  };

  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            {/* Login/Signup Route */}
            <Route
              path="/login"
              element={<LoginRegister setIsAuthenticated={setIsAuthenticated} />}
            />
            
            {/* If not logged in, redirect to login */}
            <Route
              path="/"
              element={isAuthenticated ? <Home onLogout={handleLogout}/> : <Navigate to="/login" />}
            />

            {/* Protected Routes */}
            <Route
              path="/viewBill"
              element={isAuthenticated ? <ViewBill onLogout={handleLogout}/> : <Navigate to="/login" />}
            />
            <Route
              path="/createBill"
              element={isAuthenticated ? <CreateBill onLogout={handleLogout}/> : <Navigate to="/login" />}
            />
            <Route
              path="/excelBill"
              element={isAuthenticated ? <ExcelBill /> : <Navigate to="/login" />}
            />
            <Route
              path="/searchBill"
              element={isAuthenticated ? <SearchBill onLogout={handleLogout}/> : <Navigate to="/login" />}
            />
            <Route
              path="/editBill"
              element={isAuthenticated ? <EditBill onLogout={handleLogout}/> : <Navigate to="/login" />}
            />
            <Route
              path="/addParty"
              element={isAuthenticated ? <AddParty onLogout={handleLogout}/> : <Navigate to="/login" />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
