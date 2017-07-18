import * as React from "react";
import * as ReactDOM from "react-dom";
import * as injectTapEventPlugin from 'react-tap-event-plugin';
import AppContainer from './AppContainer';

import './index.css'

injectTapEventPlugin();

ReactDOM.render(
  <AppContainer />,
  document.getElementById("root")
);
