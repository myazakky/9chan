import React, { ChangeEvent } from 'react'
import "tailwindcss/tailwind.css";

type Props = {
  onClick: ((content: string) => void)
};

type Values = {
  content: string
}

class MessageForm extends React.Component<Props, Values> {
  constructor(props: Props) {
    super(props);
    this.state = {
      content: ''
    }
  }

  onClick() {
    this.props.onClick(this.state.content)
    this.setState({
      content: ''
    })
  }

  onChange(event: ChangeEvent<HTMLTextAreaElement>): void {
    this.setState({
      content: event.target.value
    })
  }

  render() {
    return (
      <div className="flex bg-gray-300 py-2">
        <textarea value={this.state.content}
          onChange={(e) => this.onChange(e)}
          className="flex w-full px-1 py-1 mx-1 rounded-md"
          ></textarea>
        <button onClick={() => this.onClick()}
          className="flex items-center bg-white px-6 py-1 mx-1 rounded-md text0a">Send</button>
      </div>
    )
  }
}

export default MessageForm;
