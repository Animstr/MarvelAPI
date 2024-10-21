import { useState, useCallback, useEffect } from "react";

export const useHttp = () => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const request = useCallback(async (url, method = 'GET', body = null, headers = {'Content-Type':'aplication/json'}) => {
        setLoading(true);

        try{
            const response = await fetch(url, {method, body, headers});

            if(!response.ok){
                throw new Error(`Couldn't fetch ${url}, status: ${response.status}`);
            }

            const data = await response.json();

            setLoading(false);

            return data;
        }catch(e){
            setError(e.message);
            setLoading(false);
            throw e;
        }
    }, [])
    const skipError = () => {
        setError(false);
    }
    return {loading, error, request, skipError, setError};
}