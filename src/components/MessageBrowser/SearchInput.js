import React from 'react';
import classnames from 'classnames';

export const SearchInput = (props) => {
  const {loading, onChange, ...otherProps} = props;
  const updateValue =
    ({target: {value}}) => onChange(value);

  return (
    <div className={classnames('control', {'is-loading': loading})}>
      <input
        type="text"
        className="input"
        placeholder="Search..."
        onChange={updateValue}
        {...otherProps}
      />
    </div>
  );
};
