import React, { useState, useEffect } from 'react';
import ProductTable from './ProductTable';
import SearchBar from './SearchBar';
import ProductForm from './ProductForm';
import { Container, Row, Col, Card } from 'react-bootstrap';


const FilterableProductTable = () => {


  const [filterText, setFilterText] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/categories/') 
      .then(res => res.json())
      .then(data => {
        setCategories(data);
      });

  }, []);

  useEffect(() => {

    fetch('http://127.0.0.1:5000/api/products/')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
      });

  }, []);


  return (
    <>
      <Container>
        <Row>
          <Col lg={8}>
            <Card body className="mt-5">
              <Row>
                <Col>
                  <h3 className="text-center">Lista de productos</h3>
                  <SearchBar 
                    filterText={filterText} 
                    inStockOnly={inStockOnly} 
                    setInStockOnly={setInStockOnly}
                    setFilterText={setFilterText} />
                </Col>
              </Row>
              <Row>
                <Col>
                  <ProductTable 
                    onDeleteProduct={productToDelete => 
                      setProducts(currentProducts => currentProducts.filter(product => product.id !== productToDelete.id))
                    }
                    products={products} 
                    categories={categories}
                    filterText={filterText} 
                    inStockOnly={inStockOnly} />
                </Col>
              </Row>
            </Card>
          </Col>
          <Col>
            <Row className="mt-5">
              <Col>
                <Card body>
                  <ProductForm 
                    onNewProduct={newProduct => 
                      setProducts(currentProducts => [...currentProducts, newProduct])
                    }
                    categories={categories} />
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card body className="mt-3">
              <p>Developed by Marcos.</p>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default FilterableProductTable;