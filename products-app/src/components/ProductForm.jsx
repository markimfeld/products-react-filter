import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';


const ProductForm = (props) => {

  const { categories, onNewProduct } = props;

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [category_id, setCategoryId] = useState(-1);
  const [stocked, setStocked] = useState(false);

  const options = categories.map(category => {
    return (
      <option key={category.id} value={category.id}>{ category.name }</option>
    );
  });

  return (
    <>
      <h3 className="text-center">Agregar nuevo producto</h3>
      <Form>
        <Form.Group controlId="formBasicProductName">
          <Form.Label>Nombre:</Form.Label>
          <Form.Control 
            type="text" 
            value={name} 
            onChange={e => setName(e.target.value)}
            placeholder="Nombre del producto..." />
        </Form.Group>

        <Form.Group controlId="formBasicProductPrice">
          <Form.Label>Precio:</Form.Label>
          <Form.Control 
            type="number" 
            step="0.01"
            value={price} 
            onChange={e => setPrice(e.target.value)}
            placeholder="Precio..." />
        </Form.Group>

        <Form.Group>
          <Form.Label>Categoria:</Form.Label>
          <Form.Control 
            as="select" 
            onChange={e => setCategoryId(e.target.value)}
            value={category_id}>
            <option value={-1} key={-1} disabled>--Select a category--</option>
            { options }
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="formBasicStocked" className="mt-3">
          <Form.Check 
            type="checkbox" 
            defaultChecked={stocked} 
            onChange={e => setStocked(e.target.checked)}
            label="Tiene stock?" />
        </Form.Group>
        <Button 
          variant="primary" 
          onClick={async () => {

            const newProduct = { name, price, category_id, stocked };

            const options = {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(newProduct)
            }
            const response = await fetch('http://127.0.0.1:5000/api/products/', options);

            if(response.ok) {
              const newProduct = await response.json();
              onNewProduct(newProduct);
              setName('');
              setPrice(0);
              setCategoryId(-1);
              setStocked(false);
            }
          }} >
          Guardar
        </Button>
      </Form>
    </>
  );
}

export default ProductForm;