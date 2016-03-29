import React from 'react';
import { Sidebar } from './Sidebar';
import { SearchInput } from './SearchInput';
import { MessageListItem } from './MessageListItem';

export function MessageBrowser(props) {
  const {
    messages,
    filterFlagged,
    updateFilterFlagged,
    searchText,
    updateSearchText,
    deleteMessage,
    toggleMessageFlagged,
    selectMessage,
  } = props;

  return (
    <div className="columns">
      <div className="column is-third">
        <Sidebar
          filterFlagged={filterFlagged}
          updateFilterFlagged={updateFilterFlagged}
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
            selectMessage={() => selectMessage(message.id)}
            deleteMessage={() => deleteMessage(message.id)}
            toggleFlagged={() => toggleMessageFlagged(message.id)}
            message={message}
          />
        ))}
      </div>
    </div>
  );
}
