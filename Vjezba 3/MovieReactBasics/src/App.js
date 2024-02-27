const Movie = ({title, genre, duration}) => {
    return React.createElement("div",{},[
    React.createElement("h2", {}, title),
    React.createElement("h3", {}, genre),
    React.createElement("h3", {}, duration)
    ])

}

const App = () => {
    return React.createElement("div",{},[
        React.createElement("h1", {}, "MOVIES!"),
        React.createElement(Movie, {
            title:"Birds of pray", 
            genre:"comedy", 
            duration:"120"}),
        React.createElement(Movie, {
            title:"Batman", 
            genre:"action", 
            duration:"150"}),
        React.createElement(Movie, {
            title:"Knives out", 
            genre:"thriller", 
            duration:"130"})
        ]

    )
}

ReactDOM.render(React.createElement(App), document.getElementById("root"));
