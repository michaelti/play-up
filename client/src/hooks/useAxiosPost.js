import axios from "axios";
import { useState } from "react";

export default function useAxiosPost(url, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const postData = async (reqBody) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}${url}`,
        reqBody
      );
      setData(response.data);
    } catch (error) {
      setError(error);
    }

    setLoading(false);
  };

  return [data, loading, error, postData];
}
