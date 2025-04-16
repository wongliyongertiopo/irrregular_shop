import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout, Button } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";

// Komponen umum
import Sidebar from "./components/MobileSidebar";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

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

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleSidebar = () => setCollapsed(!collapsed);

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
        <Navbar />

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

            {/* Dashboard Admin */}
            <Route
              path="/dashboard/*"
              element={
                <Layout style={{ minHeight: "100vh" }}>
                  <Sidebar collapsed={collapsed} onCollapse={setCollapsed} />
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
                        icon={
                          collapsed ? (
                            <MenuUnfoldOutlined />
                          ) : (
                            <MenuFoldOutlined />
                          )
                        }
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
                      <Routes>
                        <Route path="" element={<Dashboard />} />
                        <Route path="products" element={<Product />} />
                        <Route
                          path="products/create"
                          element={<AddProduct />}
                        />
                        <Route
                          path="products/:id"
                          element={<UpdateProduct />}
                        />
                      </Routes>
                    </Content>
                  </Layout>
                </Layout>
              }
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
