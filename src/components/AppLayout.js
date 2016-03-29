import React from 'react';
import { Header } from './Header';

export function AppLayout({children}) {
  return (
    <div>
      <Header />
      <div className="section outer-wrapper">
        <div className="container">
          {children}
        </div>
      </div>
    </div>
  );
}
