import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/logo.png";
import adminIcon from "../assets/png-transparent-computer-icons-privacy-policy-admin-icon-copyright-rim-share-icon-thumbnail-removebg-preview.png";
import MobileSidebar from "./Sidebar";
import { AlignJustify } from "lucide-react";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="navbar-wrapper">
        <nav className="navbar">
          <div className="navbar-logo">
            <img src={logo} alt="Logo Web" className="logo-web" />
          </div>

          <ul className="navbar-menu">
            <li className="navbar-item">
              <Link to="/" className="navbar-link">
                HOME
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/product" className="navbar-link">
                PRODUCT
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/contact" className="navbar-link">
                CONTACT
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/about" className="navbar-link">
                ABOUT
              </Link>
            </li>
          </ul>

          <div className="admin-icon">
            <Link to="/admin">
              <img src={adminIcon} alt="Admin" />
            </Link>
          </div>

          <div className="hamburger-menu" onClick={toggleSidebar}>
            <AlignJustify />
          </div>
        </nav>
      </div>
      <MobileSidebar isOpen={isOpen} onClick={toggleSidebar} />
    </>
  );
};

export default Navbar;
