import { useState } from "react";
import "./App.css";
import Trending from "./components/Trending.jsx";
import Search from "./components/Search.jsx";

function App() {
  // state variables for gifs, search term, pagination offset,trending/search mode

  const [gifs, setGifs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  // to switch between "search" or "trending" for what is fetched from the API. Default is "trending" to show trending gifs on load.
  const [mode, setMode] = useState("trending");
  // shared pagination + request state, used by both trending and search fetches
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [moreResults, setMoreResults] = useState(true);

  const API_KEY = import.meta.env.VITE_GIPHY_KEY;
  const limit = 25; // gifs per page, shared by trending and search pagination

  // advancing offset is all "Load More" needs to do — Search's and Trending's
  // own effects react to the offset change and fetch/append the next page
  const handleLoadMore = () => {
    setOffset((prev) => prev + limit);
  };

  // Reset Event Handler: resets to trending mode and clears the search term and query
  const handleReset = () => {
    setMode("trending");
    setOffset(0);
    setSearchTerm("");
    setMoreResults(true);
  };

  return (
    <>
      <div className="App">
        <header onClick={handleReset} className="App-header">
          <h1>Giphy Searcher</h1>
        </header>

        {/* display search bar */}
        <Search
          API_KEY={API_KEY}
          limit={limit}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          mode={mode}
          setMode={setMode}
          offset={offset}
          setOffset={setOffset}
          setGifs={setGifs}
          setLoading={setLoading}
          setError={setError}
          handleReset={handleReset}
          setMoreResults={setMoreResults}
        />
        {/* display trending gifs */}
        <Trending
          API_KEY={API_KEY}
          limit={limit}
          gifs={gifs}
          setGifs={setGifs}
          mode={mode}
          offset={offset}
          setOffset={setOffset}
          setLoading={setLoading}
          setError={setError}
          setMoreResults={setMoreResults}
        />
        {error && <p className="error-message">{error}</p>}
        <footer>
          <div>
            {moreResults ? (
              <button
                className="load-more"
                onClick={handleLoadMore}
                // disables the Load More button while loading to prevent multiple requests
                disabled={loading}>
                {loading ? "Loading..." : "Load More"}
              </button>
            ) : (
              <p>No more GIFs to load!</p>
            )}
          </div>
        </footer>
      </div>
    </>
  );
}

export default App;
