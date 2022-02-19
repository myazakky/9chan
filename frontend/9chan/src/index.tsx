import React from 'react';
import ReactDOM from 'react-dom';
import MessageList from './lib/message-list';
import ChannelList from './lib/channel-list';
import "tailwindcss/tailwind.css";

ReactDOM.render(
  <React.StrictMode>
    <div className="flex">
      <ChannelList />
      <MessageList />
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
