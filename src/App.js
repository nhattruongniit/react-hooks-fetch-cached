import React, { useState } from "react";

import useFetch from "./hooks/useFetch";

function App() {
  const [query, setQuery] = useState("");
  const url = query && `https://hn.algolia.com/api/v1/search?query=${query}`;
  const { status, data } = useFetch(url);

  return (
    <div className="App">
      <h1>Custom React Hooks to fetch & cache when fetch data</h1>
      <div>
        Query:
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      {status === "fetching" && <span>loading...</span>}
      <ul>
        {data && data.hits.map((item, idx) => <li key={idx}>{item.title}</li>)}
      </ul>
    </div>
  );
}

export default App;
