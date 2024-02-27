import React from "react";
import Carousel from "./Carousel";
import ThemeContext from "./ThemeContext";
import Modal from "./Modal";
import {navigate} from "@reach/router";

class Details extends React.Component{
    constructor(props){
        super(props);
        this.state = {loading:true, showModal:false, url:"https://www.imdb.com/search/"};
        this.props = {id: props.id, genre:props.genre};
    }

    componentDidMount(){
        fetch(`http://localhost:4000/api/movies?genre=${this.props.genre}`)
        .then((response)=>response.json())
        .then((movies)=>{
            let filteredMovie = movies.filter((movie)=>(movie._id == this.props.id));
            console.log(filteredMovie[0]);
            this.setState({
                name:filteredMovie[0].name,
                id:filteredMovie[0]._id,
                images:filteredMovie[0].images,
                loading:false
            });
        }).catch((err)=>(console.log(err)));
    }


    changeModalState = () => this.setState({showModal:!this.state.showModal});
    movieImdb = () => navigate(this.state.url);

    

    render(){

        const {images, name, loading, showModal} = this.state;

        return(
            <div className="details">
                <Carousel image={images?images:[]}/>
            <div>                
                <h1>{name}</h1>
                <h1>{loading ? "loading ...": "movie loaded"}</h1>              
            </div>
            <ThemeContext.Consumer>
                {([theme])=>(
            <button style={{backgroundColor:theme}} onClick={this.changeModalState}>
                Movie: {name}
                </button>
                )}
            </ThemeContext.Consumer>
            {
                showModal ? (
                    <Modal>
                        <div>
                            <h1>Would you like to watch movie: {name}</h1>
                            <div className="buttons">
                                <button onClick={this.changeModalState}>No</button>
                                <button onClick={this.movieImdb}>Yes</button>
                            </div>
                        </div>
                    </Modal>
                ):null
            }
            </div>
        );
    }
}

export default Details;