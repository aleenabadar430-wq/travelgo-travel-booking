import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { User, Mail, Lock, LogIn, Plane } from 'lucide-react';
import { toast } from 'react-toastify';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    
    setLoading(true);
    const { confirmPassword, ...dataToSend } = formData;
    const response = await register(dataToSend);
    
    if (response.success) {
      toast.success('Registration successful! Please log in.');
      navigate('/login');
    } else {
      toast.error(response.message || 'Registration failed');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-sky-50/40 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-xl bg-sky-50 border border-sky-100 text-sky-600 shadow-xs">
          <Plane className="h-6 w-6 text-sky-600" />
        </div>
        <h2 className="mt-5 text-center text-2xl font-extrabold text-slate-900 tracking-tight">
          Create an account
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-sky-600 hover:text-sky-700 transition-colors">
            Sign in
          </Link>
        </p>
      </div>

      <div className="mt-7 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 sm:px-8 rounded-xl border border-sky-100/90 shadow-[0_2px_8px_-2px_rgba(56,189,248,0.06)]">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Username</label>
              <div className="relative rounded-lg shadow-xs">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-4 w-4 text-sky-400" />
                </div>
                <input
                  name="username"
                  type="text"
                  required
                  className="focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 block w-full pl-9 text-sm border-sky-100 rounded-lg py-2.5 bg-sky-50/20 text-slate-800 transition-colors outline-none"
                  placeholder="Choose a username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Email address</label>
              <div className="relative rounded-lg shadow-xs">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 text-sky-400" />
                </div>
                <input
                  name="email"
                  type="email"
                  required
                  className="focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 block w-full pl-9 text-sm border-sky-100 rounded-lg py-2.5 bg-sky-50/20 text-slate-800 transition-colors outline-none"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Password</label>
              <div className="relative rounded-lg shadow-xs">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-sky-400" />
                </div>
                <input
                  name="password"
                  type="password"
                  required
                  className="focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 block w-full pl-9 text-sm border-sky-100 rounded-lg py-2.5 bg-sky-50/20 text-slate-800 transition-colors outline-none"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Confirm Password</label>
              <div className="relative rounded-lg shadow-xs">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-sky-400" />
                </div>
                <input
                  name="confirmPassword"
                  type="password"
                  required
                  className="focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 block w-full pl-9 text-sm border-sky-100 rounded-lg py-2.5 bg-sky-50/20 text-slate-800 transition-colors outline-none"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-lg shadow-xs text-xs font-semibold uppercase tracking-wider text-white bg-sky-500 ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-500/20'} transition-colors`}
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin mr-2 h-4 w-4 border-2 border-white rounded-full border-t-transparent"></div>
                    Creating account...
                  </div>
                ) : (
                  <>
                    <User className="w-4 h-4 mr-2" />
                    Sign up
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
