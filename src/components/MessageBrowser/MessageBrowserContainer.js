import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import { MessageBrowser } from './MessageBrowser';

export const MessageBrowserContainer = React.createClass({

  getInitialState() {
    return {
      loading: false,
    };
  },

  componentDidMount() {
    // Debounce requestMessages so we aren't submitting crazy requests on typing/etc...!
    this.requestMessages = _.debounce(this.requestMessages, 750, {leading: true});
    const {props: {messages}, requestMessages} = this;
    if (messages.length <= 1) {
      requestMessages();
    }
  },

  componentDidUpdate(prevProps) {
    if (paramsChanged(this.props, prevProps)) {
      // If anything other than the pagination info changed, reset back to 1st page.
      if (this.props.page > 1 && this.props.page === prevProps.page) {
        this.props.updatePage(1);
      } else {
        this.requestMessages();
      }
    }
  },

  /**
   * GET /messages - Query string based on props.
   */
  requestMessages() {
    this.setState({loading: true});

    axios.get('messages', {params: propsToParams(this.props)})
      .then(messages => {
        this.setState({loading: false});
        const newMessages = this.props.page > 1
          ? [...this.props.messages, ...messages]
          : messages;
        this.props.updateMessages(newMessages);
      })
      .catch(err => this.setState({loading: false}));
  },

  loadMore() {
    this.props.updatePage(this.props.page + 1);
  },

  render() {
    const props = {
      ...this.props,
      loadMore: this.loadMore,
      loading: this.state.loading,
    };

    return <MessageBrowser {...props} />;
  },
});

/**
 * Build up query params from props.
 * @param props
 * @return string
 */
function propsToParams(props) {
  const {filterFlagged, sentOrder, searchText, page} = props;
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
 * @param propsA
 * @param propsB
 * @return {boolean}
 */
function paramsChanged(propsA, propsB) {
  return !_.isEqual(propsToParams(propsB), propsToParams(propsA))
}
