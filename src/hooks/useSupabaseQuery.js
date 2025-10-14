import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export default function useSupabaseQuery(table, selectQuery = '*', options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      let query = supabase.from(table).select(selectQuery);

      if (options.orderBy) {
        query = query.order(options.orderBy.column, {
          ascending: options.orderBy.ascending ?? false
        });
      }

      const { data: result, error: queryError } = await query;

      if (queryError) throw queryError;

      setData(result);
      setError(null);
    } catch (err) {
      setError(err);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [table, selectQuery]);

  return [data, loading, error, fetchData];
}
