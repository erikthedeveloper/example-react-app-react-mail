import React from 'react';
import { Link } from 'react-router';
import { Icon } from './Icon';

export function MessageDetails({message, deleteMessage}) {
  return (
    <div>
      <Link to="/" className="button is-info is-outlined">
        Back
      </Link>
      <button onClick={deleteMessage} className="button is-danger is-outlined is-pulled-right">
        <Icon name="trash" />
      </button>
      <hr />
      <div className="columns">
        <div className="column is-3">
          <div className="image">
            <img src={message.fromAvatar} />
          </div>
        </div>
        <div className="column">
          <h1 className="title">
            {message.from}
          </h1>
          <h2 className="subtitle">
            {message.subject}
          </h2>
          <p className="subtitle is-5">
            {message.body}
          </p>
        </div>
      </div>
    </div>
  );
}
