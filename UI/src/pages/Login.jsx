import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom"; // ✅ tambahkan ini
import "./Login.css";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // ✅ inisialisasi navigator

  const onFinish = (values) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);

      // ✅ arahkan ke dashboard
      navigate("/dashboard");

      // opsional: bisa juga simpan ke localStorage, dll.
    }, 1500);
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-avatar">
          <UserOutlined />
        </div>

        <h2 className="login-title">Member Login</h2>

        <Form name="login" onFinish={onFinish} layout="vertical">
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Email"
              size="large"
              className="login-input"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
              size="large"
              className="login-input"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              size="large"
              className="login-button"
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
