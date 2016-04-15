import React from 'react';
import axios from 'axios';
import { MessageBrowser } from './MessageBrowser';

export const MessageBrowserContainer = React.createClass({

  getInitialState() {
    return {
      loading: false,
      filterFlagged: false,
      searchText: '',
      sentOrder: 'DESC',
      page: 1,
    };
  },

  componentDidMount() {
    const {props: {messages}, requestMessages} = this;
    if (messages.length <= 1) {
      requestMessages();
    }
  },

  componentDidUpdate(prevProps, prevState) {
    if (queryParamsChanged(this.state, prevState)) {
      // If anything other than the pagination info changed, reset back to 1st page.
      const searchCriteriaChanged = this.state.page > 1 && this.state.page === prevState.page;
      if (searchCriteriaChanged) {
        // TODO: setState is discouraged within didUpdate. What is a more legitimate alternative? Is this a legit use case?
        this.setState({page: 1});
      } else {
        this.requestMessages();
      }
    }
  },

  updateFilterFlagged(filterFlagged) {
    this.setState({filterFlagged});
  },

  updateSearchText(searchText) {
    this.setState({searchText});
  },

  updateSentOrder(sentOrder) {
    this.setState({sentOrder});
  },

  loadMore() {
    this.setState({
      page: this.state.page + 1
    })
  },

  /**
   * GET /messages - Query string based on state.
   */
  requestMessages() {
    this.setState({loading: true});

    axios.get('messages', {params: stateToQueryParams(this.state)})
      .then(messages => {
        this.setState({loading: false});
        const newMessages = this.state.page > 1
          ? [...this.props.messages, ...messages]
          : messages;
        this.props.setMessages(newMessages);
      })
      .catch(err => this.setState({loading: false}));
  },

  render() {
    const props = {
      messages: this.props.messages,
      deleteMessage: this.props.deleteMessage,
      toggleMessageFlagged: this.props.toggleMessageFlagged,
      loadMore: this.loadMore,
      filterFlagged: this.state.filterFlagged,
      updateFilterFlagged: this.updateFilterFlagged,
      searchText: this.state.searchText,
      updateSearchText: this.updateSearchText,
      sentOrder: this.state.sentOrder,
      updateSentOrder: this.updateSentOrder,
    };

    return <MessageBrowser {...props} />;
  },
});

/**
 * Build up query string from state.
 * @param state
 * @return string
 */
function stateToQueryParams(state) {
  const {filterFlagged, sentOrder, searchText, page} = state;
  const pageSize = 5;
  const queryParams = {
    _start: (page - 1) * pageSize,
    _end: ((page - 1) * pageSize) + pageSize,
    _sort: 'sent',
    _order: sentOrder,
  };
  if (filterFlagged)
    queryParams.flagged = true;
  if (searchText)
    queryParams.q = searchText.trim();

  return queryParams;
}

/**
 * Check if queryParams have changed.
 * @param stateA
 * @param stateB
 * @return {boolean}
 */
function queryParamsChanged(stateA, stateB) {
  return !_.isEqual(stateToQueryParams(stateB), stateToQueryParams(stateA))
}
