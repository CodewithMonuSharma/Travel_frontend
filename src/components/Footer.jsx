import React from 'react';
import { Compass, Mail, Phone, MapPin, Instagram, Twitter, Facebook, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="bg-slate-900 border-t border-slate-800 text-slate-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

                    {/* Brand Col */}
                    <div className="space-y-6">
                        <span className="text-2xl font-black bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent flex items-center gap-2">
                            <Compass className="text-emerald-400" size={28} /> ToursIn
                        </span>
                        <p className="text-slate-400 text-base leading-relaxed max-w-xs font-medium">
                            Crafting unforgettable journeys across the mystical landscapes, rich heritage, and vibrant cultures of Northern India.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="h-10 w-10 bg-slate-800 rounded-full flex items-center justify-center text-slate-400 hover:bg-emerald-600 hover:text-white transition-all transform hover:-translate-y-1">
                                <Instagram size={18} />
                            </a>
                            <a href="#" className="h-10 w-10 bg-slate-800 rounded-full flex items-center justify-center text-slate-400 hover:bg-emerald-600 hover:text-white transition-all transform hover:-translate-y-1">
                                <Twitter size={18} />
                            </a>
                            <a href="#" className="h-10 w-10 bg-slate-800 rounded-full flex items-center justify-center text-slate-400 hover:bg-emerald-600 hover:text-white transition-all transform hover:-translate-y-1">
                                <Facebook size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-6 tracking-wide">Explore</h3>
                        <ul className="space-y-4">
                            <li><a href="/" className="text-slate-400 font-medium hover:text-emerald-400 transition-colors flex items-center gap-2"><ArrowRight size={14} /> Kashmir Packages</a></li>
                            <li><a href="/" className="text-slate-400 font-medium hover:text-emerald-400 transition-colors flex items-center gap-2"><ArrowRight size={14} /> Varanasi Spiritual</a></li>
                            <li><a href="/" className="text-slate-400 font-medium hover:text-emerald-400 transition-colors flex items-center gap-2"><ArrowRight size={14} /> Royal Rajasthan</a></li>
                            <li><a href="/" className="text-slate-400 font-medium hover:text-emerald-400 transition-colors flex items-center gap-2"><ArrowRight size={14} /> Himalayan Treks</a></li>
                        </ul>
                    </div>

                    {/* Platform Links */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-6 tracking-wide">Platform Access</h3>
                        <ul className="space-y-4">
                            <li><Link to="/" className="text-slate-400 font-medium hover:text-emerald-400 transition-colors">User Experience</Link></li>
                            <li><Link to="/vendor" className="text-slate-400 font-medium hover:text-amber-400 transition-colors">Vendor Dashboard</Link></li>
                            <li><Link to="/admin" className="text-slate-400 font-medium hover:text-blue-400 transition-colors">Admin Portal</Link></li>
                            <li><a href="https://travel-backend-xzgq.onrender.com/admin/" target="_blank" rel="noopener noreferrer" className="text-slate-400 font-medium hover:text-purple-400 transition-colors">Backend Dashboard</a></li>
                            <li><a href="#" className="text-slate-400 font-medium hover:text-emerald-400 transition-colors">Privacy Policy</a></li>
                        </ul>
                    </div>

                    {/* Contact Col */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-6 tracking-wide">Contact Us</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-slate-400 font-medium">
                                <MapPin size={20} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                                <span>Level 4, Himalaya Tech Park,<br />Sector 15, Chandigarh, 160015</span>
                            </li>
                            <li className="flex items-center gap-3 text-slate-400 font-medium">
                                <Phone size={20} className="text-emerald-500 flex-shrink-0" />
                                <span >+91 98765 43210</span>
                            </li>
                            <li className="flex items-center gap-3 text-slate-400 font-medium">
                                <Mail size={20} className="text-emerald-500 flex-shrink-0" />
                                <span>hello@toursin.com</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-slate-800/60 py-6 text-center text-slate-500 text-sm font-medium">
                <p>© {new Date().getFullYear()} ToursIn Platform. Crafted with precision.</p>
            </div>
        </footer>
    );
}
