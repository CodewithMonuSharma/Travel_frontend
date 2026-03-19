import React, { useState } from 'react';
import { Package, Users, DollarSign, Activity, PlusCircle, Calendar } from 'lucide-react';
import AddPackageModal from '../components/AddPackageModal';

export default function Vendor() {
    const [isAddPackageModalOpen, setIsAddPackageModalOpen] = useState(false);

    const stats = [
        { name: 'Active Bookings', value: '124', icon: Users, change: '+12%', color: 'text-emerald-500' },
        { name: 'Total Revenue', value: '₹4.2L', icon: DollarSign, change: '+8%', color: 'text-indigo-500' },
        { name: 'Total Packages', value: '18', icon: Package, change: '+2', color: 'text-amber-500' },
        { name: 'Profile Views', value: '2.4K', icon: Activity, change: '+24%', color: 'text-blue-500' },
    ];

    const packages = [
        { title: 'Golden Triangle Explorer', status: 'Active', bookings: 45, rating: 4.8 },
        { title: 'Himalayan Retreat', status: 'Active', bookings: 32, rating: 4.9 },
        { title: 'Desert Safari Special', status: 'Draft', bookings: 0, rating: 0 },
    ];

    return (
        <div className="flex-1 bg-[#f8fafc] p-4 sm:p-8">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Header Block */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                    <div>
                        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Vendor Dashboard</h1>
                        <p className="text-slate-500 font-medium">Manage your tour packages and monitor bookings.</p>
                    </div>
                    <button
                        onClick={() => setIsAddPackageModalOpen(true)}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 shadow-[0_4px_15px_rgb(16,185,129,0.3)] transition-transform hover:-translate-y-1"
                    >
                        <PlusCircle size={20} />
                        Add New Package
                    </button>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat) => (
                        <div key={stat.name} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-lg transition-shadow">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`p-4 rounded-2xl bg-slate-50 ${stat.color}`}>
                                    <stat.icon size={26} />
                                </div>
                                <span className="text-sm font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                                    {stat.change}
                                </span>
                            </div>
                            <p className="text-slate-500 font-medium mb-1">{stat.name}</p>
                            <h3 className="text-3xl font-black text-slate-800 tracking-tight">{stat.value}</h3>
                        </div>
                    ))}
                </div>

                {/* Recent Packages Table */}
                <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                            <Package className="text-emerald-500" /> My Packages
                        </h2>
                        <button className="text-emerald-600 font-semibold text-sm hover:underline">View All</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50">
                                    <th className="p-4 text-sm font-semibold text-slate-500 uppercase tracking-wider border-y border-slate-100">Package Name</th>
                                    <th className="p-4 text-sm font-semibold text-slate-500 uppercase tracking-wider border-y border-slate-100">Status</th>
                                    <th className="p-4 text-sm font-semibold text-slate-500 uppercase tracking-wider border-y border-slate-100">Bookings</th>
                                    <th className="p-4 text-sm font-semibold text-slate-500 uppercase tracking-wider border-y border-slate-100">Rating</th>
                                    <th className="p-4 text-sm font-semibold text-slate-500 uppercase tracking-wider border-y border-slate-100">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {packages.map((pkg, i) => (
                                    <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="p-4 font-bold text-slate-800">{pkg.title}</td>
                                        <td className="p-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${pkg.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-600'}`}>
                                                {pkg.status}
                                            </span>
                                        </td>
                                        <td className="p-4 font-semibold text-slate-600">{pkg.bookings}</td>
                                        <td className="p-4 font-semibold text-slate-600">{pkg.rating || '-'} ★</td>
                                        <td className="p-4">
                                            <button className="text-blue-600 hover:text-blue-800 font-semibold px-3 py-1 border border-blue-200 hover:bg-blue-50 rounded-lg">
                                                Edit
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>

            <AddPackageModal
                isOpen={isAddPackageModalOpen}
                onClose={() => setIsAddPackageModalOpen(false)}
            />
        </div>
    );
}
