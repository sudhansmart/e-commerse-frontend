// Wishlist.js
import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import '../styles/wishlist.css';

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5175/wishlist/1') // Assuming the user ID is 1 for testing
      .then((response) => response.json())
      .then((data) => setWishlist(data))
      .catch((error) => console.error('Error fetching wishlist:', error));
  }, []);

  const handleRemoveFromWishlist = (productId) => {
    fetch(`http://localhost:5175/wishlist/1/${productId}`, { // Assuming the user ID is 1 for testing
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          setWishlist((prevWishlist) => prevWishlist.filter((product) => product._id !== productId));
        } else {
          console.error('Failed to remove product from wishlist');
        }
      })
      .catch((error) => console.error('Error removing product from wishlist:', error));
  };

  return (
    <div className="wishlist-container">
      <h2>Your Wishlist</h2>
      {wishlist.length === 0 ? (
         <div className='wishlist-content'> <p>Your wishlist is empty.</p> </div> 
      ) : (
        <div className="row">
          {wishlist.map((product) => (
            <div key={product._id} className="col-md-4" style={{ marginBottom: '20px' }}>
              <Card>
                <Card.Img variant="top" src={product.image} />
                <Card.Body>
                  <Card.Title>{product.title}</Card.Title>
                  <Card.Text>${product.price}</Card.Text>
                  <Button
                    variant="danger"
                    onClick={() => handleRemoveFromWishlist(product._id)}
                  >
                    Remove from Wishlist
                  </Button>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;
