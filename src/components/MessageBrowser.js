import React from 'react';
import { Sidebar } from './Sidebar';
import { SearchInput } from './SearchInput';
import { MessageListItem } from './MessageListItem';

export function MessageBrowser(props) {
  const {
    messages,
    loadMore,
    filterFlagged,
    updateFilterFlagged,
    searchText,
    updateSearchText,
    sentOrder,
    updateSentOrder,
    deleteMessage,
    toggleMessageFlagged,
  } = props;

  return (
    <div className="columns">
      <div className="column is-third">
        <Sidebar
          filterFlagged={filterFlagged}
          updateFilterFlagged={updateFilterFlagged}
          sentOrder={sentOrder}
          updateSentOrder={updateSentOrder}
        />
      </div>
      <div className="column">
        <SearchInput
          value={searchText}
          onChange={updateSearchText}
        />
        {messages.map(message => (
          <MessageListItem
            key={message.id}
            deleteMessage={() => deleteMessage(message.id)}
            toggleFlagged={() => toggleMessageFlagged(message.id)}
            message={message}
          />
        ))}
        <div className="is-text-centered">
          <hr />
          <button className="button is-primary" onClick={loadMore}>
            Load More
          </button>
        </div>
      </div>
    </div>
  );
}
