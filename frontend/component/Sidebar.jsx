import React from "react";
import { TbMovie } from "react-icons/tb";
import { GoBookmark, GoVideo } from "react-icons/go";
import { RxDashboard } from "react-icons/rx";
import { NavLink } from "react-router-dom";
import "../component/Sidebar.css";

const Sidebar = ({ children }) => {
  const menuItem = [
    {
      path: "/dashboard",
      name: "Dashboard",
      icon: <RxDashboard />,
    },
    
    {
      path: "/movies",
      name: "Movies",
      icon: <TbMovie />,
    },
    {
      path: "/tvseries",
      name: "TV Series",
      icon: <GoVideo />,
    },
    {
      path: "/bookmark",
      name: "Bookmark",
      icon: <GoBookmark />,
    },
  ];

  return (
    <div className="container">
      <div className="sidebar">
        <div className="top_section">Home</div>
        <div className="item">
          {menuItem.map((item, index) => (
            <NavLink
              to={item.path}
              key={index}
              className="link"
              activeClassName="active"
            >
              <div className="icon">{item.icon}</div>
              <div className="link_text">{item.name}</div>
            </NavLink>
          ))}
        </div>
      </div>
     
    </div>
  );
};

export default Sidebar;
