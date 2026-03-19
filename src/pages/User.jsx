import React, { useState, useEffect } from 'react';
import { MapPin, Calendar, Star, ChevronRight, Compass, Search, ShieldCheck, Heart, MountainSnow, Sunrise, Users, Send, Plane, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

export default function User() {
    const [tours, setTours] = useState([]);
    const [offers, setOffers] = useState([]);
    const [activeSlug, setActiveSlug] = useState(null);
    const navigate = useNavigate();
    const [searchDestination, setSearchDestination] = useState('Kashmir');
    const [searchMonth, setSearchMonth] = useState('April');
    const [searchGuests, setSearchGuests] = useState('2');

    useEffect(() => {
        const fetchTours = async () => {
            try {
                const res = await api.get('/tours/');
                setTours(res.data);
                if (res.data.length > 0) {
                    setActiveSlug(res.data[0].slug);
                }
            } catch (err) {
                console.error("Failed to load tours", err);
            }
        };
        const fetchOffers = async () => {
            try {
                const res = await api.get('/offers/');
                setOffers(res.data);
            } catch (err) {
                console.error("Failed to load offers", err);
            }
        };
        fetchTours();
        fetchOffers();
    }, []);

    const handleSearch = () => {
        // Find a tour that matches the destination searched
        const matchingTour = tours.find(tour =>
            tour.title.toLowerCase().includes(searchDestination.toLowerCase()) ||
            tour.short_description.toLowerCase().includes(searchDestination.toLowerCase()) ||
            tour.location.toLowerCase().includes(searchDestination.toLowerCase())
        );

        if (matchingTour) {
            navigate(`/tour/${matchingTour.slug}`);
        } else {
            alert(`Sorry, no tours currently matching "${searchDestination}" could be found! Try 'Kashmir', 'Varanasi', or 'Rajasthan'.`);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-50/30 dark:from-emerald-950/10 via-slate-50 dark:via-slate-950 to-teal-50/30 dark:to-teal-950/10 font-sans transition-colors duration-500">

            {/* Hero Section with MMT Style Booking Console */}
            <section id="tours" className="relative pt-12 pb-32 px-4 overflow-hidden flex flex-col items-center justify-start min-h-[85vh]">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=80')] bg-cover bg-center -z-20 scale-105" />
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-slate-900/40 to-[#f8fafc] -z-10" />

                {/* Hero Headline */}
                <div className="max-w-4xl mx-auto text-center mt-12 lg:mt-20 mb-8 lg:mb-12 relative z-20 px-4">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6 shadow-sm">
                        <Sparkles size={16} className="text-amber-300" />
                        <span className="text-white text-sm font-bold tracking-widest uppercase">Uncover the Unseen</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl lg:text-[5rem] font-black text-white mb-6 tracking-tight leading-[1.1] drop-shadow-2xl">
                        Journey Beyond The <br className="hidden md:block" /><span className="text-emerald-400 italic">Ordinary.</span>
                    </h1>
                    <p className="text-lg md:text-xl lg:text-2xl text-slate-200 font-medium max-w-2xl mx-auto drop-shadow-md">
                        Discover breathtaking landscapes and rich heritage with our exclusively curated North Indian expeditions.
                    </p>
                </div>

                <div className="max-w-7xl mx-auto w-full">
                    {/* Booking Console Container */}
                    <div className="bg-white/90 dark:bg-slate-900/90 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-4 md:p-8 max-w-5xl mx-auto relative z-20 border border-slate-100/50 dark:border-slate-700/50 backdrop-blur-sm">

                        {/* Tabs Navigation */}
                        <div className="flex overflow-x-auto hide-scrollbar gap-2 mb-8 bg-slate-50/80 dark:bg-slate-800/80 p-2 rounded-2xl w-max mx-auto border border-slate-200 dark:border-slate-700 shadow-inner">
                            <button className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all whitespace-nowrap bg-emerald-600 text-white shadow-lg shadow-emerald-600/20">
                                <Compass size={18} className="text-white" /> Curated Tour Packages
                            </button>
                        </div>

                        {/* Search Input Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 relative shadow-sm">

                            {/* DESTINATION */}
                            <div className="relative border-b md:border-b-0 md:border-r border-slate-100 dark:border-slate-800 pb-4 md:pb-0 md:pr-4 group hover:bg-slate-50 dark:hover:bg-slate-800/50 -m-4 p-4 md:-mr-4 md:pr-8 rounded-l-2xl transition-colors">
                                <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1 group-hover:text-emerald-500 transition-colors">Where To?</label>
                                <input
                                    type="text"
                                    value={searchDestination}
                                    onChange={(e) => setSearchDestination(e.target.value)}
                                    className="text-3xl font-black text-slate-900 dark:text-white bg-transparent border-none outline-none w-full truncate placeholder:text-slate-300 dark:placeholder:text-slate-600 h-10"
                                    placeholder="Enter Destination"
                                />
                                <div className="text-sm font-medium text-slate-500 truncate mt-1">India (North)</div>
                            </div>

                            {/* MONTH */}
                            <div className="relative border-b md:border-b-0 md:border-r border-slate-100 dark:border-slate-800 pb-4 md:px-0 md:pr-4 group hover:bg-slate-50 dark:hover:bg-slate-800/50 -m-4 p-4 md:-mr-4 md:pr-8 rounded-l-2xl transition-colors">
                                <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1 ml-3 group-hover:text-emerald-500 transition-colors">Travel Month</label>
                                <div className="text-3xl font-black text-slate-900 dark:text-white flex items-center ml-3 mt-1 w-full max-w-[200px]">
                                    <input
                                        type="text"
                                        value={searchMonth}
                                        onChange={(e) => setSearchMonth(e.target.value)}
                                        className="bg-transparent border-none outline-none w-full p-0 m-0 truncate placeholder:text-slate-300 dark:placeholder:text-slate-600"
                                        placeholder="e.g. April"
                                    />
                                    <span className="text-sm font-semibold text-slate-500 ml-1 whitespace-nowrap">'26</span>
                                </div>
                                <div className="text-sm font-medium text-slate-500 mt-1 ml-3">Spring Season</div>
                            </div>
                            {/* TRAVELERS */}
                            <div className="relative border-b md:border-b-0 md:border-r border-slate-100 dark:border-slate-800 pb-4 md:px-0 md:pr-4 group hover:bg-slate-50 dark:hover:bg-slate-800/50 -m-4 p-4 md:-mr-4 md:pr-8 rounded-r-2xl transition-colors">
                                <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1 ml-4 group-hover:text-emerald-500 transition-colors">Guests</label>
                                <div className="text-3xl font-black text-slate-900 dark:text-white flex items-center gap-0 mt-1">
                                    <input
                                        type="text"
                                        value={searchGuests}
                                        onChange={(e) => setSearchGuests(e.target.value)}
                                        className="bg-transparent border-none outline-none w-12 p-0 m-0 text-center placeholder:text-slate-300 dark:placeholder:text-slate-600"
                                        placeholder="2"
                                    />
                                    <span className="text-xl font-bold">People</span>
                                </div>
                                <div className="text-sm font-medium text-slate-500 truncate mt-1 ml-4">
                                    {Math.ceil(parseInt(searchGuests) / 2) || 1} Room(s)
                                </div>
                            </div>
                        </div>

                        {/* Massive Action Button */}
                        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                            <button
                                onClick={handleSearch}
                                className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-16 py-4 rounded-full font-black text-2xl tracking-wide shadow-[0_10px_30px_rgb(16,185,129,0.4)] transition-all hover:scale-105 hover:shadow-[0_15px_40px_rgb(16,185,129,0.5)] flex items-center gap-2"
                            >
                                SEARCH
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Exclusive Offers Carousel Section */}
            <section id="packages" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full pt-16 pb-12 relative z-10">
                <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-white dark:border-slate-800 p-6 md:p-10">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                        <h2 className="text-4xl font-black bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent tracking-tight flex items-center gap-3">
                            <Star className="text-amber-400 fill-amber-400" size={36} /> Exclusive Offers
                        </h2>
                        <div className="bg-slate-50 dark:bg-slate-800 rounded-full p-1 border border-slate-200 dark:border-slate-700 flex font-bold text-sm overflow-x-auto max-w-full hide-scrollbar">
                            <button className="px-6 py-2 rounded-full bg-white dark:bg-slate-700 shadow text-slate-900 dark:text-white whitespace-nowrap">All Offers</button>
                            <button className="px-6 py-2 rounded-full text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white whitespace-nowrap">Bank Promos</button>
                            <button className="px-6 py-2 rounded-full text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white whitespace-nowrap">Cabs & Buses</button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {offers.length > 0 ? offers.map((offer, idx) => (
                            <div key={idx} className={`bg-slate-50/80 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700 p-4 gap-4 hover:shadow-md transition-shadow cursor-pointer flex ${idx > 1 ? 'hidden lg:flex' : ''} group`}>
                                <img src={offer.image || "https://images.unsplash.com/photo-1595815771614-ade9d6527653?w=150&h=150&fit=crop"} className="w-24 h-24 rounded-xl object-cover shadow-sm group-hover:scale-105 transition-transform" />
                                <div className="flex-1 flex flex-col justify-center">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 flex items-center gap-1"><Compass size={12} /> {offer.tag}</p>
                                    <h4 className="font-bold text-slate-900 dark:text-white mb-2 leading-tight text-lg">{offer.title}</h4>
                                    {offer.category === 'Bank Promos' ? (
                                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{offer.description}</p>
                                    ) : offer.description?.includes('code') || offer.description?.includes('OFF') || (offer.description && offer.description.toUpperCase() === offer.description) ? (
                                        <p className="text-sm font-medium text-slate-500 flex items-center gap-2">
                                            <span className="font-bold border border-dashed border-emerald-300 dark:border-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-2 py-0.5 rounded">{offer.description}</span>
                                        </p>
                                    ) : (
                                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{offer.description}</p>
                                    )}
                                </div>
                            </div>
                        )) : (
                            <div className="col-span-full text-center text-slate-500 py-8 font-medium">Loading exclusive offers...</div>
                        )}
                    </div>
                </div>
            </section>

            {/* Dynamic Poster Section */}
            <section id="destinations" className="py-24 w-full bg-slate-950 relative mt-12 rounded-t-[3rem] shadow-[0_-20px_40px_rgba(0,0,0,0.1)]">
                {/* Decorative glowing orb */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-emerald-500/20 blur-[120px] rounded-full pointer-events-none" />

                <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full relative z-10">
                    <div className="mb-16 flex flex-col md:flex-row justify-between items-end gap-6">
                        <div>
                            <span className="text-emerald-400 font-bold tracking-widest uppercase text-sm mb-2 block">Premium Collections</span>
                            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">Featured Destinations</h2>
                            <p className="text-slate-400 text-lg md:text-xl max-w-xl font-medium">Swipe through our most popular tours crafted flawlessly for the passionate traveler. Elegance in every step.</p>
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-8 min-h-[600px] overflow-x-auto hide-scrollbar pb-8 px-4 -mx-4">
                        {tours.length === 0 ? (
                            <div className="w-full flex justify-center items-center text-white/50 h-64 font-medium">Loading premium destinations...</div>
                        ) : (
                            tours.map((tour) => {
                                const isActive = activeSlug === tour.slug;
                                return (
                                    <div
                                        key={tour.slug}
                                        onMouseEnter={() => setActiveSlug(tour.slug)}
                                        onClick={() => setActiveSlug(tour.slug)}
                                        className={`relative rounded-[2.5rem] overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer group flex-shrink-0 border border-white/10
                      ${isActive ? 'lg:flex-[3] w-[85vw] lg:w-auto shadow-[0_20px_50px_rgba(0,0,0,0.5)] scale-[1.02] h-[28rem] lg:h-[600px] z-20 ring-1 ring-emerald-500/50' : 'lg:flex-[1] w-[60vw] lg:w-auto h-40 lg:h-[600px] shadow-lg opacity-70 hover:opacity-100 z-10'}`}
                                    >
                                        {/* Background Image */}
                                        <img
                                            src={tour.hero_image || 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=80'}
                                            alt={tour.title}
                                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                        />

                                        {/* Gradient Overlay - darker for elegance */}
                                        <div className={`absolute inset-0 bg-gradient-to-t from-emerald-900/60 to-transparent transition-opacity duration-500 ${isActive ? 'opacity-90' : 'opacity-60 mix-blend-multiply'}`} />
                                        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80 pointer-events-none" />

                                        {/* Content Container */}
                                        <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-end text-white relative z-10">
                                            <div className={`transform transition-all duration-700 ease-in-out w-full ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0 lg:opacity-100'}`}>
                                                <div className="flex flex-wrap items-center gap-2 mb-4">
                                                    <span className="bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-white flex items-center gap-1 border border-white/20 shadow-sm">
                                                        <MapPin size={14} /> {tour.location}
                                                    </span>
                                                    <span className="bg-yellow-400/20 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold text-yellow-100 flex items-center gap-1 border border-yellow-400/30 shadow-sm">
                                                        <Star size={14} className="text-yellow-400 fill-yellow-400" /> {tour.rating}
                                                    </span>
                                                </div>

                                                <h3 className={`font-black tracking-tight leading-none mb-3 ${isActive ? 'text-5xl md:text-7xl drop-shadow-lg' : 'text-3xl'}`}>
                                                    {tour.title}
                                                </h3>

                                                {/* Extra details only visible when active */}
                                                <div className={`mt-2 space-y-4 overflow-hidden transition-all duration-500 delay-100 flex flex-col justify-end ${isActive ? 'max-h-64 lg:max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
                                                    <p className="text-white/80 text-lg md:text-xl leading-relaxed font-medium line-clamp-3">
                                                        {tour.short_description}
                                                    </p>

                                                    <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/20">
                                                        <div>
                                                            <p className="text-xs text-white/60 uppercase tracking-widest font-bold mb-1">Starting from</p>
                                                            <p className="text-4xl font-black drop-shadow-md">₹{parseFloat(tour.starting_price).toLocaleString('en-IN')}</p>
                                                        </div>
                                                        <button
                                                            onClick={(e) => { e.stopPropagation(); navigate(`/tour/${tour.slug}`); }}
                                                            className="bg-white text-slate-900 rounded-full h-16 w-16 flex items-center justify-center hover:scale-110 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:shadow-[0_0_40px_rgba(255,255,255,0.6)] group/btn relative overflow-hidden flex-shrink-0"
                                                        >
                                                            <div className="absolute inset-0 bg-emerald-100 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-out" />
                                                            <ChevronRight size={28} className="relative z-10 group-hover/btn:text-emerald-700 transition-colors" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>
            </section>

            {/* Travel Styles Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full relative z-10 bg-slate-50/50 dark:bg-slate-950/50">
                <div className="text-center mb-16">
                    <span className="text-emerald-600 font-bold tracking-widest uppercase text-sm mb-2 block">Find Your Vibe</span>
                    <h2 className="text-4xl md:text-5xl font-black text-slate-800 dark:text-white tracking-tight">Travel Styles</h2>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { title: 'Adventure', icon: <MountainSnow size={32} />, color: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-800' },
                        { title: 'Romantic', icon: <Heart size={32} />, color: 'bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 border-rose-100 dark:border-rose-800' },
                        { title: 'Spiritual', icon: <Sunrise size={32} />, color: 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 border-amber-100 dark:border-amber-800' },
                        { title: 'Family', icon: <Users size={32} />, color: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-800' }
                    ].map((style, idx) => (
                        <div key={idx} className={`flex flex-col items-center justify-center p-8 rounded-3xl border ${style.color} hover:shadow-xl hover:-translate-y-2 transition-all cursor-pointer group bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm`}>
                            <div className="mb-4 transform group-hover:scale-110 transition-transform">
                                {style.icon}
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 dark:text-white">{style.title}</h3>
                        </div>
                    ))}
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="py-24 bg-white/70 dark:bg-slate-900/80 backdrop-blur-2xl relative z-10 border-t border-slate-100 dark:border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <span className="text-emerald-600 font-bold tracking-widest uppercase text-sm mb-2 block">Our Promise</span>
                            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-6">Why Travel With Us?</h2>
                            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
                                We believe in creating unforgettable memories with zero hassle. From the moment you book until you return home, we handle every detail so you can focus on the journey.
                            </p>
                            <div className="space-y-6">
                                {[
                                    { title: 'Handpicked Hotels', desc: 'Premium stays selected for comfort, location, and authentic vibes.' },
                                    { title: 'Expert Local Guides', desc: 'Discover hidden gems with passionate locals who know the land.' },
                                    { title: '24/7 Support', desc: 'We are always on standby to ensure your trip runs flawlessly.' }
                                ].map((feature, idx) => (
                                    <div key={idx} className="flex gap-4">
                                        <div className="flex-shrink-0 w-12 h-12 bg-emerald-100 dark:bg-emerald-900/40 rounded-full flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                                            <ShieldCheck size={24} />
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{feature.title}</h4>
                                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">{feature.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 bg-emerald-500/10 blur-[60px] rounded-full pointer-events-none" />
                            <img src="https://images.unsplash.com/photo-1517400508447-f8dd518b86db?auto=format&fit=crop&q=80" alt="Travel Experience" className="rounded-[3rem] shadow-2xl relative z-10 w-full object-cover h-[500px] lg:h-[600px]" />

                            <div className="absolute bottom-8 -left-2 sm:-left-8 bg-white dark:bg-slate-800 p-5 sm:p-6 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] z-20 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left backdrop-blur-md border border-slate-50 dark:border-slate-700">
                                <div className="text-emerald-500 bg-emerald-50 dark:bg-emerald-900/30 p-3 sm:p-4 rounded-full">
                                    <Star size={32} className="fill-emerald-500" />
                                </div>
                                <div>
                                    <p className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white leading-none mb-1">4.9/5</p>
                                    <p className="text-xs sm:text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Average Rating</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Newsletter CTA */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full relative z-10">
                <div className="bg-slate-900 rounded-[3rem] p-8 md:p-16 text-center relative overflow-hidden shadow-2xl">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-20 mix-blend-overlay" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent" />

                    <div className="relative z-10 max-w-2xl mx-auto">
                        <Plane size={48} className="text-emerald-400 mx-auto mb-6 transform -rotate-45" />
                        <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">Never Miss a Trip</h2>
                        <p className="text-slate-300 text-lg sm:text-xl mb-10 font-medium">
                            Get exclusive offers, secret destinations, and travel tips delivered straight to your inbox every week.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                className="flex-1 bg-white/10 border border-white/20 text-white placeholder:text-white/50 px-6 py-4 rounded-full outline-none focus:ring-2 focus:ring-emerald-500/50 backdrop-blur-md font-medium"
                            />
                            <button className="bg-emerald-500 hover:bg-emerald-400 text-slate-900 px-8 py-4 rounded-full font-black tracking-wide transition-colors flex items-center justify-center gap-2">
                                SUBSCRIBE <Send size={18} />
                            </button>
                        </div>
                        <p className="text-slate-500 text-xs sm:text-sm mt-6 font-medium">We respect your privacy. No spam ever.</p>
                    </div>
                </div>
            </section>

        </div>
    );
}
