import {useState, useEffect} from 'react'

export default function useFetchAPIhook(url ='', options = null) {
    const [data, setData] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState('');

    useEffect(() => {
        setLoading(true);
        fetch(url)
        .then(data => data.json())
        .then((data) => {
            setData(data.results || data.genres);
            setError(null);
        })
        .catch((error) => {
            setData(null);
            setError(error);
        })
        .finally(() => {
            setLoading(false);
        })
    }, [url, options])

    return { loading, error, data };
}