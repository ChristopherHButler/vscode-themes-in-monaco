import React from 'react';

const Select = ({ name, options, value, onChange, disabled }) => {
  return (
    <select name={name} disabled={disabled} value={value} onChange={(event) => onChange(event.target.value)} >
      {options}
    </select>
  );
};

export default Select;
