import React, { useState, useEffect } from "react";
import { Card, Col, Row, Button, Typography, message, Divider } from "antd";
import {
  ShoppingCartOutlined,
  MailOutlined,
  PhoneOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { URL_PRODUCT } from "../utils/endpoint";
import { Link } from "react-router-dom";

const { Title, Paragraph } = Typography;
const { Meta } = Card;

const Home = () => {
  const [products, setProducts] = useState([]);

  // Fetch data produk saat halaman dimuat
  useEffect(() => {
    axios
      .get(URL_PRODUCT)
      .then((res) => {
        console.log("res", res.data);
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
        message.error("Failed to fetch products");
      });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <Title level={2}>Product List</Title>
      <Row gutter={[16, 16]}>
        {products.map((product) => (
          <Col span={8} key={product._id}>
            <Card
              hoverable
              cover={<img alt={product.name} src={product.thumbnail} />}
            >
              <Meta
                title={product.name}
                description={
                  <div>
                    <p>Rp {product.price}</p>
                    <p style={{ marginTop: "4px" }}>{product.description}</p>
                  </div>
                }
              />
              <Link to={`/checkout/${product._id}`}>
                <Button
                  type="primary"
                  icon={<ShoppingCartOutlined />}
                  style={{ marginTop: "10px", width: "100%" }}
                >
                  Checkout Now
                </Button>
              </Link>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Contact Section */}
      <Divider style={{ marginTop: "40px" }} />
      <Title level={3}>Contact Us</Title>
      <Paragraph>
        <p>
          <MailOutlined /> Email:{" "}
          <a href="mailto:info@example.com">info@example.com</a>
        </p>
        <p>
          <PhoneOutlined /> Phone: +62 812-3456-7890
        </p>
        <p>
          <HomeOutlined /> Address: Jl. Contoh No. 123, Jakarta, Indonesia
        </p>
      </Paragraph>
    </div>
  );
};

export default Home;
