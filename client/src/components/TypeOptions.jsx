import React from 'react';

const TypeOptions = ({ str }) => {
  return (
    <option value={str}>
      {(str = str.charAt(0).toUpperCase() + str.slice(1))}
    </option>
  );
};

export default TypeOptions;
