import React, { useEffect, useState } from "react";
import { Form, Input, Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { URL_PRODUCT } from "../../utils/Endpoint";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const params = useParams();
  const { id } = params;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`${URL_PRODUCT}/${id}`)
      .then((res) => {
        setProduct(res.data);
        form.setFieldsValue({
          name: res.data.name,
          price: res.data.price,
          size: res.data.size,
          description: res.data.description,
        });

        if (res.data.thumbnail) {
          setFileList([
            {
              uid: "-1",
              name: "thumbnail.png",
              status: "done",
              url: res.data.thumbnail,
            },
          ]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    setLoading(true);

    if (
      fileList.length === 0 ||
      (!fileList[0].originFileObj && !fileList[0].url)
    ) {
      message.error("Please upload a thumbnail!");
      setLoading(false);
      return;
    }

    const data = new FormData();
    data.append("name", values.name);
    data.append("price", values.price);
    data.append("size", values.size);
    data.append("description", values.description);

    if (fileList.length > 0 && fileList[0].originFileObj) {
      data.append("thumbnail", fileList[0].originFileObj);
    }

    try {
      await axios.patch(`${URL_PRODUCT}/${id}`, data);
      message.success("Product updated successfully");
      form.resetFields();
      setFileList([]);
      navigate("/dashboard/products");
    } catch (error) {
      message.error("Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  return (
    <div>
      <h1>Edit Product</h1>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Please input product name!" }]}
        >
          <Input placeholder="Enter product name" />
        </Form.Item>

        <Form.Item
          name="price"
          label="Price"
          rules={[{ required: true, message: "Please input product price!" }]}
        >
          <Input placeholder="Enter product price" />
        </Form.Item>

        <Form.Item
          name="size"
          label="Size"
          rules={[{ required: true, message: "Please input product size!" }]}
        >
          <Input placeholder="Enter product size (e.g., S, M, L, XL)" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[
            { required: true, message: "Please enter product description" },
          ]}
        >
          <Input.TextArea placeholder="Enter product description" rows={4} />
        </Form.Item>

        <Form.Item label="Thumbnail">
          <Upload
            beforeUpload={() => false}
            listType="picture"
            fileList={fileList}
            onChange={handleChange}
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Edit Product
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UpdateProduct;
