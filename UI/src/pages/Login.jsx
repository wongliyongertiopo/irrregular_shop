import React, { useState } from "react";
import { Button, Form, Input, Alert } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { URL_SIGNIN } from "../utils/Endpoint";
import "./Login.css";

const Login = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  const onFinish = (values) => {
    setLoading(true);
    setErrMsg("");

    axios
      .post(URL_SIGNIN, values)
      .then((res) => {
        if (res.data.role !== "Admin") {
          setErrMsg("Anda tidak memiliki akses ke dalam dashboard admin");
        } else {
          localStorage.setItem("token", res.data.token);
          window.open("/dashboard", "_blank"); // ✅ buka tab baru
        }
      })
      .catch((err) => {
        const msg = err?.response?.data?.message || "Login gagal";
        setErrMsg(msg);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-avatar">
          <UserOutlined />
        </div>

        <h2 className="login-title">Admin Login</h2>

        {errMsg && (
          <Alert
            message={errMsg}
            type="error"
            showIcon
            style={{ marginBottom: 20 }}
          />
        )}

        <Form form={form} name="login" onFinish={onFinish} layout="vertical">
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Email"
              size="large"
              className="login-input"
              autoComplete="off"
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
              autoComplete="off"
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
