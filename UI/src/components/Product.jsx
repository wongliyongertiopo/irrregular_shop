import React, { useState, useEffect } from "react";
import { Card, Col, Row, Button, message } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import axios from "axios";
import { URL_PRODUCT } from "../utils/Endpoint";
import { Link } from "react-router-dom";
import "../components/Product.css";

const { Meta } = Card;

const ProductPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    console.log("🔄 Fetching products from:", URL_PRODUCT);

    axios
      .get(URL_PRODUCT)
      .then((res) => {
        console.log("✅ Produk diterima:", res.data);
        if (Array.isArray(res.data)) {
          setProducts(res.data);
        } else {
          console.warn("⚠️ Data produk bukan array:", res.data);
          message.error("Format data produk tidak valid.");
        }
      })
      .catch((err) => {
        console.error("❌ Gagal fetch produk:", err.message);
        message.error("Gagal mengambil data produk");
      });
  }, []);

  return (
    <section className="full-width-section fade-in">
      <div className="container">
        {products.length === 0 ? (
          <p style={{ textAlign: "center", marginTop: "20px" }}>
            Belum ada produk yang tersedia.
          </p>
        ) : (
          <Row gutter={[16, 16]}>
            {products.map((product, index) => (
              <Col xs={24} sm={12} md={8} key={product._id}>
                <Card
                  className="product-card card-hover fade-in"
                  hoverable
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="product-image-wrapper">
                    <img
                      alt={product.name}
                      src={
                        product.thumbnail ||
                        "https://via.placeholder.com/300x400?text=No+Image"
                      }
                      className="product-image"
                    />
                  </div>
                  <Meta
                    title={product.name}
                    description={
                      <div className="product-info">
                        <p className="product-price">Rp {product.price}</p>
                        <p className="product-size">
                          Size: {product.size || "All Size"}
                        </p>
                        <p className="product-description">
                          {product.description}
                        </p>
                      </div>
                    }
                  />
                  <Link to={`/checkout/${product._id}`}>
                    <Button
                      type="primary"
                      icon={<ShoppingCartOutlined />}
                      className="buy-button"
                    >
                      Beli
                    </Button>
                  </Link>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </section>
  );
};

export default ProductPage;
