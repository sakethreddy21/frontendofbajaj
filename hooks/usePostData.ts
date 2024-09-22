import { useState } from 'react';
import axios from 'axios';

const usePostData = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const postData = async (payload: Record<string, unknown>) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('http://localhost:3000/bfhl', payload);
     return response.data
    } catch (err: any) {
      setError(err.response?.data?.message || err.message);
      return err.response?.data?.message || err.message
      console.error('Error posting data:', err); // Log full error for debugging
    } finally {
      setLoading(false);
    }
  };

  return {  postData };
};

export default usePostData;