import React from 'react'

export type MessageData = {
  id: number;
  content: string
}

class Message extends React.Component<MessageData> {
  constructor(props: MessageData) {
    super(props);
  }

  render() {
    return (
      <div className="message">
        <p>{this.props.content}</p>
      </div>
    )
  }
}

export default Message
