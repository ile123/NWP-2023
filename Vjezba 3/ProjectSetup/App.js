import './App.css';

import React from 'react';
import { render } from 'react-dom';
import SearchParams from "./SearchParams"

function App() {
  return (
    <div className="App">
      <SearchParams />
    </div>
  );
}

//render(React.createElement(App), document.getElementById("root"));
render(<App />, document.getElementById("root"));

export default App;
