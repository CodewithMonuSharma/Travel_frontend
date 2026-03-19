import React, { useState } from 'react';
import { X, Calendar, Users, MapPin, IndianRupee, ShieldCheck, Lock } from 'lucide-react';

export default function BookingModal({ isOpen, onClose, tour }) {
    const [travelers, setTravelers] = useState(2);
    const [date, setDate] = useState('');

    if (!isOpen || !tour) return null;

    const basePrice = parseInt(tour.price.replace(/[^\d]/g, ''));
    const total = basePrice * travelers;
    const gst = Math.round(total * 0.18);
    const grandTotal = total + gst;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-900/70 backdrop-blur-md transition-opacity"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative bg-white rounded-[2rem] shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col md:flex-row transform transition-all">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-white/80 hover:text-white bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full transition-all z-20 md:text-slate-400 md:hover:text-slate-600 md:bg-slate-100 md:hover:bg-slate-200"
                >
                    <X size={20} />
                </button>

                {/* Left Side: Summary Panel */}
                <div className="w-full md:w-5/12 relative bg-slate-900 overflow-hidden flex-shrink-0">
                    <img
                        src={tour.image}
                        alt={tour.title}
                        className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${tour.accentColor}`} />

                    <div className="relative z-10 p-8 h-full flex flex-col text-white">
                        <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1 border border-white/20 w-fit mb-4">
                            <MapPin size={12} /> {tour.duration} Trip
                        </span>
                        <h2 className="text-4xl font-black mb-2 leading-tight">{tour.title}</h2>
                        <p className="text-emerald-100 font-medium mb-8 opacity-90">{tour.tagline}</p>

                        <div className="mt-auto space-y-6">
                            <div className="flex items-center gap-3 bg-black/20 p-4 rounded-xl backdrop-blur-sm border border-white/10">
                                <IndianRupee className="text-emerald-300" size={24} />
                                <div>
                                    <p className="text-xs text-white/70 uppercase tracking-widest font-bold">Base Price</p>
                                    <p className="text-xl font-bold">{tour.price} <span className="text-sm font-normal text-white/70">/ person</span></p>
                                </div>
                            </div>

                            <div className="bg-white/10 p-5 rounded-2xl backdrop-blur-md border border-white/20 space-y-3">
                                <div className="flex justify-between items-center text-sm font-medium">
                                    <span className="text-white/80">Subtotal ({travelers} Travelers)</span>
                                    <span>₹{total.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm font-medium">
                                    <span className="text-white/80">Taxes & GST (18%)</span>
                                    <span>₹{gst.toLocaleString()}</span>
                                </div>
                                <div className="pt-3 border-t border-white/20 flex justify-between items-center mt-2">
                                    <span className="text-lg font-bold">Total Amount</span>
                                    <span className="text-2xl font-black text-emerald-300">₹{grandTotal.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Form */}
                <div className="w-full md:w-7/12 p-8 md:p-10 bg-white overflow-y-auto max-h-[85vh] md:max-h-none">
                    <div className="mb-6 flex items-center gap-2">
                        <div className="h-8 w-2 bg-emerald-500 rounded-full"></div>
                        <h3 className="text-2xl font-black tracking-tight text-slate-900">Secure Your Booking</h3>
                    </div>

                    <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onClose(); alert('Booking Confirmed successfully! You will receive an email shortly.'); }}>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            {/* Date Selection */}
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Travel Date</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                                        <Calendar size={18} />
                                    </div>
                                    <input
                                        type="date"
                                        required
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                        className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all font-semibold text-slate-700 shadow-sm"
                                    />
                                </div>
                            </div>

                            {/* Travelers Selection */}
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Number of Travelers</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                                        <Users size={18} />
                                    </div>
                                    <select
                                        value={travelers}
                                        onChange={(e) => setTravelers(Number(e.target.value))}
                                        className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all font-semibold text-slate-700 shadow-sm appearance-none"
                                    >
                                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                                            <option key={num} value={num}>{num} {num === 1 ? 'Person' : 'People'}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="pt-2">
                            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Lead Traveler Details</h4>
                            <div className="space-y-5">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-1.5">Full Name as per ID</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Enter full name"
                                        className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all font-medium text-slate-700 placeholder:text-slate-400 shadow-sm"
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-1.5">Email Address</label>
                                        <input
                                            type="email"
                                            required
                                            placeholder="you@email.com"
                                            className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all font-medium text-slate-700 placeholder:text-slate-400 shadow-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-1.5">Phone Number</label>
                                        <input
                                            type="tel"
                                            required
                                            placeholder="+91"
                                            className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all font-medium text-slate-700 placeholder:text-slate-400 shadow-sm"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pt-6">
                            <button
                                type="submit"
                                className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold shadow-xl transition-all hover:shadow-2xl hover:-translate-y-1 flex items-center justify-center gap-2 text-lg"
                            >
                                <ShieldCheck className="text-emerald-400" size={20} />
                                Confirm & Pay ₹{grandTotal.toLocaleString()}
                            </button>
                            <p className="text-center text-xs text-slate-400 font-semibold mt-4 flex items-center justify-center gap-1">
                                <Lock size={12} /> Secure 256-bit SSL encrypted payment processing
                            </p>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
}
