import React, { Component } from "react";
import { useParams } from "react-router";
//import { withRouter } from "react-router-dom";
import Carousel from "./Carousel";

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
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

  render() {
    const { images, loading, name } = this.state;
    return (
      <div className="details">
        <Carousel image={images ? images : []} />
        <h1>{name}</h1>
        <h1>{loading ? "loading..." : ""}</h1>
      </div>
    );
  }
}

const WrappedDetails = (props) => {
  const params = useParams();
  return <Details {...props} {...params} />;
};

export default WrappedDetails;
