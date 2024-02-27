import React, { Component } from "react";

class Carousel extends React.Component{        
    /* constructor(props){
        super(props);
        this.state.active = 0;
        this.handleIndexClick = this.handleIndexClick.bind(this);
    }
    handleIndexClick(e){
        this.setState({
            active: +e.target.dataset.index
        })
    } */

    state = {active:0};

    handleIndexClick = e => {
        this.setState({
            active: +e.target.dataset.index
        });
    }

    render(){
        const {active} = this.state;
        return(
            <div className="carousel">
                <img src={this.props.image[active]} alt="movie"/>
            <div className="carousel-smaller">
                {this.props.image.map((item,index)=>(
                <img key={item} 
                onClick={this.handleIndexClick}
                data-index={index}
                src={item} 
                alt="selected photo" 

                className={index === active ? "active" : ""}                  
                />
                )
                )}
            </div>
            </div>
        );
    }
}

export default Carousel;