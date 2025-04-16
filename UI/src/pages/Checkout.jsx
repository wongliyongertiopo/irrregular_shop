import React, { useEffect, useState } from "react";
import { Card, Button, Input, Form, Col, Row, message } from "antd";
import { ShoppingCartOutlined, CreditCardOutlined } from "@ant-design/icons";
import axios from "axios";
import { URL_PRODUCT, URL_TRANSACTION } from "../utils/endpoint";
import { useNavigate, useParams, useLocation } from "react-router-dom";

const Checkout = () => {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState(null);
  const [form] = Form.useForm();
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Pastikan quantity adalah number
  const quantity = Number(location.state?.quantity) || 1;

  useEffect(() => {
    axios
      .get(`${URL_PRODUCT}/${id}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        console.log("err", err.response);
      });
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

      // Simpan transaksi dan redirect ke Midtrans
      const res = await axios.post(URL_TRANSACTION, data);
      if (res.data.midtrans_url) {
        // Simpan quantity ke localStorage sebelum redirect
        localStorage.setItem("checkoutQuantity", quantity);

        // Redirect ke Midtrans
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
    <div className="px-4 py-8 mt-24 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center text-green-500">
        Checkout
      </h1>
      <Row gutter={[16, 16]} wrap>
        <Col xs={24} md={16}>
          <Card
            title="Detail Produk"
            extra={<ShoppingCartOutlined />}
            className="shadow-md"
          >
            <p className="mb-2">
              <strong>Nama Produk: </strong>
              <span className="font-poppins">{product?.name}</span>
            </p>
            <p className="mb-2">
              <strong>Harga Produk: </strong>{" "}
              <span className="font-bold">
                Rp {finalPrice.toLocaleString("id-ID")}
              </span>
            </p>
            {product?.discount > 0 && (
              <p className="text-sm font-medium text-gray-500">
                Harga Asli:{" "}
                <span className="line-through font-bold">
                  Rp {product.price.toLocaleString("id-ID")}
                </span>{" "}
                &nbsp; Diskon:{" "}
                <span className="text-red-500 font-bold">
                  {product.discount}%
                </span>
              </p>
            )}
            <hr className="my-5" />
            <p>
              <strong>Jumlah:</strong> {quantity}
            </p>
            <p className="text-xl font-semibold mt-2">
              Total: Rp {(finalPrice * quantity).toLocaleString("id-ID")}
            </p>
          </Card>
        </Col>

        <Col xs={24} md={8}>
          <Card
            title="Informasi Pembayaran"
            extra={<CreditCardOutlined />}
            className="shadow-md"
          >
            <Form layout="vertical" form={form} onFinish={handleCheckout}>
              <Form.Item
                name="first_name"
                label="Nama Anda"
                rules={[
                  {
                    required: true,
                    message: "Nama harus di isi",
                  },
                ]}
              >
                <Input placeholder="Masukkan nama Anda" />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  loading={loading}
                >
                  Lanjut ke Pembayaran
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Checkout;
