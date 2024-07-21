import React from "react";
import { TbMovie } from "react-icons/tb";
import { GoBookmark, GoVideo } from "react-icons/go";
import { RxDashboard } from "react-icons/rx";
import { FaUser } from "react-icons/fa"; // Import user icon
import { NavLink, useNavigate } from "react-router-dom";
import "../component/Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate()
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
    <div>
      <div className="conta" >
        <div className="fox1" >
        <div className="top_section" onClick={() => navigate("/")}>
          Home
        </div>
        <div className="">
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
       
        <div className="fox2" >
        <div className="bottom_section" onClick={() => navigate("/signup")}>
          <FaUser className="user_icon" />
          <div className="link_text">Signup</div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
