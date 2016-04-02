import React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router';
import { Icon } from './Icon';

const makeEventKiller = fn => event => {
  event.preventDefault();
  event.stopPropagation();
  fn();
};

export function MessageListItem(props) {
  const {
    message: {id, from, fromAvatar, subject, body, flagged},
    deleteMessage,
    toggleFlagged,
  } = props;

  const onClickFlag = makeEventKiller(toggleFlagged);
  const onClickDelete = makeEventKiller(deleteMessage);
  const onClickReply = makeEventKiller(() => alert(`Reply to ${from}`));

  return (
    <div className="media hide message-list-item">
      <div className="media-left">
        <div className="image is-64x64">
          <img src={fromAvatar} />
        </div>
      </div>
      <div className="media-content content columns">
        <div className="column is-10">
          <Link to={`/${id}`} className="is-link">
            {subject}
          </Link>
          <p>
            {`${body.substring(0, 100 )}...`}
          </p>
          <div>
            <small>
              <a className="is-link" onClick={onClickReply}>
                Reply to {from}
              </a> ·
              2 Days Ago ·
              <Icon name="trash" onClick={onClickDelete} />
            </small>
          </div>
        </div>
        <div className="column flex-center-all" onClick={onClickFlag}>
          <Icon
            name="flag"
            className={classnames('clickable', {'text-red': flagged})}
          />
        </div>
      </div>
    </div>
  );
}
