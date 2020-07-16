import { useEffect, useReducer } from "react";

const cache = {};

const useFetch = (url) => {
  const initialState = {
    status: "idle",
    data: null,
  };

  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "FETCHING":
        return { ...initialState, status: "fetching" };
      case "FETCHED":
        return { ...initialState, status: "fetched", data: action.payload };
      default:
        return state;
    }
  }, initialState);

  useEffect(() => {
    let cancelRequest = false;
    if (!url) return;

    const fetchData = async () => {
      dispatch({ type: "FETCHING" });
      if (cache[url]) {
        const cacheData = cache[url];
        if (cancelRequest) return;
        dispatch({ type: "FETCHED", payload: cacheData });
      } else {
        const response = await fetch(url);
        const res = await response.json();
        cache[url] = res;
        if (cancelRequest) return;
        dispatch({ type: "FETCHED", payload: res });
      }
    };

    fetchData();

    return () => {
      cancelRequest = true;
    };
  }, [url]);

  return state;
};

export default useFetch;
