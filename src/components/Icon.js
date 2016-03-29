import React from 'react';

export const Icon = ({name, ...otherProps}) => (
  <span className="icon" {...otherProps}>
    <i className={`fa fa-${name}`} />
  </span>
);
