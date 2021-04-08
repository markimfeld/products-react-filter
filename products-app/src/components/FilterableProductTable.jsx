import React, { useState, useEffect } from 'react';
import ProductTable from './ProductTable';
import SearchBar from './SearchBar';
import { Container, Row, Col } from 'react-bootstrap';


const FilterableProductTable = () => {

  const [filterText, setFilterText] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);

  const [products, setProducts] = useState([]);


  useEffect(() => {

    const unsubscribe = fetch('http://127.0.0.1:5000/api/products/')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
      });

    return unsubscribe;
  }, []);

  return (
    <>
      <Container>
        <Row className="mt-5">
          <Col>
            <SearchBar 
              filterText={filterText} 
              inStockOnly={inStockOnly} 
              setFilterText={setFilterText} />
          </Col>
        </Row>
        <Row>
          <Col>
            <ProductTable 
              products={products} 
              filterText={filterText} 
              inStockOnly={inStockOnly} />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default FilterableProductTable;