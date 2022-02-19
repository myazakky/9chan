import React from 'react'
import "tailwindcss/tailwind.css";

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
      <div className="w-full mb-3 border-gray-300 border-b">
        <p className="px-1">{this.props.content}</p>
      </div>
    )
  }
}

export default Message
