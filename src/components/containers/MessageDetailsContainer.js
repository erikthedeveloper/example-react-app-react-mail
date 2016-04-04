import React from 'react';
import _ from 'lodash';
import { MessageDetails } from './../MessageDetails';

/**
 * Pluck "active" message out of props
 * @param props
 */
const findMessage = (props) => _.find(props.messages, {
  id: Number(props.params.id),
});

/**
 * Based on "before" and "now", should we redirect?
 *  We don't have the message "now" AND
 *  We had the message "before" - "Message was deleted" OR
 *  Done loading - "Message not found"
 *
 * @param prevProps
 * @param props
 * @return boolean
 */
const shouldRedirect = (prevProps, props) =>
  !findMessage(props) && (
    findMessage(prevProps) ||
    (prevProps.loading && !props.loading)
  );

export const MessageDetailsContainer = React.createClass({

  contextTypes: {
    router: React.PropTypes.object,
  },

  componentDidMount() {
    const {requestMessage, params} = this.props;
    if (!findMessage(this.props)) {
      requestMessage(params.id);
    }
  },

  /** React to state changes */
  componentDidUpdate(prevProps) {
    if (shouldRedirect(prevProps, this.props)) {
      this.context.router.push('/');
    }
  },

  deleteMessage() {
    const {params: {id}, deleteMessage} = this.props;
    deleteMessage(Number(id));
  },

  render() {
    const message = findMessage(this.props);

    if (this.props.loading || !message) {
      return (
        <div>Loading...</div>
      );
    }

    const props = {
      ...this.props,
      message,
      deleteMessage: this.deleteMessage,
    };

    return <MessageDetails {...props} />;
  },
});
