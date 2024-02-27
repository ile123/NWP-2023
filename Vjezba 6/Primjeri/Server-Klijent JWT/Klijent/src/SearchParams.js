import React, {useState, useEffect, useContext} from "react";
import Results from "./Result";
import ThemeContext from "./ThemeContext";



const SearchParams = () =>{
    const [location, setLocation] = useState("Split");
    const [genres, setGenres] = useState([]);
    const [genre, setGenre] = useState("British");
    const [moviesData, setMovies] = useState([]);
    const [theme, setTheme] = useContext(ThemeContext);

    useEffect(()=>{
        const options = {headers:{
            Authorization: "Bearer " + localStorage.getItem("token")
        }};
        fetch("http://localhost:4000/api/genres", options)
        .then((response)=>response.json())
        .then((genres)=>setGenres(genres));
    },
    
    []);

    console.log(genres);

    function getMovies(){
        fetch(`http://localhost:4000/api/movies?genre=${genre}`)
        .then((response)=> response.json())
        .then((movies)=>(setMovies(movies)));
    }

    return(
        <div className="search-params">
            <label htmlFor="location">
            <h1>{location}</h1>
            <input onChange={(e)=>setLocation(e.target.value)}/>
            </label>  
            Theme
            <select
            value={theme}
            onChange={e=>(setTheme(e.target.value))}
            >
            <option value="Red">red</option>
            <option value="Aquamarine">blue</option>
            <option value="BlueViolet">pink</option>
            <option value="Chartreuse">green</option>            
            </select>
            
            <form onSubmit={
        (e)=>{e.preventDefault();
            getMovies();}
            }>
                <select id="genre" onChange={(e)=>setGenre(e.target.value)}>
    {genres.map((item)=>{return <option value={item}>{item}</option>})}
            </select>
            <button style={{backgroundColor:theme}}>Klikni!</button>
            </form>
            <Results genre={genre} movies={moviesData}/>
                
            

        </div>
    );
}

export default SearchParams;