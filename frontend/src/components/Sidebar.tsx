import React from "react";
import { Link } from "react-router-dom";

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar-sticky pt-3 ">
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link className="nav-link" to="/">
            Home
          </Link>
        </li>
        <li>
          <Link className="nav-link active" to="/products">
            Products
          </Link>
        </li>
        <li>
          <Link className="nav-link" to="/orders">
            Orders
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
