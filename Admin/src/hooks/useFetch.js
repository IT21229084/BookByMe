import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (url) => {
    const [data, setData] = useState([])
    const [loading, setloading] = useState(false)
    const [error, seterror] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            setloading(true);
            try {
                const res = await axios.get(url);
                setData(res.data);

            } catch (error) {
                seterror(error);
            }
            setloading(false);
        }
        fetchData();
    }, [url]);


    const reFetch = async () => {
        setloading(true);
        try {
            const res = await axios.get(url);
            setData(res.data);

        } catch (error) {
            seterror(error);
        }
        setloading(false);


    }
    return {data,loading,error,reFetch};
};

export default useFetch