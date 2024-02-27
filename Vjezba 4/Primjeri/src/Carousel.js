import React, { Component } from "react";

class Carousel extends Component {
  /* constructor(props) {
    super(props);
    this.state = { active: 0 };
    this.handleIndexClick = this.handleIndexClick.bind(this);
  }

  handleIndexClick(e) {
    this.setState({
      active: +e.target.dataset.index,
    });
  }
 */
  state = { active: 0 };

  handleIndexClick = (e) => this.setState({ active: +e.target.dataset.index }); //this se automtizmom binda na objekt u kojem je deklarirana arrow funkcija

  render() {
    const { active } = this.state;
    console.log(active);
    //this.handleIndexClick = this.handleIndexClick.bind(this);
    return (
      <div className="carousel">
        <img src={this.props.image[active]} />
        <div className="carousel-smaller">
          {this.props.image.map((item, index) => (
            <img
              key={item}
              src={item}
              data-index={index}
              onClick={this.handleIndexClick}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;
