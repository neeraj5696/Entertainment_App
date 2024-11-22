import React, { useState, useEffect } from "react";
import { FaRegBookmark } from "react-icons/fa";
import "../pages/Dashboard.css";
import { API_KEY } from "../utility/constant";
import Sidebar from "../component/Sidebar";

const Dashboard = () => {
  const [itemList, setItemList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [bookmarkedItems, setBookmarkedItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`);
        const data = await response.json();
        setItemList(data.results);
        setFilteredItems(data.results);
      } catch (error) {
        console.error("Error fetching item list:", error);
      }
    };

    fetchItems();
  }, []);

  const handleSearch = () => {
    const filtered = itemList.filter((item) =>
      (item.title || item.name).toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  const handleBookmark = (item) => {
    if (!bookmarkedItems.some((bookmarked) => bookmarked.id === item.id)) {
      setBookmarkedItems((prev) => [...prev, item]);
    }
  };

  // Function to initialize AdSense ads
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense error:", e);
    }
  });

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-content">
        {/* Search Section */}
        <div className="search-container">
          <input
            className="search"
            type="text"
            placeholder="Search for an item..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="search" onClick={handleSearch}>
            Search
          </button>
        </div>

        {/* AdSense Below Search */}
        <div className="adsense-container">
          <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-1263168028087570"
            data-ad-slot="1234567890"
            data-ad-format="auto"
          ></ins>
        </div>

        {/* Items Section */}
        <div className="items-container">
          {filteredItems.map((item, index) => (
            <React.Fragment key={item.id}>
              <div className="item">
                <img
                  src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                  alt={item.title || item.name}
                  className="item-poster"
                />
                <button
                  className="bookmark-button"
                  onClick={() => handleBookmark(item)}
                >
                  <FaRegBookmark />
                </button>
                <div className="flex">
                  <div>
                  <p className="item-title">
  {(item.title || item.name).slice(0, 21)} <br />
  {(item.title || item.name).length > 21 ? (item.title || item.name).slice(21) : ""}
</p>

                  </div>
                  <div>
                    <p className="item-vote_average">
                      {item.vote_average ? item.vote_average.toFixed(1) : "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              {/* AdSense Between Items */}
              {index > 0 && index % 5 === 0 && (
                <div className="adsense-container">
                  <ins
                    className="adsbygoogle"
                    style={{ display: "block" }}
                    data-ad-client="ca-pub-1263168028087570"
                    data-ad-slot="1234567890"
                    data-ad-format="auto"
                  ></ins>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Bookmarked Section */}
        <div className="bookmarked-section">
          <h2>Bookmarked Items</h2>
          <div className="items-container">
            {bookmarkedItems.map((item) => (
              <div key={item.id} className="item">
                <img
                  src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                  alt={item.title || item.name}
                  className="item-poster"
                />
                <div className="flex">
                  <div>
                    <p className="item-title">{item.title || item.name}</p>
                  </div>
                  <div>
                    <p className="item-vote_average">
                      {item.vote_average ? item.vote_average.toFixed(1) : "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AdSense Below Bookmarked Section */}
        <div className="adsense-container">
          <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-1263168028087570"
            data-ad-slot="1234567890"
            data-ad-format="auto"
          ></ins>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
