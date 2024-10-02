import { Component } from "react";
import { Fragment } from "react";

import Button from "../buttons/button";
import ErrorMessage from "../errorMessage/errorMessage";
import MarvelService from "../../services/MarvelService";
import Skeleton from "../skeleton/Skeleton";

class HeroDescription extends Component {
    state = {
        char: {},
        loading: true,
        error: false,
        currentId: null
    }
    marvelService = new MarvelService ();

    recordCurrentId = () => {
        this.setState({
            currentId: this.props.currentId
        })
    }    

    componentDidUpdate (prevProps) {
        if (this.props.currentId !== prevProps.currentId){
            this.recordCurrentId();
            setTimeout(() => {this.getRandomHero()}, 100)
        }
        
    }
    getRandomHero = () => {
        this.marvelService
            .getCharacter(this.props.currentId)
            .then(char => this.setState({
                char,
                loading: false
            }))
            .catch( () => {
                this.setState({
                loading: false,
                error: true
            })});
        
    }
    render () {
        const {char, loading, error} = this.state;

        const loadingBlock = loading ? <Skeleton /> : null;
        const errorBlock = error ? <ErrorMessage /> : null;
        const charBlock = !(loading || error || !char) ? <CharDescriptionWraper char={char}/> : null;
        return (
            <div className="hero-description">
                {loadingBlock}
                {errorBlock}
                {charBlock}
            </div>
            )
        } 
}

const CharDescriptionWraper = ({char}) => {
    const {name, description, wiki, homePage, thumbnail, comics} = char;

    let comicsList = comics.map((item, i) =>{
            if (i < 10) {
                return <div key={i} className="comics-item"><a href={item.resourceURI}>{item.name}</a></div>
            }
    })
    if (comicsList.length == 0){
        comicsList = <div className="no-comics">No comics have been found</div>
    }

    const imgStyle = thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ? {objectFit: 'contain'} : null;

    return (
        <Fragment>
            <div className="hero-preview">
                <img src={thumbnail} alt={name} style={imgStyle}/>
                <div className="hero-peview-text">
                    <h2>{name}</h2>
                    <a href={homePage} target='_blanck'><Button classes='btn btn-red' text='HOMEPAGE'/></a>
                    <a href={wiki} target='_blanck'><Button classes='btn btn-grey' text='WIKI' /></a>    
                </div>
            </div>
            <div className="description">
                {description}
            </div>
            <h2>Comics:</h2>
            {comicsList}
        </Fragment>
    )
}

export default HeroDescription;