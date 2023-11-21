import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import AdminDashBoard from './components/AdminDashBoard';
import Login from './components/Login';
import SignUp from './components/SignUp';
import ContactUs from './components/ContactUs';
import Branches from './components/Branches';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddProducts from './components/AddProducts';
import ModifyList from './components/ModifyList';
import UserList from './components/UserList';
import UserDashBoard from './components/UserDashboard';
import Wishlist from './components/WishList';

function App() {
  const [userRole, setUserRole] = useState(null);
  const [loggedin, setLoggedin] = useState(false);

  const handleLoginSuccess = (role) => {
    if (userRole !== 'admin') {
      setLoggedin(true);
    }
    setUserRole(role);
  };

  const handleLogout = () => {
    setUserRole(null);
    setLoggedin(false);
  };

  return (
    <>
      <Router>
        {userRole === 'admin' && <AdminDashBoard />}
        {userRole !== 'admin' && <UserDashBoard onLogout={handleLogout} onLogin={loggedin} />}

        <Routes>
          <Route
            path="/login"
            element={<Login onLoginSuccess={handleLoginSuccess} />}
          />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/branches" element={<Branches />} />
          <Route path="/addproduct" element={<AddProducts />} />
          <Route path="/manageproduct" element={<ModifyList />} />
          <Route path="/userlist" element={<UserList />} />
          <Route path=" /wishlist" element={<Wishlist/>} />
         
        </Routes>
      </Router>
    </>
  );
}

export default App;
