import { useEffect, useMemo, useState } from "react";
import useDebounce from "./useDebounce";
import { fetchBooks } from "../lib/api";

export default function useBooks({ query, page = 0, pageSize = 20 }) {
  const debounced = useDebounce(query, 400);
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const startIndex = useMemo(() => page * pageSize, [page, pageSize]);

  useEffect(() => {
    if (!debounced?.trim()) {
      setData([]);
      setTotal(0);
      setLoading(false);
      setError(null);
      return;
    }
    const ac = new AbortController();
    setLoading(true);
    setError(null);

    fetchBooks({
      query: debounced,
      startIndex,
      maxResults: pageSize,
      signal: ac.signal,
    })
      .then((json) => {
        setData(json.items || []);
        setTotal(json.totalItems || 0);
      })
      .catch((e) => {
        if (e.name !== "AbortError") setError(e);
      })
      .finally(() => setLoading(false));

    return () => ac.abort();
  }, [debounced, startIndex, pageSize]);

  return { data, total, loading, error };
}
