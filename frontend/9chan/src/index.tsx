import React from 'react';
import ReactDOM from 'react-dom';
import MessageList from './lib/message-list';
import ChannelList from './lib/channel-list';
import Header from './lib/header';
import "tailwindcss/tailwind.css";

ReactDOM.render(
  <React.StrictMode>
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex h-full w-full">
        <ChannelList />
        <MessageList />
      </div>
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
