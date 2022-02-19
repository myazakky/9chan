import { channel } from 'diagnostics_channel';
import React from 'react'

type Props = {};

type Channels = {
  channels: Array<string>
}

type YamiProtocol = {
  date: string
  type: string
  display_name: string
}

class ChannelList extends React.Component<Props, Channels> {
  constructor(props: Props) {
    super(props)
    this.state = {
      channels: []
    }

    const source = new EventSource('/api/subscribes/stream');
    source.addEventListener('message', e => {
       const data: YamiProtocol = JSON.parse(e.data);
       let channels_ = this.state.channels.concat()
       channels_.push(data.display_name)
       this.setState({
         channels: channels_
       })
    })
  }

  render() {
    return (
      <div className="w-40 bg-gray-300">
        {this.state.channels.map((chan: string) => (
            <li>{chan}</li>
          ))}
      </div>
    )
  }
}

export default ChannelList;
