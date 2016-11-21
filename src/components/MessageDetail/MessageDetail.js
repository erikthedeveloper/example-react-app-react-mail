import React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router';
import { Icon } from '../Icon';

const btnClasses = "button is-outlined is-pulled-right";

export const MessageDetail = ({message, deleteMessage, toggleFlagged})  => {
  return (
    <div>
      <Link to="/" className="button is-info is-outlined">
        Back
      </Link>
      <button onClick={deleteMessage} className={btnClasses}>
        <Icon name="trash" />
      </button>
      <button onClick={toggleFlagged} className={classnames(btnClasses, {'text-red': message.flagged})}>
        <Icon name="flag" />
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
};
