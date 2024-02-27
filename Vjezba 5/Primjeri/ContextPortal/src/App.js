import React, { useState } from "react";
import { render } from "react-dom";
import Movie from "./Movie";
import SearchParams from "./SearchParams";
import WrappedDetails from "./Details";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
} from "react-router-dom";
import WrappedDetails from "./Details";
import ThemeContext from "./ThemeContext";

const App = () => {
  const theme = useState("darkblue");

  return (
    <div>
      <ThemeContext.Provider value={theme}>
        <Router>
          <Routes>
            <Route path="/:genre/details/:id" element={<WrappedDetails />} />
            <Route path="/" element={<SearchParams />} />
          </Routes>
        </Router>
      </ThemeContext.Provider>
    </div>
  );
};

render(<App />, document.getElementById("root"));
