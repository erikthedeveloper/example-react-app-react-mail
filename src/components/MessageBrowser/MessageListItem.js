import React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router';
import { Icon } from '../Icon';

const makeEventKiller = fn => event => {
  event.preventDefault();
  event.stopPropagation();
  fn();
};

/**
 * Get the difference between 2 dates in days.
 * @param {Date} before
 * @param {Date} after
 * @return {number}
 */
function humanizedDiff(before, after = new Date()) {
  const daysDiff = Math.round((after - before) / (24 * 60 * 60 * 1000));
  return (daysDiff < 30)
    ? `${daysDiff} days`
    : `${Math.round(daysDiff / 30)} months`;
}

export const MessageListItem = (props) => {
  const {
    message,
    deleteMessage,
    toggleFlagged,
  } = props;

  const onClickFlag = makeEventKiller(toggleFlagged);
  const onClickDelete = makeEventKiller(deleteMessage);
  const onClickReply = makeEventKiller(() => alert(`Reply to ${message.from}`));

  return (
    <div className="media hide message-list-item">
      <div className="media-left">
        <div className="image is-64x64">
          <img src={message.fromAvatar} />
        </div>
      </div>
      <div className="media-content content columns">
        <div className="column is-10">
          <Link to={`/${message.id}`} className="is-link">
            {message.subject}
          </Link>
          <p>
            {`${message.body.substring(0, 100 )}...`}
          </p>
          <div>
            <small>
              <a className="is-link" onClick={onClickReply}>
                Reply to {message.from}
              </a>
              {' ● '}
              {humanizedDiff(new Date(message.sent))} ago ●
              <Icon name="trash" onClick={onClickDelete} />
            </small>
          </div>
        </div>
        <div className="column flex-center-all" onClick={onClickFlag}>
          <Icon
            name="flag"
            className={classnames('clickable', {'text-red': message.flagged})}
          />
        </div>
      </div>
    </div>
  );
};
