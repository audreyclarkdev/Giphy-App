import { useEffect } from "react";
import "../App.css";

const Trending = ({
  API_KEY,
  limit,
  gifs,
  setGifs,
  mode,
  offset,
  setLoading,
  setError,
  setMoreResults,
}) => {
  // re-fetch whenever offset changes (Load More) or mode switches back to "trending"
  useEffect(() => {
    // stops trending from re-fetching search results while in search mode
    if (mode !== "trending") return;

    setLoading(true);
    setError("");
    const trendingEndpoint = `https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=${limit}&offset=${offset}`;

    fetch(trendingEndpoint)
      .then((res) => {
        if (!res.ok) throw new Error("Request failed");
        return res.json();
      })
      .then((data) => {
        const results = data.data || [];
        // offset 0 is a fresh load (replace); any higher offset is Load More (append)
        setGifs((prev) => (offset === 0 ? results : [...prev, ...results]));
        setMoreResults(results.length === limit);
      })
      .catch((err) => {
        console.error(err);
        setError("Error fetching GIFs. Please try again.");
      })
      .finally(() => setLoading(false));
    // useEffect is dependent on mode and offset, so it will re-run whenever either of those change
  }, [mode, offset]);

  const trendingGifs = gifs.map((gif) => (
    <div key={gif.id} className="card">
      <img
        src={gif.images.fixed_height.url}
        alt={gif.title}
        title={gif.title}
      />
    </div>
  ));

  return (
    <div className="container title">
      {/* header swaps based on mode, since this same grid renders both trending and search results */}
      {mode === "trending" && <h1>🔥Trending GIFs🔥</h1>}
      {mode === "search" && (
        <h1 className="search-results">Search Results 🔎</h1>
      )}
      <div className="cards-grid">{trendingGifs}</div>
    </div>
  );
};

export default Trending;
