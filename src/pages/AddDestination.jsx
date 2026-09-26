import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { ArrowLeft, Save, MapPin, Image as ImageIcon, DollarSign, FileText, Compass, Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';

const AddDestination = () => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    description: '',
    short_description: '',
    price: '',
    image: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('destinations/create/', formData);
      toast.success('Destination added successfully');
      navigate('/admin');
    } catch (error) {
      toast.error('Failed to add destination');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-sky-50/40 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button 
          onClick={() => navigate('/admin')}
          className="flex items-center text-slate-600 hover:text-slate-900 mb-6 text-xs font-semibold uppercase tracking-wider transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5 text-sky-500" />
          Back to Admin Dashboard
        </button>

        <div className="bg-white rounded-xl overflow-hidden border border-sky-100/90 shadow-[0_2px_8px_-2px_rgba(56,189,248,0.06)]">
          <div className="bg-slate-950 px-8 py-6 text-white flex items-center border-b border-sky-950">
            <Compass className="w-7 h-7 mr-4 text-sky-300" />
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight">Add New Destination</h1>
              <p className="text-slate-300 mt-0.5 text-xs">Expand your travel offerings with a new location</p>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center">
                    Name 
                  </label>
                  <input
                    name="name"
                    required
                    className="w-full px-3.5 py-2.5 border border-sky-100 rounded-lg text-sm text-slate-800 focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none transition-all bg-sky-50/20"
                    placeholder="e.g. Santorini Getaway"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center">
                    <MapPin className="w-3.5 h-3.5 mr-1 text-sky-500" /> Location
                  </label>
                  <input
                    name="location"
                    required
                    className="w-full px-3.5 py-2.5 border border-sky-100 rounded-lg text-sm text-slate-800 focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none transition-all bg-sky-50/20"
                    placeholder="e.g. Greece"
                    value={formData.location}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center">
                    <DollarSign className="w-3.5 h-3.5 mr-1 text-sky-500" /> Price ($)
                  </label>
                  <input
                    name="price"
                    type="number"
                    step="0.01"
                    required
                    className="w-full px-3.5 py-2.5 border border-sky-100 rounded-lg text-sm text-slate-800 focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none transition-all bg-sky-50/20"
                    placeholder="e.g. 1500.00"
                    value={formData.price}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center">
                    <ImageIcon className="w-3.5 h-3.5 mr-1 text-sky-500" /> Image URL
                  </label>
                  <input
                    name="image"
                    type="url"
                    className="w-full px-3.5 py-2.5 border border-sky-100 rounded-lg text-sm text-slate-800 focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none transition-all bg-sky-50/20"
                    placeholder="https://example.com/image.jpg"
                    value={formData.image}
                    onChange={handleChange}
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center">
                    <FileText className="w-3.5 h-3.5 mr-1 text-slate-400" /> Short Description
                  </label>
                  <input
                    name="short_description"
                    className="w-full px-3.5 py-2.5 border border-sky-100 rounded-lg text-sm text-slate-800 focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none transition-all bg-sky-50/20"
                    placeholder="Brief summary for cards"
                    value={formData.short_description}
                    onChange={handleChange}
                    maxLength="150"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center">
                    Full Description
                  </label>
                  <textarea
                    name="description"
                    required
                    rows="4"
                    className="w-full px-3.5 py-2.5 border border-sky-100 rounded-lg text-sm text-slate-800 focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none transition-all bg-sky-50/20 resize-none"
                    placeholder="Detailed description of the destination..."
                    value={formData.description}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-sky-100 flex justify-end">
              <button
                type="button"
                onClick={() => navigate('/admin')}
                className="bg-white text-slate-700 hover:bg-sky-50 border border-sky-100 px-5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider mr-3 transition-colors"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className={`bg-sky-500 hover:bg-sky-600 text-white px-6 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider flex items-center shadow-xs transition-colors ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Save className="w-4 h-4 mr-2" />
                )}
                Save Destination
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddDestination;
