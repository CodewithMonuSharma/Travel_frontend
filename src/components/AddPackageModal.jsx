import React from 'react';
import { X, Image as ImageIcon, MapPin, DollarSign, Clock, FileText } from 'lucide-react';

export default function AddPackageModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden transform transition-all border border-slate-100 flex flex-col max-h-[90vh]">
                <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-slate-50">
                    <h2 className="text-2xl font-black tracking-tight text-slate-900">Create New Package</h2>
                    <button
                        onClick={onClose}
                        className="p-2 text-slate-400 hover:text-slate-600 bg-white hover:bg-slate-200 rounded-full transition-colors shadow-sm"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="p-8 overflow-y-auto">
                    <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onClose(); alert("New Package added successfully!"); }}>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Package Title</label>
                            <input
                                type="text"
                                required
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-400 font-medium text-slate-900"
                                placeholder="e.g. Magnificent Leh-Ladakh Expedition"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Destination / Region</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                                        <MapPin size={18} />
                                    </div>
                                    <input
                                        type="text"
                                        required
                                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-400 font-medium text-slate-900"
                                        placeholder="e.g. Jammu & Kashmir"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Duration</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                                        <Clock size={18} />
                                    </div>
                                    <input
                                        type="text"
                                        required
                                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-400 font-medium text-slate-900"
                                        placeholder="e.g. 5 Days / 4 Nights"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Price per Person (₹)</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                                        <DollarSign size={18} />
                                    </div>
                                    <input
                                        type="number"
                                        required
                                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-400 font-medium text-slate-900"
                                        placeholder="24999"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Cover Image URL</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                                        <ImageIcon size={18} />
                                    </div>
                                    <input
                                        type="url"
                                        required
                                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-400 font-medium text-slate-900"
                                        placeholder="https://example.com/image.jpg"
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Description</label>
                            <div className="relative">
                                <div className="absolute top-4 left-0 pl-4 pointer-events-none text-slate-400">
                                    <FileText size={18} />
                                </div>
                                <textarea
                                    required
                                    rows={4}
                                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-400 font-medium text-slate-900 resize-none"
                                    placeholder="Describe the highlights and itinerary..."
                                />
                            </div>
                        </div>

                        <div className="pt-4 flex items-center justify-end gap-4 border-t border-slate-100">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-6 py-3 bg-white text-slate-600 hover:bg-slate-50 border border-slate-200 rounded-xl font-bold transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow-lg shadow-emerald-600/20 transition-all hover:shadow-xl hover:shadow-emerald-600/30 transform hover:-translate-y-0.5"
                            >
                                Publish Package
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
