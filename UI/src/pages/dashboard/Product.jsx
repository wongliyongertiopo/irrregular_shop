import React, { useEffect, useState } from "react";
import { Table, Button, Image, Card, Spin, message } from "antd";
import axios from "axios";
import { URL_PRODUCT } from "../../utils/Endpoint";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(URL_PRODUCT)
      .then((res) => {
        setProducts(res.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Fetch Error:", err.response || err.message);
        message.error("Gagal mengambil data produk.");
        setLoading(false);
      });

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`${URL_PRODUCT}/${id}`)
      .then(() => {
        message.success("Produk berhasil dihapus.");
        setProducts((prev) => prev.filter((p) => p._id !== id));
      })
      .catch((err) => {
        console.log("Delete Error:", err.response || err.message);
        message.error("Gagal menghapus produk.");
      });
  };

  const columns = [
    {
      title: "Thumbnail",
      dataIndex: "thumbnail",
      render: (_, record) =>
        record?.thumbnail ? (
          <Image src={record.thumbnail} width={100} loading="lazy" />
        ) : (
          "No image"
        ),
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <>
          <Button type="primary">
            <Link to={`/dashboard/products/${record?._id}`}>Update</Link>
          </Button>
          <Button
            className="ml-2 mt-2"
            type="primary"
            danger
            onClick={() => handleDelete(record?._id)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <h1>List Products</h1>
      <Link to="/dashboard/products/create">
        <Button className="mt-2 mb-4" type="primary">
          Tambah
        </Button>
      </Link>

      {loading ? (
        <div className="text-center py-10">
          <Spin />
        </div>
      ) : isMobile ? (
        <div className="flex flex-col gap-4">
          {products.map((product) => (
            <Card key={product._id}>
              {product.thumbnail && (
                <Image src={product.thumbnail} width={120} />
              )}
              <p className="mt-2">
                <strong>Name:</strong> {product.name}
              </p>
              <p>
                <strong>Price:</strong> {product.price}
              </p>
              <p>
                <strong>Description:</strong> {product.description}
              </p>
              <div className="flex gap-2 mt-2">
                <Button type="primary">
                  <Link to={`/dashboard/products/${product._id}`}>Update</Link>
                </Button>
                <Button
                  type="primary"
                  danger
                  onClick={() => handleDelete(product._id)}
                >
                  Delete
                </Button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Table
          className="mt-2"
          dataSource={products}
          columns={columns}
          rowKey="_id"
        />
      )}
    </div>
  );
};

export default Products;
