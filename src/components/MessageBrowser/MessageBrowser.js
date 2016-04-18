import React from 'react';
import classnames from 'classnames';
import { Sidebar } from './Sidebar';
import { SearchInput } from './SearchInput';
import { MessageList } from './MessageList';

export const MessageBrowser = (props) => {
  return (
    <div className="columns">
      <div className="column is-third">
        <Sidebar
          filterFlagged={props.filterFlagged}
          updateFilterFlagged={props.updateFilterFlagged}
          sentOrder={props.sentOrder}
          updateSentOrder={props.updateSentOrder}
        />
      </div>
      <div className="column">
        <SearchInput
          value={props.searchText}
          onChange={props.updateSearchText}
          loading={props.loading}
        />
        <MessageList
          messages={props.messages}
          loading={props.loading}
          loadMore={props.loadMore}
          deleteMessage={props.deleteMessage}
          toggleMessageFlagged={props.toggleMessageFlagged}
        />
      </div>
    </div>
  );
};
