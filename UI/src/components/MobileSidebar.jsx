import React, { useState, useEffect } from "react";
import { Layout, Menu } from "antd";
import {
  DashboardOutlined,
  SettingOutlined,
  FundOutlined,
  LogoutOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./MobileSidebar.css"; // Pastikan file ini sudah ada

const { Sider } = Layout;

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [mobileOpen, setMobileOpen] = useState(false);

  const selectedKey = () => {
    if (location.pathname.includes("/dashboard/products")) return "2";
    if (location.pathname.includes("/dashboard/banners")) return "3";
    if (location.pathname.includes("/dashboard")) return "1";
    return "";
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Apakah Anda yakin ingin keluar?");
    if (confirmLogout) {
      localStorage.removeItem("token");
      navigate("/signin");
    }
  };

  const handleResize = () => {
    const isNowMobile = window.innerWidth < 768;
    setIsMobile(isNowMobile);
    if (!isNowMobile) {
      setMobileOpen(false); // Tutup menu mobile saat pindah ke desktop
    }
  };

  const handleNavigate = (path) => {
    navigate(path);
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {isMobile ? (
        <>
          <div className="mobile-header">
            <MenuOutlined onClick={() => setMobileOpen(!mobileOpen)} />
          </div>
          <div className={`sidebar ${mobileOpen ? "open" : ""}`}>
            <ul className="sidebar-menu">
              <li>
                <Link to="/" onClick={() => handleNavigate("/")}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/product" onClick={() => handleNavigate("/product")}>
                  Product
                </Link>
              </li>
              <li>
                <Link to="/about" onClick={() => handleNavigate("/about")}>
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" onClick={() => handleNavigate("/contact")}>
                  Contact
                </Link>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
            <div className="overlay" onClick={() => setMobileOpen(false)}></div>
          </div>
        </>
      ) : (
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          trigger={null}
          breakpoint="md"
          collapsedWidth="0"
        >
          <div className="demo-logo-vertical" />
          <Menu theme="dark" mode="inline" selectedKeys={[selectedKey()]}>
            <Menu.Item
              key="1"
              icon={<DashboardOutlined />}
              onClick={() => handleNavigate("/dashboard")}
            >
              Dashboard
            </Menu.Item>
            <Menu.Item
              key="2"
              icon={<SettingOutlined />}
              onClick={() => handleNavigate("/dashboard/products")}
            >
              Products
            </Menu.Item>
            <Menu.Item
              key="3"
              icon={<FundOutlined />}
              onClick={() => handleNavigate("/dashboard/banners")}
            >
              Banners
            </Menu.Item>
            <Menu.Item key="4" icon={<LogoutOutlined />} onClick={handleLogout}>
              Logout
            </Menu.Item>
          </Menu>
        </Sider>
      )}
    </>
  );
};

export default Sidebar;
