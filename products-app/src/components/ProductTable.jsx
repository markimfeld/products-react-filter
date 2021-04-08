import React from 'react';
import ProductCategoryRow from './ProductCategoryRow';
import ProductRow from './ProductRow';
import { Table } from 'react-bootstrap';


const ProductTable = (props) => {

  const { products, filterText, inStockOnly } = props;

  const filteredList = products.filter(product => product.name.toLowerCase().includes(filterText));

  const productList = filteredList.map(product => {
    return (
      <ProductRow key={product.id} name={product.name} price={product.price} />
    )
  });


  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          { productList }
        </tbody>
      </Table>
    </>
  );
}


export default ProductTable;