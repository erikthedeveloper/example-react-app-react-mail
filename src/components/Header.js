/**
 * Embrace the JSX! It isn't magic. Just sugar.
 * See for yourself!
 *  All 3 Header components below are equivalent.
 *  1) With JSX
 *  2) Without JSX
 *  3) Without JSX (using DOM helpers)
 * React must be within the Scope for JSX
 * http://facebook.github.io/react/docs/jsx-in-depth.html
 */
import React from 'react';

export const Header = ({title, subtitle}) => (
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

/**
 * React.createElement({string|ReactClass} type, [{object} props], [children ...])
 * http://facebook.github.io/react/docs/top-level-api.html#react.createelement
 * Example JSX -> JS
 *  JSX: <div className="hero">Text</div>
 *  JS:  React.createElement('div', {className: 'hero'}, 'Text')
 * Import createElement and shorten to el
 */
import { createElement as el } from 'react';

export const HeaderWithoutJsx = ({title, subtitle}) => (
  el('section', {className: 'hero is-primary is-bold'},
    el('div', {className: 'hero-content'},
      el('div', {className: 'container'},
        el('h1', {className: 'title'},
          title
        ),
        el('h2', {className: 'subtitle'},
          subtitle + ' Without JSX'
        )
      )
    )
  )
);

/**
 * React.DOM provides convenience wrappers around React.createElement for DOM components.
 * http://facebook.github.io/react/docs/top-level-api.html#react.dom
 */
import { DOM } from 'react';
const {section, div, h1, h2} = DOM;

export const HeaderWithDomHelpers = ({title, subtitle}) => (
  section({className: 'hero is-primary is-bold'},
    div({className: 'hero-content'},
      div({className: 'container'},
        h1({className: 'title'},
          title
        ),
        h2({className: 'subtitle'},
          subtitle + ' Without JSX (using DOM helpers)'
        )
      )
    )
  )
);
