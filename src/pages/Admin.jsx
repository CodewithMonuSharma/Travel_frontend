import React from 'react';
import { Settings, Shield, User, Map, AlertCircle, BarChart3, TrendingUp, Users } from 'lucide-react';

export default function Admin() {
    const users = [
        { name: 'Ravi Kumar', role: 'Vendor', status: 'Verified', joined: '12 Jan 2026' },
        { name: 'Priya Singh', role: 'Vendor', status: 'Pending', joined: '14 Jan 2026' },
        { name: 'Amit Desai', role: 'User', status: 'Active', joined: '15 Jan 2026' },
    ];

    return (
        <div className="flex bg-[#f1f5f9] min-h-[calc(100vh-4rem)]">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 text-slate-300 flex-shrink-0 hidden md:flex flex-col border-r border-slate-800">
                <div className="p-6">
                    <h2 className="text-xl font-bold text-white tracking-widest uppercase flex items-center gap-2">
                        <Shield size={20} className="text-emerald-500" /> Admin
                    </h2>
                </div>
                <nav className="flex-1 mt-4 space-y-2 px-4">
                    <a href="#" className="flex items-center gap-3 bg-emerald-600/10 text-emerald-400 font-semibold px-4 py-3 rounded-xl transition-colors">
                        <BarChart3 size={20} /> Dashboard
                    </a>
                    <a href="#" className="flex items-center gap-3 hover:bg-slate-800 hover:text-white font-medium px-4 py-3 rounded-xl transition-colors">
                        <Users size={20} /> User Management
                    </a>
                    <a href="#" className="flex items-center gap-3 hover:bg-slate-800 hover:text-white font-medium px-4 py-3 rounded-xl transition-colors">
                        <Map size={20} /> Platform Tours
                    </a>
                    <a href="#" className="flex items-center gap-3 hover:bg-slate-800 hover:text-white font-medium px-4 py-3 rounded-xl transition-colors">
                        <AlertCircle size={20} /> Reports
                    </a>
                    <a href="#" className="flex items-center gap-3 hover:bg-slate-800 hover:text-white font-medium px-4 py-3 rounded-xl transition-colors">
                        <Settings size={20} /> Settings
                    </a>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 md:p-10 hide-scrollbar overflow-y-auto w-full">
                <div className="max-w-6xl mx-auto space-y-8">
                    <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-[2rem] shadow-sm mb-10">
                        <div>
                            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Platform Overview</h1>
                            <p className="text-slate-500 font-medium">Monitoring the health and metrics of North India Tours.</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-xl font-bold shadow-sm">
                                <TrendingUp size={18} /> +24% traffic
                            </span>
                        </div>
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                        <div className="bg-gradient-to-br from-indigo-500 to-blue-700 p-8 rounded-[2rem] text-white shadow-xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:scale-125 transition-transform duration-500">
                                <Users size={80} />
                            </div>
                            <h3 className="text-indigo-100 font-semibold mb-2 text-xl relative z-10">Total Users</h3>
                            <p className="text-5xl font-black tracking-tighter relative z-10">14.2K</p>
                        </div>
                        <div className="bg-gradient-to-br from-emerald-500 to-teal-700 p-8 rounded-[2rem] text-white shadow-xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:scale-125 transition-transform duration-500">
                                <Map size={80} />
                            </div>
                            <h3 className="text-emerald-100 font-semibold mb-2 text-xl relative z-10">Active Tours</h3>
                            <p className="text-5xl font-black tracking-tighter relative z-10">432</p>
                        </div>
                        <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-8 rounded-[2rem] text-white shadow-xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:scale-125 transition-transform duration-500">
                                <Settings size={80} />
                            </div>
                            <h3 className="text-amber-100 font-semibold mb-2 text-xl relative z-10">Pending Approvals</h3>
                            <p className="text-5xl font-black tracking-tighter relative z-10">8</p>
                        </div>
                    </div>

                    {/* User Management Table */}
                    <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                            Recent Registrations
                        </h2>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr>
                                        <th className="p-4 text-sm font-bold text-slate-400 uppercase tracking-widest bg-slate-50 rounded-tl-xl border-b border-slate-100">User</th>
                                        <th className="p-4 text-sm font-bold text-slate-400 uppercase tracking-widest bg-slate-50 border-b border-slate-100">Role</th>
                                        <th className="p-4 text-sm font-bold text-slate-400 uppercase tracking-widest bg-slate-50 border-b border-slate-100">Joined</th>
                                        <th className="p-4 text-sm font-bold text-slate-400 uppercase tracking-widest bg-slate-50 border-b border-slate-100">Status</th>
                                        <th className="p-4 text-sm font-bold text-slate-400 uppercase tracking-widest bg-slate-50 rounded-tr-xl border-b border-slate-100">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {users.map((user, idx) => (
                                        <tr key={idx} className="hover:bg-slate-50 transition-colors">
                                            <td className="p-4 font-bold text-slate-800 flex items-center gap-3">
                                                <div className="h-10 w-10 bg-slate-200 rounded-full flex justify-center items-center text-slate-600 font-bold">
                                                    {user.name.charAt(0)}
                                                </div>
                                                {user.name}
                                            </td>
                                            <td className="p-4 font-semibold text-slate-600">
                                                {user.role}
                                            </td>
                                            <td className="p-4 font-medium text-slate-500">
                                                {user.joined}
                                            </td>
                                            <td className="p-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${user.status === 'Verified' ? 'bg-emerald-100 text-emerald-700' :
                                                        user.status === 'Active' ? 'bg-blue-100 text-blue-700' :
                                                            'bg-amber-100 text-amber-700'
                                                    }`}>
                                                    {user.status}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                <button className="text-slate-600 hover:text-emerald-600 font-semibold border-b-2 border-transparent hover:border-emerald-600 transition-colors">
                                                    Manage
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
