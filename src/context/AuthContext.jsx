import { createContext, useState, useEffect } from 'react';
import api from '../api/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkUserStatus();
    }, []);

    const checkUserStatus = async () => {
        try {
            const token = localStorage.getItem('access');
            if (token) {
                const res = await api.get('/auth/profile/');
                setUser(res.data);
            }
        } catch (error) {
            console.error('Failed to fetch user context', error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const login = (data) => {
        localStorage.setItem('access', data.access);
        localStorage.setItem('refresh', data.refresh);
        if (data.user) {
            setUser(data.user);
        } else {
            checkUserStatus();
        }
    };

    const logout = () => {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, checkUserStatus }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
