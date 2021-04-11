import React from 'react';
import { Form } from 'react-bootstrap';


const SearchBar = (props) => {

  const { filterText, setFilterText, inStockOnly, setInStockOnly } = props;

  return (
    <Form>
      <Form.Group controlId="formBasicSearch">
        <Form.Control 
          type="text" 
          placeholder="Search..." 
          value={filterText} 
          onChange={e => setFilterText(e.target.value)} />
      </Form.Group>
      <Form.Group controlId="formBasicCheckbox">
        <Form.Check 
          type="checkbox" 
          label="Only show products in stock" 
          defaultChecked={inStockOnly}
          onChange={e => setInStockOnly(e.target.checked)} />
      </Form.Group>
    </Form>
  );
}

export default SearchBar;