import React from 'react';
import { AppLayout } from './components/AppLayout';
import { Message } from './components/Message';
import { MessageBrowser } from './components/MessageBrowser';
import { request, toQueryString } from './util/http';

const initialState = {
  messages: [],
  filterFlagged: false,
  searchText: '',
  lastQueryString: null,
  selectedMessageId: null,
};

/**
 * The top level App component!
 */
export const App = React.createClass({

  getInitialState() {
    return initialState;
  },

  componentDidMount() {
    this.requestMessages(this.state);
  },

  componentDidUpdate(nextProps, prevState) {
    const {state} = this;
    if (
      state.filterFlagged !== prevState.filterFlagged ||
      state.searchText !== prevState.searchText
    ) {
      this.requestMessages(state);
    }
  },

  updateFilterFlagged(filterFlagged) {
    this.setState({filterFlagged});
  },

  updateSearchText(searchText) {
    this.setState({searchText});
  },

  selectMessage(id) {
    this.setState({selectedMessageId: id});
  },

  getMessage(id) {
    const [message] = this.state.messages
      .filter(m => m.id === id);

    return message;
  },

  /**
   * GET /messages - Query string based on state.
   * @param state
   */
  requestMessages(state) {
    const {filterFlagged, searchText, lastQueryString} = state;

    const params = {_limit: 5};
    if (filterFlagged)
      params.flagged = true;
    if (searchText)
      params.q = searchText.trim();

    const queryString = toQueryString(params);
    if (queryString === lastQueryString)
      return;

    this.setState({lastQueryString: queryString});

    request(`messages${queryString}`)
      .then(res => res.json())
      .then(json => this.setState({messages: json}));
  },

  /**
   * PATCH messages/:id - Toggle a message's flagged state.
   * @param id
   */
  toggleMessageFlagged(id) {
    const message = this.getMessage(id);

    request(`messages/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        flagged: !message.flagged
      })
    })
      .then(() => {
        const messages = this.state.messages
          .map(message => (message.id !== id) ? message : {
            ...message,
            flagged: !message.flagged,
          });

        this.setState({messages});
      })
  },

  /**
   * DELETE messages/:id - Delete a message.
   * @param id
   */
  deleteMessage(id) {
    request(`messages/${id}`, {method: 'DELETE'})
      .then(() => {
        const messages = this.state.messages
          .filter(message => message.id !== id);

        this.setState({messages});
      });
  },

  render() {
    const {
      messages,
      searchText,
      filterFlagged,
      selectedMessageId,
    } = this.state;

    const mainContent = (() => {
      if (selectedMessageId) {
        const message = messages
          .filter(message => message.id === selectedMessageId)[0];
        return (
          <Message
            message={message}
            back={() => this.selectMessage()}
          />
        );
      }

      return (
        <MessageBrowser
          messages={messages}
          filterFlagged={filterFlagged}
          searchText={searchText}
          updateFilterFlagged={this.updateFilterFlagged}
          updateSearchText={this.updateSearchText}
          deleteMessage={this.deleteMessage}
          toggleMessageFlagged={this.toggleMessageFlagged}
          selectMessage={this.selectMessage}
        />
      );
    })();

    return (
      <AppLayout>
        {mainContent}
      </AppLayout>
    );
  }
});
