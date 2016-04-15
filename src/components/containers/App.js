import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import { AppLayout } from './../AppLayout';

/**
 * The top level App component!
 */
export const App = React.createClass({

  getInitialState() {
    return {
      messages: [],
      loading: false,
      filterFlagged: false,
      searchText: '',
      sentOrder: 'DESC',
      page: 1,
    };
  },

  componentDidUpdate(prevProps, prevState) {
    // TODO: Refactor this into MessageBrowser using props.
    if (queryParamsChanged(this.state, prevState)) {
      const {page} = this.state;
      if (page > 1 && page === prevState.page) {
        // setState is highly discouraged within didUpdate.
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

  /**
   * GET /messages - Query string based on state.
   */
  requestMessages() {
    this.setState({loading: true});

    axios.get('messages', {params: stateToQueryParams(this.state)})
      .then(messages => this.setState({
        messages: this.state.page > 1
          ? [...this.state.messages, ...messages]
          : messages,
        loading: false,
      }))
      .catch(err => this.setState({
        loading: false,
      }));
  },

  loadMore() {
    this.setState({
      page: this.state.page + 1
    })
  },

  /**
   * GET /messages/:id
   */
  requestMessage(id) {
    this.setState({loading: true});

    axios.get(`messages/${id}`)
      .then(message => this.setState({
        messages: [message],
        loading: false,
      }))
      .catch(err => this.setState({
        loading: false,
      }));
  },

  /**
   * PATCH messages/:id - Toggle a message's flagged state.
   * @param id
   */
  toggleMessageFlagged(id) {
    const message = _.find(this.state.messages, {id: Number(id)});
    const flagged = !message.flagged;

    axios.patch(`messages/${id}`, {flagged})
      .then(() => this.setState({
        messages: this.state.messages
          .map(message => message.id !== id
            ? message
            : {...message, flagged}
          )
        })
      );
  },

  /**
   * DELETE messages/:id - Delete a message.
   * @param id
   */
  deleteMessage(id) {
    axios.delete(`messages/${id}`)
      .then(() => this.setState({
        messages: this.state.messages
          .filter(message => message.id !== id)
      }));
  },

  getChildProps() {
    return {
      ...this.state,
      requestMessage: this.requestMessage,
      requestMessages: this.requestMessages,
      loadMore: this.loadMore,
      updateFilterFlagged: this.updateFilterFlagged,
      updateSearchText: this.updateSearchText,
      updateSentOrder: this.updateSentOrder,
      deleteMessage: this.deleteMessage,
      toggleMessageFlagged: this.toggleMessageFlagged,
    };
  },

  render() {
    const childProps = this.getChildProps();
    return (
      <AppLayout>
        {React.Children.map(
          this.props.children,
          child => React.cloneElement(child, childProps)
        )}
      </AppLayout>
    );
  }
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
