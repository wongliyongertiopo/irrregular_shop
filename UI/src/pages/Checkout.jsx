import React, { useEffect, useState } from "react";
import { Card, Button, Input, Form, Col, Row, message } from "antd";
import { ShoppingCartOutlined, CreditCardOutlined } from "@ant-design/icons";
import axios from "axios";
import { URL_PRODUCT, URL_TRANSACTION } from "../utils/Endpoint";
import { useNavigate, useParams, useLocation } from "react-router-dom";

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
    <div className="min-h-screen bg-black text-white flex flex-col justify-center px-4 pt-20">
      <h1 className="text-4xl md:text-5xl font-bold tracking-widest text-center mb-10">
        CHECK OUT
      </h1>

      <div className="bg-[#dcdcdc] rounded-[30px] p-6 max-w-6xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Card - Detail Produk */}
        <div className="bg-[#dcdcdc] rounded-[30px] p-6 shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-black">DETAIL PRODUCT</h2>
            <ShoppingCartOutlined className="text-black text-xl" />
          </div>
          <hr className="border-gray-300 mb-4" />
          <div className="space-y-4 text-black">
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

        {/* Right Card - Form */}
        <div className="bg-[#dcdcdc] rounded-[30px] p-6 shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-black">
              INFORMASI PEMBAYARAN
            </h2>
            <CreditCardOutlined className="text-black text-xl" />
          </div>
          <Form layout="vertical" form={form} onFinish={handleCheckout}>
            <Form.Item
              name="first_name"
              label={<span className="text-black">NAMA</span>}
              rules={[{ required: true, message: "Nama harus di isi" }]}
            >
              <Input
                placeholder="Masukkan nama Anda"
                className="rounded-full"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                loading={loading}
                className="rounded-full bg-black hover:bg-gray-800 text-white"
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
