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
      // TODO: sortBy
    };
  },

  componentDidUpdate(prevProps, prevState) {
    if (!_.isEqual(stateToQueryParams(this.state), stateToQueryParams(prevState))) {
      this.requestMessages();
    }
  },

  updateFilterFlagged(filterFlagged) {
    this.setState({filterFlagged});
  },

  updateSearchText(searchText) {
    this.setState({searchText});
  },

  /**
   * GET /messages - Query string based on state.
   */
  requestMessages() {
    this.setState({loading: true});

    axios.get('messages', {params: stateToQueryParams(this.state)})
      .then(messages => this.setState({
        messages,
        loading: false,
      }))
      .catch(err => this.setState({
        loading: false,
      }));
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
      updateFilterFlagged: this.updateFilterFlagged,
      updateSearchText: this.updateSearchText,
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
  const {filterFlagged, searchText} = state;
  const queryParams = {
    _limit: 5,
  };
  if (filterFlagged)
    queryParams.flagged = true;
  if (searchText)
    queryParams.q = searchText.trim();

  return queryParams;
}
