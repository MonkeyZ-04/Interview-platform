import { useState, useEffect } from 'react';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import apiService from '../services/apiService';

const useAuth = () => {
    const { setAuthData } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const login = async (credentials) => {
        try {
            const response = await apiService.login(credentials);
            setAuthData(response.data);
        } catch (err) {
            setError(err.response ? err.response.data : 'Login failed');
        }
    };

    const logout = () => {
        setAuthData(null);
    };

    const checkAuth = async () => {
        try {
            const response = await apiService.checkAuth();
            setAuthData(response.data);
        } catch (err) {
            setAuthData(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    return { login, logout, loading, error };
};

export default useAuth;