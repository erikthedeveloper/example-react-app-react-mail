import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import classnames from 'classnames';
import { MessageListItem } from './MessageListItem';

export const MessageList = (props) => {
  return (
    <div>
      <ReactCSSTransitionGroup
        transitionName="animated-list-item"
        transitionEnterTimeout={250}
        transitionLeaveTimeout={250}
      >
        {props.messages.map(message => (
          <div key={message.id}>
            <MessageListItem
              deleteMessage={() => props.deleteMessage(message.id)}
              toggleFlagged={() => props.toggleMessageFlagged(message.id)}
              message={message}
            />
          </div>
        ))}
      </ReactCSSTransitionGroup>
      <div className="is-text-centered">
        <hr />
        <button
          className={classnames('button is-primary', {'is-loading': props.loading})}
          onClick={(props.loadMore)}
        >
          Load More
        </button>
      </div>
    </div>
  )
};
