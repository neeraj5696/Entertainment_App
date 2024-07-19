import React from "react";
import Sidebar from "../component/Sidebar";
import Dashboard from "./Dashboard";

const Home = () => {
  return (
    <div >
      <div >
        <Sidebar />
      </div>
      <div>
        <Dashboard />
      </div>
    </div>
  );
};

export default Home;


