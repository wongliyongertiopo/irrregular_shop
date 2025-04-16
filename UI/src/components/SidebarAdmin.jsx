import React from "react";
import { Layout, Menu } from "antd";
import {
  DashboardOutlined,
  HomeOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";

const { Sider } = Layout;

const SidebarAdmin = ({ collapsed, onCollapse }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const selectedKey = () => {
    if (location.pathname.includes("/dashboard")) return "1";
    return "";
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Yakin ingin keluar?");
    if (confirmLogout) {
      localStorage.removeItem("token");
      navigate("/"); // balik ke home
    }
  };

  const handleNavigate = (key) => {
    if (key === "1") navigate("/dashboard");
    if (key === "2") navigate("/product"); // arahkan ke halaman publik product
    if (key === "3") handleLogout();
    if (window.innerWidth < 768) {
      onCollapse(true);
    }
  };

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      trigger={null}
      breakpoint="md"
      collapsedWidth="0"
      onBreakpoint={(broken) => broken && onCollapse(true)}
    >
      <div className="demo-logo-vertical" />
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[selectedKey()]}
        onClick={({ key }) => handleNavigate(key)}
      >
        <Menu.Item key="1" icon={<DashboardOutlined />}>
          Dashboard
        </Menu.Item>
        <Menu.Item key="2" icon={<HomeOutlined />}>
          Product
        </Menu.Item>
        <Menu.Item key="3" icon={<LogoutOutlined />}>
          Logout
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default SidebarAdmin;
