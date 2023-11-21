import React, { useState, useEffect } from 'react';
import { Button, Card, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

function ModifyList() {
  const [formData, setFormData] = useState({
    productname: '',
    price: '',
    weight: '',
    quantity: '',
    description: '',
    category: '',
    subcategory: '',
    size: '',
    releasedate: '',
    imagelink: '',
    productspec: '',
  });

  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const fetchDataFromServer = async () => {
    try {
      const response = await axios.get('http://localhost:5175/product/data');
      if (response.status === 200) {
        setProducts(response.data);
      } else {
        console.error('Failed to fetch data from the server');
      }
    } catch (error) {
      console.error('An error occurred while fetching data:', error);
    }
  };

  useEffect(() => {
    fetchDataFromServer();
  }, []);

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setShowEditModal(true);
    setFormData(product);
  };

  const handleDelete = (product) => {
    setSelectedProduct(product);
    setShowDeleteModal(true);
  };

  const handleEditSave = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5175/product/${selectedProduct._id}`,
        formData
      );
  
      if (response.status === 200) {
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product._id === selectedProduct._id ? formData : product
          )
        );
        setShowEditModal(false);
      } else {
        console.error('Failed to update product');
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
    console.log("save clicked");
  };
  

  const handleDeleteConfirm = async () => {
    try {
      console.log("Deleting product:", selectedProduct);
  
      const response = await axios.delete(
        `http://localhost:5175/product/${selectedProduct._id}`
      );
  
      console.log("Delete response:", response);
  
      if (response.status === 204) {
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== selectedProduct._id)
        );
        setShowDeleteModal(false);
        setSelectedProduct(null); // Set selectedProduct to null after successful deletion
      } else {
        console.error('Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };
  

  const handleCloseModal = () => {
    setShowEditModal(false);
    setShowDeleteModal(false);
    setSelectedProduct(null);
    setFormData({
      productname: '',
      price: '',
      weight: '',
      quantity: '',
      description: '',
      category: '',
      subcategory: '',
      size: '',
      releasedate: '',
      imagelink: '',
      productspec: '',
    });
  };

 
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
  

  return (
    <div className="modifylist-container">
      <div className="row">
        {products.map((product) => (
          <div className="col-md-3" key={product._id} style={{ marginBottom: '10px' }}>
            <Card className="h-100">
              <div className="text-center">
                <Card.Img
                  variant="top"
                  src={product.imagelink}
                  style={{ width: '100px', height: '130px', padding: '5px' }}
                />
              </div>
              <Card.Body>
                <Card.Title>{product.productname}</Card.Title>
                <Card.Text
                  style={{ display: 'flex', justifyContent: 'flex-end', fontWeight: '700' }}
                >
                  {product.price}
                </Card.Text>
              </Card.Body>
              <Card.Footer
                className="bg-white"
                style={{ display: 'flex', justifyContent: 'space-evenly' }}
              >
                <Button variant="info" onClick={() => handleEdit(product)}>
                  Edit
                </Button>
                <Button variant="danger" onClick={() => handleDelete(product)}>
                  Delete
                </Button>
              </Card.Footer>
            </Card>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formTitle">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                name="productname"
                value={selectedProduct ? selectedProduct.productname : ''}
                onChange={handleEditInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formTitle">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={formData.price}
                onChange={handleEditInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formTitle">
              <Form.Label>Weight</Form.Label>
              <Form.Control
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleEditInputChange}
                placeholder='in grams'
              />
            </Form.Group>
            <Form.Group controlId="formTitle">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleEditInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formGridState">
                    <Form.Label>Category</Form.Label>
                    <Form.Select
                      name="category"
                      value={formData.category}
                      onChange={handleEditInputChange}
                    >
                      <option value="-">-Select Here- </option>
                      <option value="Gold">Gold</option>
                      <option value="Diamond">Diamond</option>
                      <option value="Silver">Silver</option>
                      <option value="Platinum">Platinum</option>
                    </Form.Select>
          </Form.Group>
          <Form.Group controlId="formGridState">
                    <Form.Label>Sub Category</Form.Label>
                    <Form.Select
                      name="subcategory"
                      value={formData.subcategory}
                      onChange={handleEditInputChange}
                    >
                      <option value="-">-Select Here- </option>
                      <option value="EarRings">Ear-Rings</option>
                      <option value="BraceletsBangles">Bracelets & Bangles</option>
                      <option value="Necklace">Necklace</option>
                      <option value="Chain">Chain</option>
                    </Form.Select>
                  </Form.Group>
          <Form.Group controlId="formGridState">
                    <Form.Label>Size</Form.Label>
                    <Form.Select
                      name="size"
                      value={formData.size}
                      onChange={handleEditInputChange}
                    >
                      <option value="-">-Select Here- </option>
                      <option value="Kids">Kids</option>
                      <option value="Men">Men</option>
                      <option value="Women">Women</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group controlId="formFromDate">
                    <Form.Label>Release Date</Form.Label>
                    <Form.Control
                      name="releasedate"
                      value={formData.releasedate}
                      onChange={handleEditInputChange}
                      type="Date"
                    />
                  </Form.Group>
            <Form.Group controlId="formTitle">
              <Form.Label>image link</Form.Label>
              <Form.Control
                type="text"
                name="imagelink"
                value={formData.imagelink}
                onChange={handleEditInputChange}
              />
               <Form.Group controlId="formTitle">
              <Form.Label>Description</Form.Label>
              <Form.Control
                 as="textarea"
                name="description"
                value={formData.description}
                onChange={handleEditInputChange}
              />
            </Form.Group>
            </Form.Group>
            <Form.Group controlId="formTitle">
              <Form.Label> Product Specification</Form.Label>
              <Form.Control
                as="textarea"
                name="productspec"
                value={formData.productspec}
                onChange={handleEditInputChange}
              />
            </Form.Group> 
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEditSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Modal */}
      <Modal show={showDeleteModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the product: {selectedProduct?.productname}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirm}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ModifyList;
