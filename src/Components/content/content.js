import { Component } from "react";
import { Container } from "react-bootstrap";
import React from "react";

import MarvelService from "../../services/MarvelService";
import HeroDescription from "../heroDescription/heroDescription";
import CharCard from "../charCard/CharCard";
import backgroundHero from '../../img/bg asset.svg';

import './content.scss';

class Content extends Component{
    state = {
        chars: [],
        error:false,
        currentId: null,
        offset: 210,
        loadingNew: false,
        endChars: false
    }
    myRef = React.createRef();
    marvelService = new MarvelService ();

    focusFirst = () => {
        if (this.myRef){
            this.myRef.style.display = 'none';
        }
    }

    componentDidMount () {
        this.getNewChars();
    }

    getNewChars = (offset) => {
        this.loadingNewChars();
        this.marvelService
            .getAllCharacters(offset)
            .then( newChars => {
                let ended = false;
                if (newChars.length < 9) {
                    ended = true;
                }
                this.setState(({offset, chars}) => ({
                    chars: [...chars, ...newChars],
                    offset: offset + 9,
                    loadingNew: false,
                    endChars: ended
                }))
            })
            .catch( () => {
                this.setState({
                error: true,
                endChars: true
            })});
    }

    loadingNewChars = () => {
        this.setState(() => ({
            loadingNew: true
        }))
    }
    
    onChageChar = (id) => {
        this.setState({
            currentId: id
        })
    }

    render () {
        const { chars, currentId, offset, loadingNew, endChars} = this.state;
        const cards = chars.length ? chars.map(card => (
            <CharCard  
            key={card.id} 
            cardImg={card.thumbnail} 
            onClick={() => {
                this.onChageChar(card.id);
                this.focusFirst()}}
            charName={card.name}
            ref={this.myRef.current}
            />
        )) : null;
        return (
            <section className="content">
                <Container>
                    <div className="wrapper">
                        <div className="cardsBlock">
                            {cards}
                        </div>
                        <HeroDescription currentId={currentId}/>
                    </div>
                    <button 
                        onClick={() => this.getNewChars(offset)}
                        className='btn btn-red'
                        disabled={loadingNew}
                        style={{'display': endChars ? 'none' : null}}>LOAD MORE</button>
                </Container>
                <img src={backgroundHero} alt='background-img' className="bgHero"/>
            </section>
        )   
    }
}

export default Content;