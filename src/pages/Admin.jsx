import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import { useState } from "react";
import { useShoppingItems } from "../context/ShoppingItemsContext";
import { formatCurrency } from "../utilities/formatCurrency";
import { toast } from "react-toastify";

export default function Admin() {
  const { products, addProduct, updateProduct, deleteProduct } =
    useShoppingItems();
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    imgUrl: "",
  });
  const [editingProduct, setEditingProduct] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addProduct({
        ...newProduct,
        price: parseFloat(newProduct.price),
      });
      setNewProduct({ name: "", price: "", imgUrl: "" });
      toast.success("Product added successfully!", {
        position: "top-right",
        theme: "dark",
      });
    } catch (error) {
      toast.error("Failed to add product. Please try again.", {
        position: "top-right",
        theme: "dark",
      });
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateProduct(editingProduct.id, {
        ...editingProduct,
        price: parseFloat(editingProduct.price),
      });
      setShowEditModal(false);
      toast.success("Product updated successfully!", {
        position: "top-right",
        theme: "dark",
      });
    } catch (error) {
      toast.error("Failed to update product. Please try again.", {
        position: "top-right",
        theme: "dark",
      });
    }
  };

  const handleDelete = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(productId);
        toast.success("Product deleted successfully!", {
          position: "top-right",
          theme: "dark",
        });
      } catch (error) {
        toast.error("Failed to delete product. Please try again.", {
          position: "top-right",
          theme: "dark",
        });
      }
    }
  };

  return (
    <Container>
      <h1 className="text-primary mb-4">Admin Dashboard</h1>

      <div className="admin-form-container p-4 mb-5">
        <h2 className="mb-4">Add New Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Product Name</label>
            <input
              type="text"
              className="form-control"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Price</label>
            <input
              type="number"
              step="0.01"
              className="form-control"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Image URL</label>
            <input
              type="url"
              className="form-control"
              value={newProduct.imgUrl}
              onChange={(e) =>
                setNewProduct({ ...newProduct, imgUrl: e.target.value })
              }
              required
            />
          </div>
          <Button type="submit" className="btn-primary">
            Add Product
          </Button>
        </form>
      </div>

      <h2 className="mb-4">Product List</h2>
      <Row xs={1} md={2} lg={4} className="g-4">
        {products.map((product) => (
          <Col key={product.id}>
            <div className="product-card">
              <div className="product-image-container">
                <img
                  src={product.imgUrl}
                  className="product-image"
                  alt={product.name}
                />
              </div>
              <div className="product-details">
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <div className="product-price">
                    {formatCurrency(product.price)}
                  </div>
                </div>
                <div className="d-flex gap-2 mt-3">
                  <Button
                    className="btn-outline flex-grow-1"
                    onClick={() => {
                      setEditingProduct(product);
                      setShowEditModal(true);
                    }}
                  >
                    Update
                  </Button>
                  <Button
                    className="btn-outline btn-danger flex-grow-1"
                    onClick={() => handleDelete(product.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </Col>
        ))}
      </Row>

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleUpdate}>
            <div className="mb-3">
              <label className="form-label">Product Name</label>
              <input
                type="text"
                className="form-control"
                value={editingProduct?.name || ""}
                onChange={(e) =>
                  setEditingProduct({ ...editingProduct, name: e.target.value })
                }
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Price</label>
              <input
                type="number"
                step="0.01"
                className="form-control"
                value={editingProduct?.price || ""}
                onChange={(e) =>
                  setEditingProduct({ ...editingProduct, price: e.target.value })
                }
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Image URL</label>
              <input
                type="url"
                className="form-control"
                value={editingProduct?.imgUrl || ""}
                onChange={(e) =>
                  setEditingProduct({ ...editingProduct, imgUrl: e.target.value })
                }
                required
              />
            </div>
            <div className="d-flex justify-content-end gap-2">
              <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                Save Changes
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}
