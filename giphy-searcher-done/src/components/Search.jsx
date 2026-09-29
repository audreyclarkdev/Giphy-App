import { useState, useEffect } from "react";

// only needs some of the state variables and setters from the parent App component, so the state gets lifted up to the parent.

const Search = ({
  API_KEY,
  limit,
  searchTerm,
  setSearchTerm,
  mode,
  setMode,
  offset,
  setOffset,
  setGifs,
  setLoading,
  setError,
  handleReset,
  setMoreResults,
}) => {
  // the term actually being searched (separate from the live input searchTerm. We need this to use for Load More)
  // specifically, the input is signaling a change every time there's a character input, but we only want to fetch when the user submits the search (presses enter or clicks the button). So we need a separate state variable to hold the submitted search term.
  const [query, setQuery] = useState("");

  // build the search-endpoint URL for the given search term and offset
  // encodeURIComponent is used to ensure that the search term is properly formatted for a URL. Mainly used if a search term contains spaces or special characters
  const buildingUrl = (query, offset) => {
    const baseUrl = "https://api.giphy.com/v1/gifs/search";
    return `${baseUrl}?api_key=${API_KEY}&q=${encodeURIComponent(
      query,
    )}&limit=${limit}&offset=${offset}`;
  };

  // fetch search results whenever the submitted query or offset changes, but only while in search mode
  useEffect(() => {
    if (mode !== "search" || !query) return;

    setLoading(true);
    setError("");
    fetch(buildingUrl(query, offset))
      .then((res) => {
        if (!res.ok) throw new Error("Request failed");
        return res.json();
      })
      .then((data) => {
        // GIF objects array is in data.data, so we need to check if it's null or undefined and set gifs to an empty array in that case
        const results = data.data || [];
        // offset 0 is a fresh search (replace); any higher offset is Load More (append)
        setGifs((prev) => (offset === 0 ? results : [...prev, ...results]));
        setMoreResults(results.length === limit); // if the number of results returned is less than the limit, there are no more results to load
        if (offset === 0 && results.length === 0) {
          setError("No GIFs found. Try a different search!");
        }
      })
      .catch((err) => {
        console.error(err);
        setError("Error fetching GIFs. Please try again.");
      })
      .finally(() => setLoading(false));
  }, [mode, offset, query]);

  // Search Event Handler: commits the term and resets pagination; useEffect above does the actual fetching
  const handleSearch = () => {
    if (!searchTerm.trim()) return; // ignore empty search
    setMode("search");
    // reset offset to 0 for a new search
    setOffset(0);
    setQuery(searchTerm);
    setMoreResults(true);
  };

  // need a results container that holds the container and gif cards from styling, with an h1 for Search Results, and a button to load more.
  return (
    <div className="container">
      {/* search bar. Both enter key or button trigger the search*/}
      <div className="search-bar">
        <input
          type="text"
          value={searchTerm}
          placeholder="Search GIFs..."
          onChange={(event) => setSearchTerm(event.target.value)}
          onKeyDown={(event) => event.key === "Enter" && handleSearch()}
        />
        <button onClick={handleSearch}>Search</button>
        {/* show this reset button only when in search mode */}
        {mode === "search" && (
          <button onClick={handleReset}>Back to Trending</button>
        )}
      </div>
    </div>
  );
};

export default Search;
