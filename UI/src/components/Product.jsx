import React, { useState, useEffect } from "react";
import { Card, Col, Row, Button, message } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import axios from "axios";
import { URL_PRODUCT } from "../utils/endpoint";
import { Link } from "react-router-dom";
import "../components/Product.css";

const { Meta } = Card;

const ProductPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(URL_PRODUCT)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
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
                      src={product.thumbnail}
                      className="product-image"
                    />
                  </div>
                  <Meta
                    title={product.name}
                    description={
                      <div className="product-info">
                        <p className="product-price">Rp {product.price}</p>
                        <p className="product-size">Size: {product.size}</p>
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
