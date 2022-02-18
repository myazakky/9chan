import React, { ChangeEvent } from 'react'

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
      <div className="message-form">
        <textarea value={this.state.content}
          onChange={(e) => this.onChange(e)}></textarea>
        <button onClick={() => this.onClick()}>Send</button>
      </div>
    )
  }
}

export default MessageForm;
