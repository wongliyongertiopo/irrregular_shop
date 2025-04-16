import React, { useState } from "react";
import { Form, Input, Button, Upload, message, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { URL_PRODUCT } from "../../utils/Endpoint";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const AddProduct = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);

  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    setLoading(true);

    try {
      const data = new FormData();
      data.append("name", values.name);
      data.append("price", values.price);
      data.append("size", values.size);
      data.append("description", values.description);

      if (!values.thumbnail || !values.thumbnail[0]?.originFileObj) {
        message.error("Thumbnail tidak valid");
        setLoading(false);
        return;
      }

      data.append("thumbnail", values.thumbnail[0].originFileObj);

      await axios.post(URL_PRODUCT, data);

      message.success("Product added successfully");
      form.resetFields();
      setFileList([]);
      navigate("/dashboard/products");
    } catch (error) {
      console.error("Failed to add product:", error);
      message.error("Gagal menambahkan produk");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  return (
    <div>
      <h1>Add Product</h1>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          category: "electronics",
        }}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Please input product name" }]}
        >
          <Input placeholder="Enter product name" />
        </Form.Item>

        <Form.Item
          name="price"
          label="Price"
          rules={[{ required: true, message: "Please input product price" }]}
        >
          <Input type="number" placeholder="Enter product price" />
        </Form.Item>

        <Form.Item
          name="size"
          label="Size"
          rules={[{ required: true, message: "Please input product size" }]}
        >
          <Input placeholder="Enter product size" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[
            { required: true, message: "Please enter product description" },
            { max: 300, message: "Description must be under 300 characters" },
          ]}
        >
          <Input.TextArea
            placeholder="Enter a detailed product description (max 300 characters)"
            rows={4}
            showCount
            maxLength={300}
          />
        </Form.Item>

        <Form.Item
          name="thumbnail"
          label="Thumbnail"
          valuePropName="fileList"
          getValueFromEvent={({ fileList }) => fileList}
          rules={[{ required: true, message: "Please upload a thumbnail" }]}
        >
          <Upload
            action="/uploads/products"
            listType="picture"
            fileList={fileList}
            onChange={handleChange}
            beforeUpload={() => false}
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Add Product
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddProduct;
