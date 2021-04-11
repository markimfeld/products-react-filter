import React from 'react';
import ProductCategoryRow from './ProductCategoryRow';
import ProductRow from './ProductRow';
import { Table, Alert } from 'react-bootstrap';


const ProductTable = (props) => {


  const { products, categories, filterText, inStockOnly, onDeleteProduct } = props;

  const inStockOnlyList = products.filter(product => {
    if(inStockOnly === false) return product;
    return product.stocked === inStockOnly;
  });

  const filteredList = inStockOnlyList.filter(product => product.name.toLowerCase().includes(filterText));

  const productsByCategory = categories.map(category => {

    let productListByCategory = filteredList.map((product, idx) => {
      if(product.category_id === category.id) {
        return <ProductRow key={product.name} product={product} onDeleteProduct={onDeleteProduct}/>
      } 
      return <React.Fragment key={idx}></React.Fragment>;
    })

    return (
      <React.Fragment key={category.id}>
        <ProductCategoryRow key={category.name} name={category.name} />
        { productListByCategory }
      </React.Fragment>
    )
  });

  const hasProducts = productsByCategory.length > 0;

  if(hasProducts) {
    return (
      <>
        <Table bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            { productsByCategory }
          </tbody>
        </Table>
      </>
    );
  } else {

    return (
      <Alert variant="info">
        No hay productos para mostrar
      </Alert>
    )
  }
}


export default ProductTable;