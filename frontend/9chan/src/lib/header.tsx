import React from 'react'

type Props = {};

type Channel = {
  channelName: string
  host: string
}

class Header extends React.Component<Props, Channel> {
  constructor(props: Props) {
    super(props);
    this.state = {channelName: '', host: ''};

    const req = (): Promise<Channel> => fetch("/api/channel").then((x) => x.json());
    req().then(x => this.setState(x))
  }

  render() {
      return (
        <div className='items-center bg-gray-400 w-screen py-2 pl-10 border-b border-gray-600 fixed top-0'>
          <p>{this.state.channelName}</p>
          <p>@{this.state.host}</p>
        </div>
      )
  }
}

export default Header;
