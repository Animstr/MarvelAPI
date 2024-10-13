import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';

import ErrorMessage from '../errorMessage/errorMessage';
import useMarvelService from '../../services/MarvelService';
import Button from '../buttons/button';
import { Spinner } from '../spinner/spinner';
import decoration from '../../img/Decoration.svg'

import './promo.scss';

const Promo = () => {

    const [char, setChar] = useState({});

    const {loading, error, getCharacter, skipError} = useMarvelService();

    useEffect(() => {
        getRandomHero();
    }, [])

    const getRandomHero = () => {

        getCharacter(Math.floor(Math.random() * (1011400 - 1011000)) + 1011000)
        .then(char => {
            setChar(char);
        }) 
    }

    const onGetRandomHero = () => {
        setChar({});
        getRandomHero();
        skipError();
    }

    const spinnerBlock = loading ? <Spinner /> : null;
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
                        <button onClick={onGetRandomHero} className='btn btn-red'>TRY IT</button>
                    </div>
                </div>
            </Container>
        </section>
    )
}

const HeroCard = ({char}) => {
    
    const {name, description, thumbnail, wiki, homePage} = char;
    const imgStyle = thumbnail == 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ? {objectFit: 'contain'} : null;
    
    return (
        <>
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
        </>
    )
}

export default Promo;