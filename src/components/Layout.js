import React from 'react';
import { Header } from './Header';

export const Layout = ({children}) => {
  return (
    <div>
      <Header
        title="ReactMail"
        subtitle="A Great E-Mail Client!"
      />
      <div className="section outer-wrapper">
        <div className="container">
          {children}
        </div>
      </div>
    </div>
  );
};
