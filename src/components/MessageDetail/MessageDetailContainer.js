import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import { MessageDetail } from './MessageDetail';

export const MessageDetailContainer = React.createClass({

  contextTypes: {
    router: React.PropTypes.object,
  },

  getInitialState() {
    return {
      loading: false,
    };
  },

  componentDidMount() {
    const {props: {params}, requestMessage} = this;
    if (!routeMessage(this.props)) {
      requestMessage(params.id);
    }
  },

  componentWillReceiveProps(nextProps) {
    // We got our route message! Is this the ideal solution/pattern?
    if (this.props.messages.length === 0 && nextProps.messages.length > 0) {
      this.setState({loading: false});
    }
  },

  componentDidUpdate(prevProps, prevState) {
    // Based on "before" and "now", should we redirect?
    const shouldRedirect =
      // If we don't have it now...
      !routeMessage(this.props) &&
      (
        // ...and we had it before (deleted)
        routeMessage(prevProps) ||
        // ...or we couldn't retrieve it
        (prevState.loading && !this.state.loading)
      );

    if (shouldRedirect) {
      this.context.router.push('/');
    }
  },

  deleteMessage() {
    const {params: {id}, deleteMessage} = this.props;
    deleteMessage(Number(id));
  },

  toggleFlagged() {
    const {params: {id}, toggleMessageFlagged} = this.props;
    toggleMessageFlagged(Number(id));
  },

  /**
   * GET /messages/:id
   */
  requestMessage(id) {
    this.setState({loading: true});

    axios.get(`messages/${id}`)
      .then(message => this.props.updateMessages([message]))
      .catch(err => this.setState({loading: false}));
  },

  render() {
    const message = routeMessage(this.props);

    if (this.props.loading || !message) {
      return (
        <div>Loading...</div>
      );
    }

    const props = {
      message,
      deleteMessage: this.deleteMessage,
      toggleFlagged: this.toggleFlagged,
    };

    return <MessageDetail {...props} />;
  },
});

/**
 * Pluck "active" message for route out of props
 * @param props
 * @return {{}|bool}
 */
function routeMessage(props) {
  return _.find(props.messages, {
    id: Number(props.params.id),
  });
}
