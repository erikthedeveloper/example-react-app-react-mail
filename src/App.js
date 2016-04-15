import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import { Layout } from './components/Layout';

/**
 * The top level App component!
 */
export const App = React.createClass({

  getInitialState() {
    return {
      messages: [],
      // These are on the App level to persist between browser/detail navigation
      filterFlagged: false,
      searchText: '',
      sentOrder: 'DESC',
      page: 1,
    };
  },

  updateMessages(messages) {
    this.setState({messages});
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

  updatePage(page) {
    this.setState({page});
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

  render() {
    const childProps = {
      ...this.state,
      updateMessages: this.updateMessages,
      deleteMessage: this.deleteMessage,
      toggleMessageFlagged: this.toggleMessageFlagged,
      updateFilterFlagged: this.updateFilterFlagged,
      updateSearchText: this.updateSearchText,
      updateSentOrder: this.updateSentOrder,
      updatePage: this.updatePage,
    };

    return (
      <Layout>
        {React.Children.map(
          this.props.children,
          child => React.cloneElement(child, childProps)
        )}
      </Layout>
    );
  }
});
