import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { MapPin, Calendar, Star, Clock, Check, X, Shield, Users, CreditCard } from 'lucide-react';
import BookingModal from '../components/BookingModal';

export default function TourDetails() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [tour, setTour] = useState(null);
    const [travelDates, setTravelDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    const [travelers, setTravelers] = useState(2);
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchTour = async () => {
            try {
                const res = await api.get(`/tours/${slug}/`);
                setTour(res.data);
                if (res.data.travel_dates && res.data.travel_dates.length > 0) {
                    setTravelDates(res.data.travel_dates);
                    setSelectedDate(res.data.travel_dates[0].date);
                }
            } catch (err) {
                console.error("Failed to load tour details", err);
            } finally {
                setLoading(false);
            }
        };
        fetchTour();
    }, [slug]);

    if (loading) return <div className="min-h-screen flex items-center justify-center pt-20 text-emerald-600 font-bold text-xl drop-shadow-sm">Loading Premium Experience...</div>;
    if (!tour) return <div className="min-h-screen flex items-center justify-center pt-20 text-slate-500 font-bold text-xl">Tour not found.</div>;

    const basePrice = parseFloat(tour.starting_price);
    const totalAmount = basePrice * travelers;

    return (
        <div className="bg-slate-50 min-h-screen pt-16 font-sans">
            {/* Massive Hero Image Section */}
            <div className="relative h-[60vh] md:h-[70vh] w-full">
                <img src={tour.hero_image || 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=80'} alt={tour.title} className="absolute inset-0 w-full h-full object-cover" />
                <div className={`absolute inset-0 bg-gradient-to-t from-emerald-900/60 to-transparent`} />
                <div className="absolute inset-0 bg-black/40" />

                <div className="absolute inset-0 flex flex-col justify-end pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full text-white">
                    <button onClick={() => navigate('/')} className="mb-8 w-fit flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full hover:bg-white/30 transition-colors">
                        &larr; Back to Destinations
                    </button>

                    <div className="flex flex-wrap items-center gap-4 mb-4">
                        <span className="bg-emerald-500/90 backdrop-blur-md px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider flex items-center gap-2">
                            <MapPin size={16} /> {tour.location}
                        </span>
                        <span className="bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-2">
                            <Star size={16} className="text-yellow-300 fill-yellow-300" /> {tour.rating} Excellent
                        </span>
                        <span className="bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-2">
                            <Clock size={16} /> {tour.duration}
                        </span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4">{tour.title}</h1>
                    <p className="text-xl md:text-2xl text-white/90 max-w-2xl">{tour.short_description}</p>
                </div>
            </div>

            {/* Split Content Layout */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col lg:flex-row gap-12">
                {/* Left Side: Itinerary & Info (70% width) */}
                <div className="lg:w-2/3 space-y-12">
                    {/* Inclusions & Exclusions */}
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6">What's Included</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-emerald-600 font-bold mb-4 flex items-center gap-2"><Check size={20} /> Inclusions</h3>
                                <ul className="space-y-3">
                                    {tour.inclusions?.map((inc, i) => (
                                        <li key={i} className="flex items-start gap-3 text-slate-600 font-medium">
                                            <div className="mt-1 bg-emerald-100 p-1 rounded-full flex-shrink-0"><Check size={12} className="text-emerald-600" /></div>
                                            {inc.text}
                                        </li>
                                    ))}
                                    {tour.inclusions?.length === 0 && <span className="text-slate-400">None specified.</span>}
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-red-500 font-bold mb-4 flex items-center gap-2"><X size={20} /> Exclusions</h3>
                                <ul className="space-y-3">
                                    {tour.exclusions?.map((exc, i) => (
                                        <li key={i} className="flex items-start gap-3 text-slate-500">
                                            <div className="mt-1 bg-red-100 p-1 rounded-full flex-shrink-0"><X size={12} className="text-red-500" /></div>
                                            {exc.text}
                                        </li>
                                    ))}
                                    {tour.exclusions?.length === 0 && <span className="text-slate-400">None specified.</span>}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Day by Day Itinerary */}
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900 mb-8">Detailed Itinerary</h2>
                        <div className="space-y-6">
                            {tour.itinerary_days?.length > 0 ? tour.itinerary_days.map((day, index) => (
                                <div key={index} className="flex gap-6">
                                    {/* Timeline Line */}
                                    <div className="flex flex-col items-center">
                                        <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center border-4 border-white shadow-sm z-10">
                                            D{day.day_number}
                                        </div>
                                        {index !== tour.itinerary_days.length - 1 && (
                                            <div className="w-0.5 h-full bg-slate-200 mt-2"></div>
                                        )}
                                    </div>

                                    {/* Day Content */}
                                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex-1 mb-2 hover:shadow-md transition-shadow">
                                        <h3 className="text-xl font-bold text-slate-900 mb-3">{day.title}</h3>
                                        <p className="text-slate-600 leading-relaxed font-medium">{day.description}</p>
                                    </div>
                                </div>
                            )) : (
                                <p className="text-slate-500 bg-white p-8 rounded-2xl border border-slate-100 text-center font-medium">Itinerary details will be available soon.</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Side: Sticky Booking Bar (30% width) */}
                <div className="lg:w-1/3 relative">
                    <div className="sticky top-28 bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <p className="text-slate-500 font-bold uppercase tracking-wider text-xs mb-1">Starting Price</p>
                                <h3 className="text-4xl font-black text-slate-900">₹{basePrice.toLocaleString('en-IN')}</h3>
                            </div>
                            <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold uppercase">Per Person</span>
                        </div>

                        <div className="space-y-6 mb-8">
                            {/* Date Picker Input */}
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Select Date</label>
                                <div className="relative">
                                    <select
                                        value={selectedDate}
                                        onChange={(e) => setSelectedDate(e.target.value)}
                                        className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl p-4 pl-12 cursor-pointer outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors font-semibold text-slate-700"
                                    >
                                        {travelDates.length > 0 ? (
                                            travelDates.map(date => (
                                                <option key={date.id} value={date.date}>{date.date}</option>
                                            ))
                                        ) : (
                                            <option value="">Contact us for dates</option>
                                        )}
                                    </select>
                                    <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-600 pointer-events-none" size={20} />
                                </div>
                            </div>

                            {/* Travelers Counter */}
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Travelers</label>
                                <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl p-2">
                                    <button
                                        onClick={() => setTravelers(Math.max(1, travelers - 1))}
                                        className="w-10 h-10 rounded-lg bg-white shadow flex items-center justify-center text-slate-600 hover:text-emerald-600 font-bold text-xl"
                                    >-</button>
                                    <span className="font-black text-lg flex items-center gap-2">
                                        <Users size={18} className="text-slate-400" /> {travelers} Adults
                                    </span>
                                    <button
                                        onClick={() => setTravelers(travelers + 1)}
                                        className="w-10 h-10 rounded-lg bg-white shadow flex items-center justify-center text-slate-600 hover:text-emerald-600 font-bold text-xl"
                                    >+</button>
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-slate-100 pt-6 mb-6">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-slate-600 font-medium">Total Amount ({travelers}x)</span>
                                <span className="text-xl font-bold">₹{totalAmount.toLocaleString('en-IN')}</span>
                            </div>
                            <p className="text-xs text-slate-400 text-right">Taxes included</p>
                        </div>

                        <button
                            onClick={() => setIsBookingModalOpen(true)}
                            className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black text-lg py-5 rounded-2xl shadow-[0_10px_20px_rgba(16,185,129,0.3)] hover:shadow-[0_15px_30px_rgba(16,185,129,0.4)] transition-all hover:-translate-y-1 flex items-center justify-center gap-2"
                        >
                            <CreditCard size={22} /> Proceed to Book
                        </button>

                        <div className="mt-6 flex items-center justify-center gap-2 text-sm text-slate-500 font-medium">
                            <Shield size={16} className="text-emerald-500" />
                            100% Secure Checkout Guarantee
                        </div>
                    </div>
                </div>
            </div>

            {/* Existing Global Booking Modal to finalize Flow */}
            <BookingModal
                isOpen={isBookingModalOpen}
                onClose={() => setIsBookingModalOpen(false)}
                tour={tour}
            />
        </div>
    );
}
