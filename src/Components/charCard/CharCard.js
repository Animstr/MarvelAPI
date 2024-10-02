import { Component } from "react";

class CharCard extends Component {

    render () {
       const {cardImg, charName, onClick} = this.props;

       return (
        <div onClick={onClick} className="content-hero-card">
            <img src={cardImg} alt='hero-img'/>
            <h2>{charName}</h2>
        </div>
    )
    }
}

export default CharCard;