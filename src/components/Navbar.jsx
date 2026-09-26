import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Menu, X, Plane } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white/90 backdrop-blur-md border-b border-sky-100 sticky top-0 z-50 transition-all">
      <div className="h-0.5 bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-400"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center space-x-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-sky-500 text-white flex items-center justify-center group-hover:bg-sky-600 transition-all duration-300 shadow-xs">
                <Plane className="h-4 h-4" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-slate-900 group-hover:text-sky-600 transition-colors">TravelGo</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-1 sm:space-x-1.5">
            <Link to="/" className="text-slate-600 hover:text-sky-700 hover:bg-sky-50/70 px-3.5 py-2 rounded-lg text-sm font-medium transition-all">Home</Link>
            <Link to="/destinations" className="text-slate-600 hover:text-sky-700 hover:bg-sky-50/70 px-3.5 py-2 rounded-lg text-sm font-medium transition-all">Destinations</Link>
            
            {user ? (
              <>
                <Link to="/my-bookings" className="text-slate-600 hover:text-sky-700 hover:bg-sky-50/70 px-3.5 py-2 rounded-lg text-sm font-medium transition-all">My Bookings</Link>
                {user.role === 'admin' && (
                  <Link to="/admin" className="text-slate-600 hover:text-sky-700 hover:bg-sky-50/70 px-3.5 py-2 rounded-lg text-sm font-medium transition-all">Admin</Link>
                )}
                <div className="pl-2">
                  <button onClick={handleLogout} className="bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-rose-600 px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-150 border border-sky-100 hover:border-rose-200 uppercase tracking-wider">Logout</button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-2 pl-2">
                <Link to="/login" className="text-slate-700 hover:text-sky-600 px-4 py-2 rounded-lg text-sm font-medium transition-colors">Login</Link>
                <Link to="/register" className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider shadow-xs hover:shadow transition-all duration-200">Register</Link>
              </div>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-sky-700 hover:bg-sky-50 focus:outline-none transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-b border-sky-100 px-4 pt-3 pb-4 space-y-1.5 shadow-lg">
          <Link to="/" onClick={() => setIsOpen(false)} className="block px-3.5 py-2.5 rounded-lg text-base font-medium text-slate-700 hover:text-sky-700 hover:bg-sky-50 transition-colors">Home</Link>
          <Link to="/destinations" onClick={() => setIsOpen(false)} className="block px-3.5 py-2.5 rounded-lg text-base font-medium text-slate-700 hover:text-sky-700 hover:bg-sky-50 transition-colors">Destinations</Link>
          
          {user ? (
            <>
              <Link to="/my-bookings" onClick={() => setIsOpen(false)} className="block px-3.5 py-2.5 rounded-lg text-base font-medium text-slate-700 hover:text-sky-700 hover:bg-sky-50 transition-colors">My Bookings</Link>
              {user.role === 'admin' && (
                <Link to="/admin" onClick={() => setIsOpen(false)} className="block px-3.5 py-2.5 rounded-lg text-base font-medium text-slate-700 hover:text-sky-700 hover:bg-sky-50 transition-colors">Admin</Link>
              )}
              <button onClick={() => { handleLogout(); setIsOpen(false); }} className="w-full text-left block px-3.5 py-2.5 rounded-lg text-base font-medium text-rose-600 hover:bg-rose-50 transition-colors">Logout</button>
            </>
          ) : (
            <div className="pt-2 space-y-2">
              <Link to="/login" onClick={() => setIsOpen(false)} className="block w-full text-center px-4 py-2.5 rounded-lg text-base font-medium text-slate-700 bg-sky-50 hover:bg-sky-100 transition-colors">Login</Link>
              <Link to="/register" onClick={() => setIsOpen(false)} className="block w-full text-center px-4 py-2.5 rounded-lg text-base font-medium text-white bg-sky-500 hover:bg-sky-600 transition-colors">Register</Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
