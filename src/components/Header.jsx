import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Map, BookOpen, User, BookCheck, ChevronDown, X, MapPin, Calendar, Menu, Sun, Moon, LogOut } from 'lucide-react';
import AuthContext from '../context/AuthContext';
import api from '../api/axios';

export default function Header({ onLoginClick }) {
    const { user, logout } = useContext(AuthContext);
    const [activePopup, setActivePopup] = useState(null); // 'search', 'destinations', 'bookings', 'blogs', 'profile'
    const [searchQuery, setSearchQuery] = useState('');
    const [tours, setTours] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(document.documentElement.classList.contains('dark'));
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const fetchTours = async () => {
            try {
                const res = await api.get('/tours/');
                setTours(res.data);
            } catch (err) {
                console.error("Failed to load tours", err);
            }
        };
        const fetchBlogs = async () => {
            try {
                const res = await api.get('/blog/blogs/');
                setBlogs(res.data);
            } catch (err) {
                console.error("Failed to load blogs", err);
            }
        };
        fetchTours();
        fetchBlogs();
    }, []);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
        document.documentElement.classList.toggle('dark');
    };

    const handleNavClick = (sectionId) => {
        setIsMobileMenuOpen(false);
        setActivePopup(null);

        if (location.pathname !== '/') {
            navigate('/');
            setTimeout(() => {
                const element = document.getElementById(sectionId);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        } else {
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    const togglePopup = (popupName) => {
        setActivePopup(activePopup === popupName ? null : popupName);
    };

    const handleSearchSubmit = () => {
        if (!searchQuery.trim()) return;
        
        const matchingTour = tours.find(tour =>
            tour.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            tour.short_description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            tour.location.toLowerCase().includes(searchQuery.toLowerCase())
        );

        if (matchingTour) {
            setActivePopup(null);
            setSearchQuery('');
            navigate(`/tour/${matchingTour.slug}`);
        } else {
            alert(`Sorry, no tours currently matching "${searchQuery}" could be found!`);
        }
    };

    const destinations = [
        { name: 'Kashmir', image: 'https://images.unsplash.com/photo-1595815771614-ade9d6527653?w=150', count: '12 Tours' },
        { name: 'Varanasi', image: 'https://images.unsplash.com/photo-1561359313-0639aad48e23?w=150', count: '8 Tours' },
        { name: 'Rajasthan', image: 'https://images.unsplash.com/photo-1599661509650-7f2409749b5c?w=150', count: '24 Tours' },
        { name: 'Ladakh', image: 'https://images.unsplash.com/photo-1498855926480-d98e83099315?w=150', count: '5 Tours' },
    ];

    const dummyBookings = [
        { id: 'BKN-1029', title: 'Mystical Kashmir', date: '24th Mar 2026', status: 'Upcoming', travelers: 2 },
        { id: 'BKN-0883', title: 'Spiritual Varanasi', date: '10th Jan 2026', status: 'Completed', travelers: 4 },
    ];

    return (
        <>
            <nav className="fixed top-0 left-0 w-full bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 z-[60] shadow-sm transition-all h-16 flex items-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                    <div className="flex justify-between items-center w-full">

                        <Link to="/" className="flex items-center gap-2" onClick={() => setActivePopup(null)}>
                            <span className="text-2xl font-black bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent hover:opacity-80 transition-opacity">
                                ToursIn
                            </span>
                        </Link>

                        <div className="hidden md:flex items-center gap-6 font-bold text-slate-600 dark:text-slate-300 relative">

                            {/* Search Toggle */}
                            <button
                                onClick={() => togglePopup('search')}
                                className={`flex items-center gap-1.5 transition-colors px-3 py-2 rounded-xl hover:bg-slate-100 ${activePopup === 'search' ? 'text-emerald-600 bg-emerald-50' : 'hover:text-emerald-600'}`}
                            >
                                <Search size={18} /> Search
                            </button>

                            {/* Tours Link */}
                            <button
                                onClick={() => handleNavClick('tours')}
                                className="flex items-center gap-1.5 transition-colors px-3 py-2 rounded-xl hover:bg-slate-100 hover:text-emerald-600"
                            >
                                Tours
                            </button>

                            {/* Packages Link */}
                            <button
                                onClick={() => handleNavClick('packages')}
                                className="flex items-center gap-1.5 transition-colors px-3 py-2 rounded-xl hover:bg-slate-100 hover:text-emerald-600"
                            >
                                Packages
                            </button>

                            {/* Destinations Link */}
                            <button
                                onClick={() => handleNavClick('destinations')}
                                className="flex items-center gap-1.5 transition-colors px-3 py-2 rounded-xl hover:bg-slate-100 hover:text-emerald-600"
                            >
                                Destinations
                            </button>

                            {/* Blogs */}
                            <button
                                onClick={() => togglePopup('blogs')}
                                className={`flex items-center gap-1.5 transition-colors px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 ${activePopup === 'blogs' ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30' : 'hover:text-emerald-600'}`}
                            >
                                <BookOpen size={18} /> Blogs
                            </button>

                            <div className="h-6 w-px bg-slate-300 dark:bg-slate-700 mx-2"></div>

                            {/* Theme Toggle */}
                            <button
                                onClick={toggleTheme}
                                className="flex items-center justify-center h-9 w-9 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-amber-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                            >
                                {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                            </button>

                            {/* User Dropdown / Login Details */}
                            <button
                                onClick={() => togglePopup('profile')}
                                className={`flex items-center gap-2 transition-colors pl-3 pr-2 py-1.5 rounded-full border ${activePopup === 'profile' ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-900/40' : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 bg-white dark:bg-slate-800 shadow-sm'}`}
                            >
                                <div className="h-7 w-7 bg-emerald-600 rounded-full flex items-center justify-center text-white">
                                    <User size={14} />
                                </div>
                                <ChevronDown size={14} className={`text-slate-400 transition-transform ${activePopup === 'profile' ? 'rotate-180 text-emerald-600' : ''}`} />
                            </button>

                        </div>

                        {/* Mobile Menu Toggle */}
                        <div className="md:hidden flex items-center gap-4">
                            <button
                                onClick={() => togglePopup('profile')}
                                className="flex items-center gap-2 transition-colors pl-2 pr-1 py-1 rounded-full border border-slate-200 bg-white shadow-sm"
                            >
                                <div className="h-6 w-6 bg-emerald-600 rounded-full flex items-center justify-center text-white">
                                    <User size={12} />
                                </div>
                            </button>
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="text-slate-600 hover:text-emerald-600 transition-colors bg-slate-50 p-2 rounded-xl"
                            >
                                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                {isMobileMenuOpen && (
                    <div className="absolute top-16 left-0 w-full bg-white border-b border-slate-200 shadow-xl flex flex-col items-center py-6 gap-6 md:hidden z-[60] animate-in slide-in-from-top-4">
                        <button onClick={() => togglePopup('search')} className="text-lg font-bold text-slate-600 flex items-center gap-2">
                            <Search size={20} /> Search
                        </button>
                        <button onClick={() => handleNavClick('tours')} className="text-lg font-bold text-slate-600">
                            Tours
                        </button>
                        <button onClick={() => handleNavClick('packages')} className="text-lg font-bold text-slate-600">
                            Packages
                        </button>
                        <button onClick={() => handleNavClick('destinations')} className="text-lg font-bold text-slate-600">
                            Destinations
                        </button>
                        <button onClick={() => togglePopup('blogs')} className="text-lg font-bold text-slate-600 flex items-center gap-2">
                            <BookOpen size={20} /> Blogs
                        </button>
                    </div>
                )}
            </nav>

            {/* Popups Overlay Layer */}
            {activePopup && (
                <>
                    <div
                        className="fixed inset-0 z-[50] bg-slate-900/10 backdrop-blur-[2px] mt-16"
                        onClick={() => setActivePopup(null)}
                    />

                    <div className="fixed top-16 left-0 w-full z-[55] flex justify-center pt-2">
                        <div className="max-w-7xl w-full px-4 flex justify-end">
                            <div className="w-full relative">

                                {/* Search Popup */}
                                {activePopup === 'search' && (
                                    <div className="absolute top-0 right-0 lg:right-auto lg:left-1/4 w-[90vw] lg:w-[500px] bg-white rounded-3xl shadow-2xl border border-slate-100 p-8 origin-top transform transition-all animate-in fade-in slide-in-from-top-4">
                                        <h3 className="text-xl font-black text-slate-900 mb-4 flex justify-between items-center">
                                            Find Your Next Adventure
                                            <button onClick={() => setActivePopup(null)} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
                                        </h3>
                                        <div className="relative">
                                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                            <input
                                                type="text"
                                                autoFocus
                                                placeholder="Search for 'Varanasi', 'Monastery', etc... (Press Enter)"
                                                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none text-lg font-medium text-slate-700 placeholder:text-slate-400 shadow-inner"
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit()}
                                            />
                                        </div>
                                        {searchQuery && (
                                            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-3">
                                                <div className="animate-spin h-4 w-4 border-2 border-emerald-500 border-t-transparent rounded-full"></div>
                                                <span className="text-sm font-medium text-slate-500">Searching for "{searchQuery}"...</span>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Destinations Mega Menu */}
                                {activePopup === 'destinations' && (
                                    <div className="absolute top-0 right-10 lg:right-64 w-[90vw] lg:w-[600px] bg-white rounded-3xl shadow-2xl border border-slate-100 p-8 origin-top transform transition-all animate-in fade-in slide-in-from-top-4">
                                        <h3 className="text-xl font-black text-slate-900 mb-6 flex justify-between items-center">
                                            Explore by Region
                                            <button onClick={() => setActivePopup(null)} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
                                        </h3>
                                        <div className="grid grid-cols-2 gap-4">
                                            {destinations.map((dest, i) => (
                                                <div key={i} className="group relative rounded-2xl overflow-hidden aspect-[4/3] cursor-pointer">
                                                    <img src={dest.image} alt={dest.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
                                                    <div className="absolute bottom-4 left-4 text-white">
                                                        <h4 className="font-bold text-lg leading-tight flex items-center gap-1 group-hover:text-emerald-300 transition-colors">
                                                            <MapPin size={16} /> {dest.name}
                                                        </h4>
                                                        <p className="text-sm text-slate-300 font-medium">{dest.count}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Blogs Popup */}
                                {activePopup === 'blogs' && (
                                    <div className="absolute top-0 right-10 lg:right-32 w-[90vw] lg:w-[500px] bg-white rounded-3xl shadow-2xl border border-slate-100 p-8 origin-top transform transition-all animate-in fade-in slide-in-from-top-4">
                                        <h3 className="text-xl font-black text-slate-900 mb-6 flex justify-between items-center">
                                            Traveler Tales & Guides
                                            <button onClick={() => setActivePopup(null)} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
                                        </h3>
                                        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                                            {blogs.length > 0 ? blogs.map((blog, idx) => (
                                                <a key={blog.id || idx} href={blog.link || '#'} target="_blank" rel="noopener noreferrer" className="block p-4 rounded-xl border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/50 transition-colors cursor-pointer group">
                                                    <h4 className="font-bold text-slate-800 text-lg group-hover:text-emerald-700">{blog.title}</h4>
                                                    <p className="text-sm text-slate-500 font-medium mt-1 flex gap-3">
                                                        <span>{blog.date}</span>
                                                        <span className="text-emerald-600 flex items-center gap-1"><BookOpen size={12} /> {blog.read_time}</span>
                                                    </p>
                                                </a>
                                            )) : (
                                                <div className="text-center text-slate-500 font-medium py-4">No blogs found.</div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Profile & Bookings Dropdown */}
                                {activePopup === 'profile' && (
                                    <div className="absolute top-0 right-4 w-[90vw] lg:w-[350px] bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden origin-top-right transform transition-all animate-in fade-in slide-in-from-top-4">

                                        <div className="bg-slate-900 p-6 flex items-center gap-4">
                                            <div className="h-14 w-14 bg-emerald-600 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-inner uppercase">
                                                {user ? user.username.charAt(0) : <User size={24} />}
                                            </div>
                                            <div>
                                                <h3 className="text-white font-bold text-lg leading-tight">{user ? user.first_name || user.username : 'Traveler Portal'}</h3>
                                                <p className="text-emerald-400 text-sm font-medium">{user ? user.email : 'Guest User'}</p>
                                            </div>
                                        </div>

                                        <div className="p-2">
                                            <div className="px-4 py-3 flex justify-between items-center text-sm font-bold text-slate-400 uppercase tracking-widest">
                                                Your Bookings
                                                <button
                                                    onClick={() => setActivePopup('bookings_detail')}
                                                    className="text-emerald-600 hover:underline capitalize font-semibold tracking-normal"
                                                >
                                                    View All
                                                </button>
                                            </div>

                                            <div className="px-2 space-y-2 mb-2">
                                                {dummyBookings.map((bkn, idx) => (
                                                    <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center">
                                                        <div>
                                                            <p className="font-bold text-slate-800 text-sm leading-tight">{bkn.title}</p>
                                                            <p className="text-xs text-slate-500 font-medium flex items-center gap-1 mt-1">
                                                                <Calendar size={12} /> {bkn.date}
                                                            </p>
                                                        </div>
                                                        <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${bkn.status === 'Upcoming' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
                                                            {bkn.status}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="border-t border-slate-100 mt-2 p-2">
                                                {user ? (
                                                    <button
                                                        onClick={() => { setActivePopup(null); logout(); }}
                                                        className="w-full py-3 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-xl font-bold transition-colors flex items-center justify-center gap-2"
                                                    >
                                                        <LogOut size={18} /> Log Out
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => { setActivePopup(null); onLoginClick(); }}
                                                        className="w-full py-3 bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 rounded-xl font-bold transition-colors flex items-center justify-center gap-2"
                                                    >
                                                        Log In or Register
                                                    </button>
                                                )}
                                            </div>

                                        </div>
                                    </div>
                                )}

                                {/* Bookings Detail Full Modal-like Popup */}
                                {activePopup === 'bookings_detail' && (
                                    <div className="absolute top-0 right-4 w-[90vw] lg:w-[450px] bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 origin-top-right transform transition-all animate-in fade-in slide-in-from-top-4">
                                        <h3 className="text-2xl font-black text-slate-900 mb-6 flex justify-between items-center">
                                            <span className="flex items-center gap-2"><BookCheck className="text-emerald-600" /> All Bookings</span>
                                            <button onClick={() => setActivePopup(null)} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
                                        </h3>

                                        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                                            {dummyBookings.map((bkn, idx) => (
                                                <div key={idx} className="p-5 bg-white shadow-sm hover:shadow-md transition-shadow rounded-2xl border border-slate-200">
                                                    <div className="flex justify-between items-start mb-3">
                                                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{bkn.id}</span>
                                                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${bkn.status === 'Upcoming' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'}`}>
                                                            {bkn.status}
                                                        </span>
                                                    </div>
                                                    <h4 className="font-bold text-slate-900 text-lg mb-2">{bkn.title}</h4>
                                                    <div className="flex flex-wrap gap-4 text-sm font-medium text-slate-500">
                                                        <span className="flex items-center gap-1"><Calendar size={14} className="text-slate-400" /> {bkn.date}</span>
                                                        <span className="flex items-center gap-1"><User size={14} className="text-slate-400" /> {bkn.travelers} Travelers</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
