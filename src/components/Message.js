import React from 'react';

export function Message(props) {
  const {
    message: {from, fromAvatar, subject, body},
    back,
  } = props;
  return (
    <div>
      <a className="is-link" onClick={back}>
        Back
      </a>
      <hr />
      <div className="columns">
        <div className="column is-3">
          <div className="image">
            <img src={fromAvatar} />
          </div>
        </div>
        <div className="column">
          <h1 className="title">
            {from}
          </h1>
          <h2 className="subtitle">
            {subject}
          </h2>
          <p className="subtitle is-5">
            {body}
          </p>
        </div>
      </div>
    </div>
  );
}
