import React from 'react';
import classnames from 'classnames';

export function SearchInput({
  loading,
  onChange,
  ...otherProps}) {

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
}
