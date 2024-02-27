import React, {useState} from "react";
import {render} from "react-dom";
import SearchParams from "./SearchParams";
import Details from "./Details";
import {Router} from "@reach/router";
import ThemeConext from "./ThemeContext";
import Login from "./Login";
import Logout from "./Logout";
import Register from "./Register";




const App = () => {
    const theme = useState("darkblue");
    return(
        <div>
            <ThemeConext.Provider value={theme}>
                <Router>            
                    <SearchParams path="/" />
                    <Details path="/:genre/details/:id"/>
                    <Login path="/login" />
                    <Register path="/register" />
                    <Logout path="/logout" />
                </Router>
            </ThemeConext.Provider>
        {/* <Movie name="Snatch" duration="120"></Movie>
        <Movie name="Knives out" duration="100"></Movie> */}
        </div>
    );
}



render(<App/>, document.getElementById("root"));
