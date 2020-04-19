/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { transparentize } from 'polished';

import { SelectWrapper } from './styles';

export default function SelectInput({
  name,
  onChange,
  options,
  placeholder,
  value,
}) {
  const selected = options.filter(o => {
    return o.value === value;
  });

  const selectStyle = {
    control: styles => ({
      backgroundColor: 'white',
      border: '1px solid #ddd',
      height: '45px',
      borderRadius: '4px',
      transition: 'all 300ms ease-out',
      ':hover': {
        ...styles[':hover'],
        borderColor: '#444',
      },
    }),
    option: (styles, { isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        fontSize: '16px',
        ':hover': {
          backgroundColor: transparentize(0.8, '#7159c1'),
        },
        backgroundColor: isDisabled
          ? null
          : isSelected
          ? transparentize(0.5, '#7159c1')
          : isFocused
          ? transparentize(0.9, '#7159c1')
          : null,
        color: isDisabled
          ? '#ccc'
          : isSelected
          ? '#111'
          : isFocused
          ? 'black'
          : null,
      };
    },
    input: () => ({
      fontSize: '16px',
      input: {
        height: '43px !important',
      },
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
    valueContainer: () => ({
      padding: '0 10px',
      fontSize: '16px',
    }),
    placeholder: styles => ({
      ...styles,
      fontSize: '16px',
      color: '#757575',
    }),
  };

  return (
    <SelectWrapper>
      <Select
        onChange={e => onChange(e)}
        placeholder={placeholder}
        value={selected}
        styles={selectStyle}
        name={name}
        options={options}
      />
    </SelectWrapper>
  );
}

SelectInput.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
