import React from "react";
import { TbMovie } from "react-icons/tb";
import { GoBookmark, GoVideo } from "react-icons/go";
import { NavLink } from "react-router-dom";

const Sidebar = ({children}) => {
  const menuItem = () => [
    {
      path: "/movies",
      name: "movies",
      icon: <TbMovie />
    },
    {
      path: "/tvserie",
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
          <h1 className="logo">Logo</h1>
          <div className="bars">
            <GoVideo />
          </div>
        </div>
        {
            menuItem.map((item, index) => (
                <NavLink to={item.path} key={index} className='link' activclassName="active">
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
