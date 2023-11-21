import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIndianRupee } from '@fortawesome/free-solid-svg-icons';

const Filteration = ({ products }) => {
  const [filter, setFilter] = useState({
    category: 'All',
    subcategory: 'All',
    type: 'All',
    sortBy: 'popularity', // Default sort by popularity
    searchTerm: '',
    minPrice: '', // Added minPrice state
    maxPrice: '', // Added maxPrice state
  });

  const filterProducts = () => {
    let filteredProducts = [...products];

    // Apply search term filter
    if (filter.searchTerm) {
      filteredProducts = filteredProducts.filter((product) =>
        product.productname && product.productname.toLowerCase().includes(filter.searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (filter.category !== 'All') {
      filteredProducts = filteredProducts.filter((product) => product.category === filter.category);
    }

    // Apply material filter
    if (filter.subcategory !== 'All') {
      filteredProducts = filteredProducts.filter((product) => product.subcategory === filter.subcategory);
    }

    // Apply type filter
    if (filter.type !== 'All') {
      filteredProducts = filteredProducts.filter((product) => product.type === filter.type);
    }

    // Apply price range filter
    if (filter.minPrice !== '' && filter.maxPrice !== '') {
      filteredProducts = filteredProducts.filter(
        (product) => product.price >= parseInt(filter.minPrice) && product.price <= parseInt(filter.maxPrice)
      );
    }

  
    // Sort by selected property
    filteredProducts.sort((a, b) => {
        switch (filter.sortBy) {
          case 'popularity':
            return a.popularity - b.popularity;
          case 'priceLowHigh':
            return a.price - b.price;
          case 'priceHighLow':
            return b.price - a.price;
          case 'releaseDate':
            const dateA = new Date(a.releasedate.split('/').reverse().join('/'));
            const dateB = new Date(b.releasedate.split('/').reverse().join('/'));
            return dateB - dateA;
            // return new Date(a.releasedate) - new Date(b.releasedate);
          default:
            return 0;
        }
      });

    return filteredProducts;
  };

  const handleFilterChange = (event) => {
    setFilter({ ...filter, [event.target.name]: event.target.value });
  };

  return (
    <Container fluid>
      <Row>
        <Col md={3} style={{paddingTop:'15px'}}>
          <h3>Filters</h3>
          <Form>
            <Form.Group controlId="formSearch">
              <Form.Label>Search:</Form.Label>
              <Form.Control
                type="text"
                name="searchTerm"
                value={filter.searchTerm}
                onChange={handleFilterChange}
                placeholder="Search products"
              />
            </Form.Group>

            <Form.Group controlId="formCategory">
              <Form.Label>Metal:</Form.Label>
              <Form.Control as="select" name="category" value={filter.category} onChange={handleFilterChange}>
                <option value="All">All</option>
                <option value="Gold">Gold</option>
                <option value="Diamond">Diamond</option>
                <option value="Silver">Silver</option>
                <option value="Platinum">Platinum</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formMaterial">
              <Form.Label>Category:</Form.Label>
              <Form.Control as="select" name="subcategory" value={filter.subcategory} onChange={handleFilterChange}>
                <option value="All">All</option>
                <option value="Ring">Ring</option>
                <option value="Necklace">Necklace</option>
                <option value="Chain">Chain</option>
                <option value="EarRing">Ear Ring</option>
              </Form.Control>
            </Form.Group>

           
            <Form.Group controlId="formPriceRange">
              <Form.Label>Price Range:</Form.Label>
              <Row>
                <Col>
                  <Form.Control
                    type="number"
                    name="minPrice"
                    value={filter.minPrice}
                    onChange={handleFilterChange}
                    placeholder="Min Price"
                  />
                </Col>
                <Col>
                  <Form.Control
                    type="number"
                    name="maxPrice"
                    value={filter.maxPrice}
                    onChange={handleFilterChange}
                    placeholder="Max Price"
                  />
                </Col>
              </Row>
            </Form.Group>

            <Form.Group controlId="formSortBy">
              <Form.Label>Sort By:</Form.Label>
              <Form.Control as="select" name="sortBy" value={filter.sortBy} onChange={handleFilterChange}>
                <option value="popularity">Popularity</option>
                <option value="priceLowHigh">Price Low-High</option>
                <option value="priceHighLow">Price High-Low</option>
                <option value="releaseDate">Recently Launched</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Col>

        <Col md={9} style={{padding :"15px"}}>
          <Row xs={1} md={2} lg={3} xl={3}>
            {filterProducts().map((product) => (
              <Col md={9} key={product.id} style={{ marginBottom: '20px' }}>
                <Card className="h-100">
                  <div className="text-center">
                    <Card.Img variant="top" src={product.imagelink} alt={`Product: ${product.title}`} />
                  </div>
                  <Card.Body>
                    <Card.Title style={{ fontFamily: 'Pacifico'}}>{product.productname}</Card.Title>
                    <Card.Text style={{ display: 'flex', justifyContent: 'flex-end', fontWeight: '700' }}>
                     <span> <FontAwesomeIcon  icon={faIndianRupee}/> {product.price}</span>
                    </Card.Text>
                    <Card.Text>
                      <p>Metal : {product.category}</p>
                      <p style={{color:'brown'}}>Weight: {product.weight} g</p>
                      <p>Description: {product.description}</p>
                      <p>Specifications: {product.productspec}</p>
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer className="bg-white" style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button variant="primary">Add to Cart</Button>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Filteration;
