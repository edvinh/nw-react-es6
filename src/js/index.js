import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MainLayout from './components/MainLayout';

injectTapEventPlugin();

ReactDOM.render(
  <MainLayout />,
  document.getElementById('view')
);
