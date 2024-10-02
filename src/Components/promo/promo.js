import { Component } from 'react';
import { Container } from 'react-bootstrap';
import { Fragment } from 'react';

import ErrorMessage from '../errorMessage/errorMessage';
import MarvelService from '../../services/MarvelService';
import Button from '../buttons/button';
import spinner from '../../img/spinner.gif'
import decoration from '../../img/Decoration.svg'

import './promo.scss';

class Promo extends Component {
    state = {
        char: {},
        loading: true,
        error: false
    }
    marvelService = new MarvelService ();


    componentDidMount () {
        this.getRandomHero();
    }

    getRandomHero = () => {
        this.marvelService
            .getCharacter(Math.floor(Math.random() * (1011400 - 1011000)) + 1011000)
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
    onGetRandomHero = () => {
        this.setState({
            char: {},
            loading: true,
            error: false})
        this.getRandomHero();
    }

    render () {
        let {loading, char, error} = this.state;

        const spinnerBlock = loading ? <img src={spinner} className='spinner' /> : null;
        const errorMessage = error ? <ErrorMessage /> : null;
        const charCard = !(loading || error) ? <HeroCard char={char}/> : null;

        return (
            <section className='promo'>
                <Container>
                    <div className='wraper'>
                        <div className='promo-left'>
                            {errorMessage}
                            {spinnerBlock}
                            {charCard}
                        </div>
                        <div className='promo-right'>
                            <h2>Random character for today! <br/>
                            Do you want to get to know him better?</h2>
                            <h2>Or choose another one</h2>
                            <img src={decoration} alt='hammer' />
                            <button onClick={this.onGetRandomHero} className='btn btn-red'>TRY IT</button>
                        </div>
                    </div>
                </Container>
            </section>
        )
    }
}

const HeroCard = ({char}) => {
    
    const {name, description, thumbnail, wiki, homePage} = char;
    const imgStyle = thumbnail == 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ? {objectFit: 'contain'} : null;
    
    return (
        <Fragment>
            <img src={thumbnail} alt='hero-img' style={imgStyle}/>
            <div className='promo-left-text'>
                <h2>{name}</h2>
                <div className='promo-text'>
                {description}
                </div>
            </div>
            <div className='btns-block'>
                <a href={homePage} target='_blanck'><Button classes='btn btn-red' text='HOMEPAGE'/></a>
                <a href={wiki} target='_blanck'><Button classes='btn btn-grey' text='WIKI'/></a>
            </div>
        </Fragment>
    )
}

export default Promo;