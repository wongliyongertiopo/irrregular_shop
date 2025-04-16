import React, { useEffect, useState } from "react";
import { Button, Input, Form, message } from "antd";
import { ShoppingCartOutlined, CreditCardOutlined } from "@ant-design/icons";
import axios from "axios";
import { URL_PRODUCT, URL_TRANSACTION } from "../utils/Endpoint";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import "./Checkout.css"; // CSS dipisah

const Checkout = () => {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState(null);
  const [form] = Form.useForm();
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const quantity = Number(location.state?.quantity) || 1;

  useEffect(() => {
    axios
      .get(`${URL_PRODUCT}/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log("err", err.response));
  }, [id]);

  const handleCheckout = async (values) => {
    if (!product) return;

    if (quantity > product.stock) {
      message.error("Jumlah melebihi stok yang tersedia");
      return;
    }

    const finalPrice =
      product.price - (product.price * (product.discount || 0)) / 100;

    const data = {
      first_name: values.first_name,
      amount: finalPrice * quantity,
      product_id: product._id,
    };

    try {
      setLoading(true);
      const res = await axios.post(URL_TRANSACTION, data);
      if (res.data.midtrans_url) {
        localStorage.setItem("checkoutQuantity", quantity);
        window.location.href = res.data.midtrans_url;
      }
    } catch (err) {
      message.error("Gagal melakukan checkout");
      console.error("Checkout error", err?.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  const finalPrice = product
    ? product.price - (product.price * (product.discount || 0)) / 100
    : 0;

  return (
    <div className="checkout-container">
      <h1 className="checkout-title">CHECK OUT</h1>

      <div className="checkout-card-container">
        {/* LEFT: Detail Produk */}
        <div className="checkout-card">
          <div className="checkout-header">
            <h2>DETAIL PRODUCT</h2>
            <ShoppingCartOutlined />
          </div>
          <hr />
          <div className="checkout-detail">
            <p>
              <strong>NAMA PRODUK:</strong> {product?.name}
            </p>
            <p>
              <strong>HARGA:</strong> Rp {finalPrice.toLocaleString("id-ID")}
            </p>
            <p>
              <strong>JUMLAH:</strong> {quantity}
            </p>
            <p>
              <strong>TOTAL:</strong> Rp{" "}
              {(finalPrice * quantity).toLocaleString("id-ID")}
            </p>
          </div>
        </div>

        {/* RIGHT: Form Pembayaran */}
        <div className="checkout-card">
          <div className="checkout-header">
            <h2>INFORMASI PEMBAYARAN</h2>
            <CreditCardOutlined />
          </div>
          <Form layout="vertical" form={form} onFinish={handleCheckout}>
            <Form.Item
              name="first_name"
              label="NAMA"
              rules={[{ required: true, message: "Nama harus di isi" }]}
            >
              <Input
                placeholder="Masukkan nama Anda"
                className="input-rounded"
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                loading={loading}
                className="btn-submit"
              >
                LANJUT KE PEMBAYARAN
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
