import React from 'react';
import _ from 'lodash';
import { AppLayout } from './../AppLayout';
import { request, toQueryString } from './../../util/http';

/**
 * Build up query string from state.
 * @param state
 * @return string
 */
function buildQueryString(state) {
  const {filterFlagged, searchText} = state;
  const queryParams = {
    _limit: 5,
  };
  if (filterFlagged)
    queryParams.flagged = true;
  if (searchText)
    queryParams.q = searchText.trim();

  return toQueryString(queryParams);
}

/**
 * The top level App component!
 */
export const AppContainer = React.createClass({

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
    if (buildQueryString(this.state) !== buildQueryString(prevState)) {
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

    request(`messages?${buildQueryString(this.state)}`)
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

    request(`messages/${id}`)
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

    request(`messages/${id}`, {
      method: 'PATCH',
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
    const childrenProps = {
      ...this.state,
      requestMessage: this.requestMessage,
      requestMessages: this.requestMessages,
      updateFilterFlagged: this.updateFilterFlagged,
      updateSearchText: this.updateSearchText,
      deleteMessage: this.deleteMessage,
      toggleMessageFlagged: this.toggleMessageFlagged,
    };

    return (
      <AppLayout>
        {React.Children.map(
          this.props.children,
          child => React.cloneElement(child, childrenProps)
        )}
      </AppLayout>
    );
  }
});
