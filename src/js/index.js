import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import LeftNavMenuBar from './components/LeftNavMenuBar';

injectTapEventPlugin();

ReactDOM.render(
  <LeftNavMenuBar />,
  document.getElementById('view')
);
