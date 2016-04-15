import React from 'react';

/**
 * "Private" mini-components within module.
 */
const Header = ({title, subtitle}) => (
  <section className="hero is-primary is-bold">
    <div className="hero-content">
      <div className="container">
        <h1 className="title">
          {title}
        </h1>
        <h2 className="subtitle">
          {subtitle}
        </h2>
      </div>
    </div>
  </section>
);

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
