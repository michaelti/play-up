import { useEffect, useState } from "react";
import axios from "axios";

export default function useAxios(url, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}${url}`
      );
      setData(response.data);
    } catch (error) {
      setError(error);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, deps);

  return [data, loading, error, fetchData];
}
