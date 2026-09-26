import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Components
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Destinations from './pages/Destinations';
import DestinationDetails from './pages/DestinationDetails';
import MyBookings from './pages/MyBookings';
import AdminDashboard from './pages/AdminDashboard';
import AddDestination from './pages/AddDestination';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen font-sans">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/destinations" element={<Destinations />} />
              <Route path="/destinations/:id" element={<DestinationDetails />} />

              {/* Protected User Routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/my-bookings" element={<MyBookings />} />
              </Route>

              {/* Protected Admin Routes */}
              <Route element={<ProtectedRoute adminOnly={true} />}>
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/add-destination" element={<AddDestination />} />
              </Route>
            </Routes>
          </main>
          
          <footer className="bg-slate-900 border-t border-slate-800 py-10 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <p className="text-slate-400 text-sm font-medium tracking-wide">
                &copy; 2026 TravelGo. All rights reserved.
              </p>
            </div>
          </footer>
        </div>
      </Router>
      <ToastContainer position="bottom-right" theme="colored" autoClose={3000} />
    </AuthProvider>
  );
}

export default App;
