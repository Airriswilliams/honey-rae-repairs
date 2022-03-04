import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

// this component makes the buttons will provide a visual path that will trigger
// the rendering of components in Application Views
// what do we want each button to say and where we want to direct it

export const NavBar = (props) => {
  return (
    <ul className="navbar">
      <li className="navbar__item active">
        <Link className="navbar__link" to="/employees">
          Employees
        </Link>
      </li>

      <li className="navbar__item">
        <Link className="navbar__link" to="/customers">
          Customers
        </Link>
      </li>

      <li className="navbar__item">
        <Link className="navbar__link" to="/tickets">
          Service Tickets
        </Link>

        <li className="navbar__item">
          <Link
            className="navbar__link"
            to="/#"
            onClick={() => {
              localStorage.removeItem("honey_customer");
            }}
          >
            Logout
          </Link>
        </li>
      </li>
    </ul>
  );
};
