import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/addproduct.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIndianRupee } from '@fortawesome/free-solid-svg-icons';
import { Form } from 'react-bootstrap';
import axios from 'axios';

function AddProducts() {
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

  const [errors, setErrors] = useState({
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

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Input Field Validation
  const validateProductname = (productname) => {
    const alphaPattern = /^[A-Za-z ]+$/;
    return alphaPattern.test(productname);
  };

  const validatePrice = (price) => {
    const alphaPattern = /^[0-9.]+$/;
    return alphaPattern.test(price);
  };
  const validateWeight = (weight) => {
    const alphaPattern = /^[0-9.]+$/;
    return alphaPattern.test(weight);
  };
  const validateQuantity = (quantity) => {
    const alphaPattern = /^[0-9]+$/;
    return alphaPattern.test(quantity);
  };

  const validateDescription = (description) => {
    const alphaPattern = /[A-Za-z0-9.,:;]/;
    return alphaPattern.test(description);
  };

  const validateCategory = (category) => {
    const alphaPattern = /^[A-Za-z]+$/;
    return alphaPattern.test(category);
  };
  const validateSubCategory = (subcategory) => {
    const alphaPattern = /^[A-Za-z]+$/;
    return alphaPattern.test(subcategory);
  };
  const validateSize = (size) => {
    const alphaPattern = /^[A-Za-z]+$/;
    return alphaPattern.test(size);
  };

  const validateProductspec = (productspec) => {
    const alphaPattern = /[A-Za-z:.,;0-9]/;
    return alphaPattern.test(productspec);
  };

  const handleRegister = (event) => {
    event.preventDefault();
    const productnameValid = validateProductname(formData.productname);
    const priceValid = validatePrice(formData.price);
    const weightValid = validateWeight(formData.weight);
    const quantityValid = validateQuantity(formData.quantity);
    const descriptionValid = validateDescription(formData.description);
    const categoryValid = validateCategory(formData.category);
    const subcategoryValid = validateSubCategory(formData.subcategory);
    const sizeValid = validateSize(formData.size);
    const productspecValid = validateProductspec(formData.productspec);

    setErrors({
      productname: productnameValid ? '' : 'Invalid Product Name',
      price: priceValid ? '' : 'Invalid Price',
      weight: weightValid? '' : 'Invalid Weight',
      quantity: quantityValid ? '' : 'Invalid Quantity',
      description: descriptionValid ? '' : 'Invalid Description',
      category: categoryValid ? '' : 'Please Select',
      subcategory: subcategoryValid ? '' : 'Please Select',
      size: sizeValid ? '' : 'Please Select',
      productspec: productspecValid ? '' : 'Invalid Product Specification',
    });

    if (
      productnameValid &&
      priceValid &&
      quantityValid &&
      descriptionValid &&
      categoryValid &&
      productspecValid &&
      weightValid &&
      sizeValid &&
      subcategoryValid
    ) {
        axios.post('http://localhost:5175/product/insert', formData);

      console.log('Product added successfully', formData);

      setFormData({
        productname: '',
        description: '',
        price: '',
        weight: '',
        category: '',
        subcategory:'',
        size: '',
        releasedate: '',
        productspec: '',
        quantity: '',
        imagelink: '',
      });

      alert('Product added successfully');
    }
  };

  return (
    <>
      <div className="addproduct-container">
        <div className="addproduct">
          <div className="row">
            <div className="col-md-4" style={{ margin: '5% 3%' }}>
              <h2 style={{ color: 'antiquewhite' }}> Add Products</h2>
              <Form>
                <div className="mb-3">
                  <label className="form-label">Product Name</label>
                  <input
                    type="text"
                    name="productname"
                    className="form-control"
                    value={formData.productname}
                    onChange={handleInputChange}
                    required
                  />
                  {errors.productname && (
                    <div className="text-danger">{errors.productname}</div>
                  )}
                </div>
               <div className="mb-2">
                  <label className="form-label">Price:</label>
                  <span style={{ display: 'flex' }}>
                    <input
                      type="number"
                      name="price"
                      className="form-control"
                      value={formData.price}
                      onChange={handleInputChange}
                      required
                    />
                    <span
                      style={{
                        color: 'gold',
                        marginLeft: '5px',
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignContent: 'center',
                      } }
                    >
                      <FontAwesomeIcon icon={faIndianRupee} />
                    </span>
                  </span>
                  {errors.price && (
                    <div className="text-danger">{errors.price}</div>
                  )}
                </div>
                <div className="mb-2">
                  <label className="form-label">Weight:</label>
                  <span style={{ display: 'flex' }}>
                    <input
                      type="number"
                      name="weight"
                      className="form-control"
                      value={formData.weight}
                      onChange={handleInputChange}
                      required
                    />
                    <span
                      style={{
                        color: 'gold',
                        marginLeft: '5px',
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignContent: 'center',
                      } }
                    >
                     grams
                    </span>
                  </span>
                  {errors.weight && (
                    <div className="text-danger">{errors.weight}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label">Quantity:</label>
                  <input
                    type="number"
                    name="quantity"
                    className="form-control"
                    value={formData.quantity}
                    onChange={handleInputChange}
                  />
                  {errors.quantity && (
                    <div className="text-danger">{errors.quantity}</div>
                  )}
                </div>
                <div className="mb-3">
                  <Form.Label className="form-label">Description:</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="description"
                    className="form-control"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                  />
                  {errors.description && (
                    <div className="text-danger">{errors.description}</div>
                  )}
                </div>
                <div className="mb-3">
                  <Form.Group controlId="formGridState">
                    <Form.Label>Category</Form.Label>
                    <Form.Select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                    >
                      <option value="-">-Select Here- </option>
                      <option value="Gold">Gold</option>
                      <option value="Diamond">Diamond</option>
                      <option value="Silver">Silver</option>
                      <option value="Platinum">Platinum</option>
                    </Form.Select>
                    {errors.category && (
                      <div className="text-danger">{errors.category}</div>
                    )}
                  </Form.Group>
                </div>
                <div className="mb-3">
                  <button
                    type="submit"
                    className="btn btn-success"
                    onClick={handleRegister}
                    style={{ marginLeft: '15px' }}
                  >
                    Add Product
                  </button>
                </div>
              </Form>
            </div>
            <div className="col-md-6" style={{ margin: '5% 5%' }}>
              <h2 style={{ color: 'antiquewhite' }}> Product Details</h2>
              <Form>
                <div className="mb-3">
                  <Form.Group controlId="formGridState">
                    <Form.Label>Sub Category</Form.Label>
                    <Form.Select
                      name="subcategory"
                      value={formData.subcategory}
                      onChange={handleInputChange}
                    >
                      <option value="-">-Select Here- </option>
                      <option value="EarRings">Ear-Rings</option>
                      <option value="BraceletsBangles">Bracelets & Bangles</option>
                      <option value="Necklace">Necklace</option>
                      <option value="Chain">Chain</option>
                    </Form.Select>
                    {errors.subcategory && (
                      <div className="text-danger">{errors.subcategory}</div>
                    )}
                  </Form.Group>
                </div>
                <div className="mb-3">
                  <Form.Group controlId="formGridState">
                    <Form.Label>Size</Form.Label>
                    <Form.Select
                      name="size"
                      value={formData.size}
                      onChange={handleInputChange}
                    >
                      <option value="-">-Select Here- </option>
                      <option value="Kids">Kids</option>
                      <option value="Men">Men</option>
                      <option value="Women">Women</option>
                    </Form.Select>
                    {errors.size && (
                      <div className="text-danger">{errors.size}</div>
                    )}
                  </Form.Group>
                </div>
                <div className="mb-3">
                  <Form.Group controlId="formFromDate">
                    <Form.Label>Release Date</Form.Label>
                    <Form.Control
                      name="releasedate"
                      value={formData.releasedate}
                      onChange={handleInputChange}
                      type="Date"
                    />
                  </Form.Group>
                </div>
                <div className="mb-3">
                  <label className="form-label">image link:</label>
                  <input
                    type="text"
                    name="imagelink"
                    className="form-control"
                    value={formData.imagelink}
                    onChange={handleInputChange}
                  />
                  {errors.imagelink && (
                    <div className="text-danger">{errors.imagelink}</div>
                  )}
                </div>
                <div className="mb-3">
                  <Form.Label className="form-label">
                    Product Specification:
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    name="productspec"
                    className="form-control"
                    value={formData.productspec}
                    onChange={handleInputChange}
                    rows={3}
                  />
                  {errors.productspec && (
                    <div className="text-danger">{errors.productspec}</div>
                  )}
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddProducts;
