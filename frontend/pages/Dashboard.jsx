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
    if (!bookmarkedItems.some(bookmarked => bookmarked.id === item.id)) {
      setBookmarkedItems((prev) => [...prev, item]);
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-content">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search for an item..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        <div className="items-container">
          {filteredItems.map((item) => (
            <div key={item.id} className="item">
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
                  <p className="item-title">{(item.title || item.name).slice(0, 12)}</p>
                </div>
                <div>
                  <p className="item-vote_average">{item.vote_average ? item.vote_average.toFixed(1) : 'N/A'}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
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
                    <p className="item-vote_average">{item.vote_average ? item.vote_average.toFixed(1) : 'N/A'}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
