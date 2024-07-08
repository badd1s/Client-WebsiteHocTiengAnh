import { useState, useEffect } from 'react';
import axios from 'axios';
import useLocalStorage from './useLocalStorage';

const BASE_URL = 'http://localhost:3500';

const useAxiosFetchPrivate = (dataUrl) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [fetchError, setFetchError] = useState(null);
    const [token] = useLocalStorage('token', "");

    useEffect(() => {
        const apiUrl = `${BASE_URL}${dataUrl}`;
        // Tránh memomry leak
        const abortController = new AbortController();
        const signal = abortController.signal;
        const fetchDataPrivate = async (url) => {

            try {
                const headers = {};
                if (token) {
                    headers.Authorization = `Bearer ${token}`;
                }

                const response = await axios.get(url, {
                    headers,
                    signal,
                });
                setIsLoading(true);
                setData(response.data);
                setFetchError(null);
            } catch (err) {
                if (err.name !== 'AbortError') {
                    if (err.response && err.response.status === 403) {
                        setFetchError('Bạn không có quyền truy cập vào tài nguyên này.');
                    } else {
                        setFetchError(err.message);
                    }
                    setData([]);
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchDataPrivate(apiUrl);

        // Cleanup function
        return () => {
            abortController.abort();  // Cancel the fetch when component unmounts or when dependencies change
        };
    }, [dataUrl, token]);

    return { data, fetchError, isLoading };
};


export default useAxiosFetchPrivate;
