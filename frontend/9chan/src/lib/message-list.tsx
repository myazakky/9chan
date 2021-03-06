import React, { createRef } from 'react'
import Message, { MessageData } from './message'
import MessageForm from './message-form';

type Props = {};
type Messages = {
  messages: Array<MessageData>
}

class MessageList extends React.Component<Props, Messages> {
  scrollBottomRef: React.RefObject<HTMLDivElement>

  constructor(props: Props) {
    super(props)
    this.state = {
      messages: []
    }
    this.getMessages()
    this.onClick = this.onClick.bind(this);

    const source = new EventSource('/stream');
    source.addEventListener('message', _ => this.updateMessages())

    this.scrollBottomRef = createRef<HTMLDivElement>();
  }

  scrollDown() {
    if(this.scrollBottomRef && this.scrollBottomRef.current) {
      this.scrollBottomRef.current.scrollIntoView();
    }
  }

  componentDidMount() {
    this.scrollDown()
  }

  componentDidUpdate() {
    this.scrollDown()
  }

  getMessages() {
    const req = (): Promise<Array<MessageData>> => fetch("/api/messages").then((x) => x.json());
    req().then(data => data.forEach(m => this.addMessage(m)))
  }

  updateMessages() {
    let latest_id: number
    
    if (this.state.messages.length > 0) {
      latest_id = this.state.messages[this.state.messages.length - 1].id
    } else { latest_id = 0}
    const req = (): Promise<Array<MessageData>> => fetch("/api/messages/from/" + latest_id).then((x) => x.json());

    req().then(data => data.forEach(m => this.addMessage(m)))
  }

  addMessage(m: MessageData) {
    let newMessages = this.state.messages.concat();
    newMessages.push(m);
    this.setState({
      messages: newMessages
    })
  }

  onClick(content: string) {
    let options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: content })
    }

    const req = (): Promise<MessageData> => fetch("/api/messages", options).then((x) => x.json());
    req()
  }

  render() {
    return (
      <div className="flex flex-col h-full w-full pt-10 bg-gray-200">
        <div className="h-full w-full overflow-y-scroll">
          {this.state.messages.map((msg: MessageData) => (
            (new Message(msg)).render()
          ))}
        <div ref={this.scrollBottomRef}/>
        </div>
        <MessageForm onClick={this.onClick} />
      </div>
    )
  }
}

export default MessageList;
