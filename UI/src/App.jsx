import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import { Layout, Button } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MobileSidebar from "./components/MobileSidebar";
import SidebarAdmin from "./components/SidebarAdmin";

// Halaman publik
import Home from "./components/Home";
import ProductPage from "./components/Product";
import About from "./components/About";
import Contact from "./components/Contact";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";

// Halaman dashboard admin
import Dashboard from "./pages/dashboard/Dashbord";
import Product from "./pages/dashboard/Product";
import AddProduct from "./pages/dashboard/ProductCreate";
import UpdateProduct from "./pages/dashboard/ProductUpdate";

const { Header, Content } = Layout;

const DashboardLayout = ({ collapsed, toggleSidebar, setCollapsed }) => (
  <Layout style={{ minHeight: "100vh" }}>
    <SidebarAdmin collapsed={collapsed} onCollapse={setCollapsed} />
    <Layout>
      <Header
        style={{
          padding: 0,
          background: "#fff",
          boxShadow: "0 2px 8px #f0f1f2",
        }}
      >
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={toggleSidebar}
          style={{ fontSize: "16px", marginLeft: "16px" }}
        />
      </Header>
      <Content
        style={{
          margin: 0,
          padding: 0,
          background: "transparent",
          minHeight: "100vh",
        }}
      >
        <Outlet />
      </Content>
    </Layout>
  </Layout>
);

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const toggleSidebar = () => setCollapsed(!collapsed);
  const toggleMobileSidebar = () => setMobileSidebarOpen(!mobileSidebarOpen);

  return (
    <Router>
      <div
        className="App"
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Navbar + Mobile Sidebar */}
        <Navbar onMenuClick={toggleMobileSidebar} />
        <MobileSidebar
          isOpen={mobileSidebarOpen}
          onClick={toggleMobileSidebar}
        />

        <main style={{ flex: 1 }}>
          <Routes>
            {/* Halaman Publik */}
            <Route path="/" element={<Home />} />
            <Route path="/product" element={<ProductPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/checkout/:id" element={<Checkout />} />
            <Route path="/signin" element={<Login />} />
            <Route path="/admin" element={<Login />} />

            {/* Dashboard Layout */}
            <Route
              path="/dashboard"
              element={
                <DashboardLayout
                  collapsed={collapsed}
                  setCollapsed={setCollapsed}
                  toggleSidebar={toggleSidebar}
                />
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="products" element={<Product />} />
              <Route path="products/create" element={<AddProduct />} />
              <Route path="products/:id" element={<UpdateProduct />} />
            </Route>
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
