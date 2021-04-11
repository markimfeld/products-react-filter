import React from 'react';
import { Button } from 'react-bootstrap';


const ProductRow = (props) => {

  const { product, onDeleteProduct } = props;

  let productRow;

  if(product.stocked === false) {
    productRow = (
      <tr>
        <td style={{ color: 'red' }}>{product.name}</td>
        <td>${product.price}</td>
        <td className="text-center">
          <Button variant="danger" onClick={async () => {
            const options = {
              method: 'DELETE',
            }
            const response = await fetch(`http://localhost:5000/api/products/${product.id}/`, options);
            
            if(response.ok) {
              console.log(`Response works!`);
              const product = await response.json();
              onDeleteProduct(product);
            }
          }}>
            X
          </Button>
        </td>
      </tr>
    )
  } else {
    productRow = (
      <tr>
        <td>{product.name}</td>
        <td>${product.price}</td>
        <td className="text-center">
          <Button variant="danger" onClick={async () => {
            const options = {
              method: 'DELETE',
            }
            const response = await fetch(`http://localhost:5000/api/products/${product.id}/`, options);
            
            if(response.ok) {
              console.log(`Response works!`);
              const product = await response.json();
              onDeleteProduct(product);
            }
          }}>
            X
          </Button>
        </td>
      </tr>
    )
  }

  return productRow;
}


export default ProductRow;