import React,{useState,useEffect} from 'react';
import { Card, Button } from 'react-bootstrap';
import '../styles/cartpage.css'

function CartPage({  onRemoveFromCart, onCheckout }) {
    const [products, setProducts] = useState([]);
  const calculateTotal = () => {
    return products.reduce((total, product) => total + product.price * product.quantity, 0).toFixed(2);
  };
  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((data) => data.json())
      .then((result) => setProducts(result));
  }, []);

  return (
    <div className="cartpage container">
      <h2>Checkout Cart</h2>
      {products.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="col">
            {products.map((product) => (
              <div key={product.id} className="col-md-12" style={{ marginBottom: '20px' }}>
                <Card className='cartpage'>
                  <Card.Img className='cart-img' variant="top" src={product.image} />
                  <Card.Body>
                    <Card.Title>{product.title}</Card.Title>
                    <Card.Text>
                      Quantity: {product.quantity} x ${product.price} = ${(product.quantity * product.price).toFixed(2)}
                    </Card.Text>
                    <Button variant="danger" onClick={() => onRemoveFromCart(product.id)}>
                      Remove from Cart
                    </Button>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
          <div className="total-section">
            <h4>Total: ${calculateTotal()}</h4>
            <Button variant="success" onClick={onCheckout}>
              Checkout
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default CartPage;
