import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { MapPin, DollarSign, Users, Calendar, ArrowLeft, Loader2, CheckCircle } from 'lucide-react';
import { toast } from 'react-toastify';

const DestinationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  
  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingData, setBookingData] = useState({
    travel_date: '',
    number_of_people: 1,
  });
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    fetchDestinationDetails();
  }, [id]);

  const fetchDestinationDetails = async () => {
    try {
      const response = await api.get(`destinations/${id}/`);
      setDestination(response.data);
    } catch (error) {
      toast.error('Failed to load destination details');
      navigate('/destinations');
    } finally {
      setLoading(false);
    }
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.info('Please log in to book this destination');
      navigate('/login');
      return;
    }

    setBookingLoading(true);
    try {
      await api.post('bookings/', {
        destination_id: id,
        ...bookingData
      });
      toast.success('Booking requested successfully!');
      navigate('/my-bookings');
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Failed to request booking');
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Loader2 className="w-16 h-16 text-blue-600 animate-spin" />
    </div>
  );

  if (!destination) return null;

  return (
    <div className="bg-sky-50/40 min-h-screen pb-20">
      <div className="relative h-[50vh] min-h-[360px] overflow-hidden border-b border-sky-950 bg-slate-950">
        <div className="absolute inset-0 bg-slate-950/50 z-10"></div>
        <img 
          src={destination.image || 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'} 
          alt={destination.name}
          className="w-full h-full object-cover z-0"
        />
        <button 
          onClick={() => navigate('/destinations')}
          className="absolute top-6 left-6 z-20 flex items-center space-x-2 bg-slate-950/70 hover:bg-slate-950/90 backdrop-blur-md border border-white/15 px-3.5 py-2 rounded-lg text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-xs"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-sky-300" />
          <span>Back to Destinations</span>
        </button>
        <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent pt-24 pb-10 px-6 sm:px-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-3 tracking-tight">{destination.name}</h1>
            <div className="flex items-center text-slate-200 text-sm sm:text-base space-x-4">
              <span className="flex items-center"><MapPin className="w-4 h-4 mr-1.5 text-sky-300" /> {destination.location}</span>
              <span className="flex items-center font-bold text-white bg-slate-900/90 px-3.5 py-1 rounded-full text-xs sm:text-sm border border-white/15">
                <DollarSign className="w-3.5 h-3.5 text-sky-400 mr-0.5" /> {destination.price} / person
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-6">
            <section className="bg-white p-7 rounded-xl border border-sky-100/90 shadow-[0_2px_8px_-2px_rgba(56,189,248,0.06)]">
              <h2 className="text-xl font-bold text-slate-900 mb-4">About this destination</h2>
              <div className="prose prose-slate text-slate-600 text-sm leading-relaxed max-w-none">
                {destination.description?.split('\n').map((paragraph, idx) => (
                  <p key={idx} className="mb-3">{paragraph}</p>
                ))}
              </div>
            </section>
            
            <section className="bg-white p-7 rounded-xl border border-sky-100/90 shadow-[0_2px_8px_-2px_rgba(56,189,248,0.06)]">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
                <CheckCircle className="w-5 h-5 mr-2 text-sky-500" />
                What's included
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-slate-600 text-sm px-1">
                <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-sky-500 shrink-0" /> Professional local guide</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-sky-500 shrink-0" /> Premium accommodation</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-sky-500 shrink-0" /> Local transportation</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-sky-500 shrink-0" /> Daily breakfast included</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-sky-500 shrink-0" /> Exclusive curated experiences</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-sky-500 shrink-0" /> 24/7 travel support</li>
              </ul>
            </section>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white p-6 sm:p-7 rounded-xl border border-sky-100/90 shadow-[0_4px_16px_-4px_rgba(56,189,248,0.08)] sticky top-24">
              <div className="mb-6 pb-4 border-b border-sky-100 flex items-baseline justify-between">
                <div>
                  <span className="text-2xl font-extrabold text-slate-900">${destination.price}</span>
                  <span className="text-slate-500 text-xs font-normal"> / person</span>
                </div>
                <span className="text-[11px] font-semibold text-sky-700 bg-sky-50 px-2.5 py-1 rounded-full border border-sky-200 uppercase tracking-wider">Available</span>
              </div>
              
              <h3 className="text-sm font-bold text-slate-900 mb-5 uppercase tracking-wider">Book your trip</h3>
              
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center uppercase tracking-wider">
                    <Calendar className="w-3.5 h-3.5 mr-1.5 text-sky-500" /> Travel Date
                  </label>
                  <input
                    type="date"
                    required
                    className="w-full px-3.5 py-2.5 text-sm border border-sky-100 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 rounded-lg bg-sky-50/20 text-slate-800 transition-colors shadow-xs"
                    value={bookingData.travel_date}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setBookingData({...bookingData, travel_date: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center uppercase tracking-wider">
                    <Users className="w-3.5 h-3.5 mr-1.5 text-sky-500" /> Number of Travelers
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    className="w-full px-3.5 py-2.5 text-sm border border-sky-100 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 rounded-lg bg-sky-50/20 text-slate-800 transition-colors shadow-xs"
                    value={bookingData.number_of_people}
                    onChange={(e) => setBookingData({...bookingData, number_of_people: parseInt(e.target.value)})}
                  />
                </div>

                <div className="pt-4 border-t border-sky-100 mt-5">
                  <div className="bg-sky-50/60 p-3.5 rounded-lg border border-sky-100 flex justify-between text-sm font-bold text-slate-900 mb-4">
                    <span>Total Cost</span>
                    <span className="text-sky-600">${destination.price * bookingData.number_of_people}</span>
                  </div>
                  <button
                    type="submit"
                    disabled={bookingLoading}
                    className={`w-full py-3 px-4 border border-transparent rounded-lg shadow-xs text-xs font-semibold uppercase tracking-wider text-white bg-sky-500 hover:bg-sky-600 
                      ${bookingLoading ? 'opacity-75 cursor-not-allowed' : 'focus:outline-none focus:ring-2 focus:ring-sky-500/20'} 
                      transition-all duration-200 flex justify-center items-center`}
                  >
                    {bookingLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    ) : (
                      'Request Booking'
                    )}
                  </button>
                  <p className="text-center text-[11px] text-slate-400 mt-2.5">Instant confirmation request</p>
                </div>
              </form>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default DestinationDetails;
