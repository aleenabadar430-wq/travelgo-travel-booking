import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { Settings, Map, Users, PlusCircle, Loader2, Edit, Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
  const [destinations, setDestinations] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('destinations');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [destRes, bookRes] = await Promise.all([
        api.get('destinations/'),
        api.get('bookings/all/')
      ]);

      const destData = destRes.data;
      const destList = Array.isArray(destData) 
        ? destData 
        : (Array.isArray(destData?.results) ? destData.results : []);

      const bookData = bookRes.data;
      const bookList = Array.isArray(bookData)
        ? bookData
        : (Array.isArray(bookData?.results) ? bookData.results : []);

      setDestinations(destList);
      setBookings(bookList);
    } catch (error) {
      toast.error('Failed to load admin data. Ensure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteDestination = async (id) => {
    if (window.confirm('Are you sure you want to delete this destination?')) {
      try {
        await api.delete(`destinations/${id}/`);
        setDestinations(destinations.filter(d => d.id !== id));
        toast.success('Destination deleted');
      } catch (error) {
        toast.error('Failed to delete destination');
      }
    }
  };

  const handleBookingStatus = async (id, status) => {
    try {
      await api.patch(`bookings/${id}/update-status/`, {
        status: status
      });

      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking.id === id
            ? { ...booking, status: status }
            : booking
        )
      );

      toast.success(`Booking ${status}`);
    } catch (error) {
      toast.error('Failed to update booking status');
    }
  };
  

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-sky-50/40">
      <Loader2 className="w-12 h-12 text-sky-500 animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen bg-sky-50/40 flex">
      <div className="w-64 bg-white border-r border-sky-100 hidden md:flex flex-col">
        <div className="p-5 border-b border-sky-100 flex items-center space-x-3 bg-sky-50/30">
          <Settings className="w-5 h-5 text-sky-600" />
          <h2 className="text-lg font-bold text-slate-900">Admin Panel</h2>
        </div>
        <div className="flex-1 py-4 flex flex-col gap-1.5 px-3">
          <button 
            onClick={() => setActiveTab('destinations')}
            className={`w-full flex items-center px-3.5 py-2.5 text-sm font-medium rounded-lg transition-colors ${activeTab === 'destinations' ? 'bg-sky-500 text-white shadow-xs' : 'text-slate-600 hover:bg-sky-50'}`}
          >
            <Map className="w-4 h-4 mr-3" />
            Destinations
          </button>
          <button 
            onClick={() => setActiveTab('bookings')}
            className={`w-full flex items-center px-3.5 py-2.5 text-sm font-medium rounded-lg transition-colors ${activeTab === 'bookings' ? 'bg-sky-500 text-white shadow-xs' : 'text-slate-600 hover:bg-sky-50'}`}
          >
            <Users className="w-4 h-4 mr-3" />
            All Bookings
          </button>
        </div>
      </div>

      <div className="flex-1 p-6 sm:p-8">
        <div className="max-w-6xl mx-auto">

          <div className="flex gap-2 mb-6 md:hidden">
            <button
              onClick={() => setActiveTab('destinations')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                activeTab === 'destinations'
                  ? 'bg-sky-500 text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-sky-100'
              }`}
            >
              Destinations
            </button>

            <button
              onClick={() => setActiveTab('bookings')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                activeTab === 'bookings'
                  ? 'bg-sky-500 text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-sky-100'
              }`}
            >
              All Bookings
            </button>
          </div>

          {activeTab === 'destinations' ? (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Manage Destinations</h1>
                <Link 
                  to="/admin/add-destination" 
                  className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg text-xs uppercase tracking-wider font-semibold flex items-center shadow-xs transition-colors"
                >
                  <PlusCircle className="w-4 h-4 mr-2" /> Add Destination
                </Link>
              </div>
              
              <div className="bg-white rounded-xl border border-sky-100/90 shadow-[0_2px_8px_-2px_rgba(56,189,248,0.06)] overflow-hidden">
                <table className="min-w-full divide-y divide-sky-100">
                  <thead className="bg-sky-50/50">
                    <tr>
                      <th className="px-6 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Destination</th>
                      <th className="px-6 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Location</th>
                      <th className="px-6 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Price</th>
                      <th className="px-6 py-3.5 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-sky-100">
                    {destinations.map(dest => (
                      <tr key={dest.id} className="hover:bg-sky-50/30 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{dest.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{dest.location}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">${dest.price}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-slate-600 hover:text-sky-600 p-1.5 rounded-md hover:bg-sky-50 transition-colors mr-1">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDeleteDestination(dest.id)}
                            className="text-slate-600 hover:text-rose-600 p-1.5 rounded-md hover:bg-rose-50 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-6">All Bookings</h1>
              <div className="bg-white rounded-xl border border-sky-100/90 shadow-[0_2px_8px_-2px_rgba(56,189,248,0.06)] overflow-hidden">
                <table className="min-w-full divide-y divide-sky-100">
                  <thead className="bg-sky-50/50">
                    <tr>
                      <th className="px-6 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">User</th>
                      <th className="px-6 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Destination</th>
                      <th className="px-6 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Travel Date</th>
                      <th className="px-6 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-sky-100">
                    {bookings.map(booking => (
                      <tr key={booking.id} className="hover:bg-sky-50/30 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{booking.user?.username || booking.user || 'Unknown'}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{booking.destination?.name || 'Destination'}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{new Date(booking.travel_date).toLocaleDateString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <select
                            value={booking.status || 'pending'}
                            onChange={(e) =>
                              handleBookingStatus(booking.id, e.target.value)
                            }
                            className={`px-3 py-1 text-xs font-semibold rounded-lg border outline-none cursor-pointer transition-colors ${
                              booking.status === 'confirmed'
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                : booking.status === 'cancelled'
                                ? 'bg-rose-50 text-rose-700 border-rose-200'
                                : 'bg-amber-50 text-amber-700 border-amber-200'
                            }`}
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
