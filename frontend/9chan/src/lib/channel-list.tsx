import React from 'react'

type Props = {};

type Channel = {
  displayName: string
  url: string
}

type Channels = {
  channels: Array<Channel>
}

type YamiProtocol = {
  date: string
  type: string
  display_name: string
  url: string
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
       channels_.push({displayName: data.display_name, url: data.url})
       this.setState({
         channels: channels_
       })
       this.clearSameChannels()
    })
  }

  equal(c1: Channel, c2: Channel): boolean {
    return c1.displayName == c2.displayName &&
      c1.url == c2.url
  }

  count(cs: Array<Channel>, c: Channel) {
    let n = 0
    cs.forEach((c1) => {
      if(this.equal(c, c1)) {n += 1}
    })

    return n
  }

  clearSameChannels() {
    const channels_ = this.state.channels.reduce((pre, v) => {
      if (this.count(pre, v) > 0) {
        return pre
      } else {
        return pre.concat([v])
      }
    }, ([] as Array<Channel>))

    this.setState({
      channels: channels_
    })
  }

  render() {
    return (
      <div className="w-40 bg-gray-300">
        {this.state.channels.map((chan: Channel) => (
            <a href={chan.url} className="w-full">{chan.displayName}</a>
          ))}
      </div>
    )
  }
}

export default ChannelList;
