import React from "react";
import { TbMovie } from "react-icons/tb";
import { GoBookmark, GoVideo } from "react-icons/go";
import { RxDashboard } from "react-icons/rx";
import { NavLink } from "react-router-dom";
import { MdOutlineMovieCreation } from "react-icons/md";
import '../component/Sidebar.css'

const Sidebar = ({ children }) => {
  const menuItem = [
    {

      path: "/trending",
      name: "Trending",
      icon: <RxDashboard />
    },
    {
      path: "/movies",
      name: "movies",
      icon: <TbMovie />
    },
    {
      path: "/tvseries",
      name: "tvseries",
      icon: <GoVideo />
    },
    {
      path: "/bookmark",
      name: "bookmark",
      icon: <GoBookmark />
    },
  ];

  return (
    <div className="container">
      <div className="sidebar">
        <div className="top_section">
          
          <div className="icon">
          <MdOutlineMovieCreation />
          </div>
        </div>
        {
          menuItem.map((item, index) => (
            <NavLink to={item.path} key={index} className='link' activeClassName="active">
              <div className="icon"  > {item.icon}</div>
            </NavLink>
          ))
        }
      </div>
      <main>
        {children}
      </main>
    </div>
  );
};

export default Sidebar;
