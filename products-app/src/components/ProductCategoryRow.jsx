import React from 'react';


const ProductCategoryRow = (props) => {

  const { name } = props;

  return (
    <tr>
      <th colSpan="2">{ name }</th>
    </tr>
  );
}

export default ProductCategoryRow;