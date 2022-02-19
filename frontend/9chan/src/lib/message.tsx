import React from 'react'
import "tailwindcss/tailwind.css";

export type MessageData = {
  id: number
  content: string
  user: string
  icon: string
}

class Message extends React.Component<MessageData> {
  constructor(props: MessageData) {
    super(props);
  }

  render() {
    return (
      <div className="w-full pl-2 pb-1 border-gray-300 border-b">
        <div className="flex py-1">
          <img src={this.props.icon}
            className="object-cover rounded-full w-8 h-8 mr-2" />
          <p className="text-sm">{this.props.user}</p>
        </div>
        <p className="px-1 ml-8">{this.props.content}</p>
      </div>
    )
  }
}

export default Message
