import React, { Component } from "react";
import { useParams } from "react-router";
//import { withRouter } from "react-router-dom";
import Carousel from "./Carousel";
import ThemeContext from "./ThemeContext";
import Modal from "./Modal";

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, showModal: false };
    this.props = { id: props.id, genre: props.genre };
  }

  componentDidMount() {
    fetch(`http://demo7168568.mockable.io/${this.props.genre}/movies`)
      .then((response) => response.json())
      .then(({ movies }) => {
        let filteredMovie = movies.filter((movie) => movie.id == this.props.id);
        console.log(filteredMovie[0]);
        this.setState({
          name: filteredMovie[0].name,
          id: filteredMovie[0].id,
          images: filteredMovie[0].images,
          loading: false,
        });
      })
      .catch((err) => console.log(err));
  }

  toggleModal = () => this.setState({ showModal: !this.state.showModal });
  movieImdb = () => (window.location.href = "https://www.imdb.com/search/");

  render() {
    const { images, loading, name, showModal } = this.state;
    return (
      <div className="details">
        <Carousel image={images ? images : []} />
        <div>
          <h1>{name}</h1>
          <h1>{loading ? "loading..." : ""}</h1>
        </div>

        <ThemeContext.Consumer>
          {([theme]) => (
            <button
              onClick={this.toggleModal}
              style={{ backgroundColor: theme }}
            >
              Do you want to see {name} movie details
            </button>
          )}
        </ThemeContext.Consumer>

        {showModal ? (
          <Modal>
            <div>
              <h1>Do you want to watch {name} movie</h1>
              <div className="buttons">
                <button onClick={this.movieImdb}>yes</button>
                <button onClick={this.toggleModal}>no</button>
              </div>
            </div>
          </Modal>
        ) : null}
      </div>
    );
  }
}

const WrappedDetails = (props) => {
  const params = useParams();
  return <Details {...props} {...params} />;
};

export default WrappedDetails;
