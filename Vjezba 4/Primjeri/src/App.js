import React from "react";
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

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/:genre/details/:id" element={<WrappedDetails />} />
          <Route path="/" element={<SearchParams />} />
        </Routes>
      </Router>
    </div>
  );
};

render(<App />, document.getElementById("root"));
