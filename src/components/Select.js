import React from 'react';

const Select = ({ name, options, value, onChange }) => {
  return (
    <select name={name} value={value} onChange={(event) => onChange(event.target.value)} >
      {options}
    </select>
  );
};

export default Select;
