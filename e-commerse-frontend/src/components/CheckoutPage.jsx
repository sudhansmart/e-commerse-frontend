import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons';
import '../styles/CheckoutPage.css';

function CheckoutPage() {
  const [products, setProducts] = useState([
    {
      productname: 'Ear Ring',
      price: '15000',
      weight: '4.00',
      quantity: 1,
      description: 'The Fantastic ear ring ',
      category: 'Gold',
      subcategory: 'ear ring',
      size: 'men',
      releasedate: '15/06/1997',
      imagelink: 'https://www.jewelegance.com/cdn/shop/products/JGS-2106-01262.jpg?v=1675710253',
      productspec: 'Hello, this is a trial version',
    },
    {
        productname: 'Ear Ring',
        price: '15000',
        weight: '4.00',
        quantity: 1,
        description: 'The Fantastic ear ring ',
        category: 'Gold',
        subcategory: 'ear ring',
        size: 'men',
        releasedate: '15/06/1997',
        imagelink: 'https://www.jewelegance.com/cdn/shop/products/JGS-2106-01262.jpg?v=1675710253',
        productspec: 'Hello, this is a trial version',
      },
  ]);

  const calculateTotal = () => {
    const subtotal = products.reduce((total, product) => total + product.price * product.quantity, 0);
    const vat = 0.08 * subtotal; // 8% VAT
    const totalDiscount = 0.05 * subtotal; // 5% discount
    const total = (subtotal + vat - totalDiscount).toFixed(2);

    return {
      subtotal: subtotal.toFixed(2),
      vat: vat.toFixed(2),
      totalDiscount: totalDiscount.toFixed(2),
      total,
    };
  };

  const increaseQuantity = (index) => {
    const updatedProducts = [...products];
    updatedProducts[index].quantity += 1;
    setProducts(updatedProducts);
  };

  const decreaseQuantity = (index) => {
    const updatedProducts = [...products];
    if (updatedProducts[index].quantity > 1) {
      updatedProducts[index].quantity -= 1;
      setProducts(updatedProducts);
    }
  };

  const removeProduct = (index) => {
    const updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    setProducts(updatedProducts);
  };

  const orderSummary = calculateTotal();

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-9">
          {products.map((product, index) => (
            <div key={product.productname} className="card mb-3">
              <div className="row g-0">
                <div className="col-md-4">
                  <img src={product.imagelink} alt={product.productname} className="img-fluid" />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">{product.productname}</h5>
                    <p className="card-text" style={{ fontWeight: '500', color: 'brown' }}>
                      Weight: {product.weight} g
                    </p>
                    <h6 className="card-text">
                      Price: <FontAwesomeIcon icon={faIndianRupeeSign} /> {product.price} Rs/unit
                    </h6>
                    <p className="card-text">Description: {product.description}</p>
                    <p className="card-text">Product Spec: {product.productspec}</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="quantity">
                        <button className="btn btn-outline-secondary" onClick={() => decreaseQuantity(index)}>
                          -
                        </button>
                        <span className="mx-2">{product.quantity}</span>
                        <button className="btn btn-outline-secondary" onClick={() => increaseQuantity(index)}>
                          +
                        </button>
                      </div>
                      <button className="btn btn-danger" onClick={() => removeProduct(index)}>
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="col-lg-3 my-4">
          <div id="order_summary" className="bg-light p-3">
            <h4>Order Summary</h4>
            <hr />
            <p>
              Items: <span className="order-summary-values">{products.length} (Units)</span>
            </p>
            <p>
              Discount 5%: <FontAwesomeIcon icon={faIndianRupeeSign} /> <span className="order-summary-values">{orderSummary.totalDiscount}</span>
            </p>
            <p>
            Making charges (8%): <FontAwesomeIcon icon={faIndianRupeeSign} /> <span className="order-summary-values">{orderSummary.vat}</span>
            </p>
            <p>
              Subtotal: <FontAwesomeIcon icon={faIndianRupeeSign} /> <span className="order-summary-values">{orderSummary.subtotal}</span>
            </p>
            <p>
              TOTAL (Incl of all Taxes): <FontAwesomeIcon icon={faIndianRupeeSign} /> <span className="order-summary-values">{orderSummary.total}</span>
            </p>
            <hr />
            <button id="checkout_btn" className="btn btn-primary btn-block">
              Check out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
