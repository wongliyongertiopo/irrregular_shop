import React from "react";
import "./Footer.css";
import logo from "../assets/logo.png";
import tiktok from "../assets/tiktok.png";
import instagram from "../assets/instagram.png";

const Footer = () => {
  return (
    <div className="footer">
      <div className="logofooter">
        <img src={logo} alt="Logo Web" />
      </div>

      <div className="section">
        <h4>Layanan</h4>
        <p>Menerima Sablon Kaos</p>
        <p>Menerima Pembuatan Banner</p>
      </div>

      <div className="section">
        <h4>About</h4>
        <p>Contact Us</p>
        <p>Payment Method</p>
      </div>

      <div className="section">
        <h4>Follow us</h4>
        <div className="social-icons">
          <img src={tiktok} alt="TikTok" />
          <img src={instagram} alt="Instagram" />
        </div>
        <p className="copyright">
          © 2025 Irregular Fashion Store. All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
