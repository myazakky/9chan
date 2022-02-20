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
      <div className="flex py-2 pb-10">
        <textarea value={this.state.content}
          onChange={(e) => this.onChange(e)}
          className="flex w-full px-1 py-1 mx-1 rounded-md"
          onKeyDown={e => {
            if(e.key == 'Enter' && !e.shiftKey) { e.preventDefault(); this.onClick()}
          }}
          ></textarea>
        <button onClick={() => this.onClick()}
          className="flex items-center bg-white px-6 py-1 mx-1 rounded-md">Send</button>
      </div>
    )
  }
}

export default MessageForm;
