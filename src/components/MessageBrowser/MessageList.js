import React from 'react';
import classnames from 'classnames';
import { MessageListItem } from './MessageListItem';

export const MessageList = (props) => {
  return (
    <div>
      {props.messages.map(message => (
        <MessageListItem
          key={message.id}
          deleteMessage={() => props.deleteMessage(message.id)}
          toggleFlagged={() => props.toggleMessageFlagged(message.id)}
          message={message}
        />
      ))}
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
