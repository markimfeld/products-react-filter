import React from 'react';
import { Form } from 'react-bootstrap';


const SearchBar = (props) => {

  const { filterText, setFilterText } = props;

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
        <Form.Check type="checkbox" label="Only show products in stock" />
      </Form.Group>
    </Form>
  );
}

export default SearchBar;