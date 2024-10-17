import { useEffect, useRef, useState } from "react";
import { Container } from "react-bootstrap";
import React from 'react';
import { CSSTransition, TransitionGroup } from "react-transition-group";

import ErrorMessage from "../errorMessage/errorMessage";
import useMarvelService from "../../services/MarvelService";
import HeroDescription from "../heroDescription/heroDescription";

import backgroundHero from '../../img/bg asset.svg';

import './content.scss';


const Content = () => {

    const [chars, setChars] = useState([]);
    const [currentId, setCurrentId] = useState(null);
    const [offset, setOffset] = useState(210);
    const [loadingNew, setLoadingNew] = useState(false);
    const [endChars, setEndChars] = useState(false);
    const [open, setOpen] = useState(true)
    
    const {loading, error, getAllCharacters} = useMarvelService ();

    useEffect(() => {
        getNewChars();
    }, [])

    const getNewChars = (offset) => {
        loadingNewChars();
        getAllCharacters(offset)
            .then( newChars => {
                let ended = false;
                if (newChars.length < 9) {
                    ended = true;
                }
                setChars(chars => [...chars, ...newChars]);
                setOffset(offset => offset + 9);
                setLoadingNew(() => false);
                setEndChars(() => ended);
            })
            .catch( () => {
                setEndChars(true);
            });
    }

    const loadingNewChars = () => {
        setLoadingNew(true);
    }
    
    const onChageChar = (id) => {
        setCurrentId(id);
    }

    const itemRefs = useRef([]);

    const focusOnItem = (i) => {
        if (itemRefs){            
            itemRefs.current.forEach(item => item.classList.remove('active'));
            itemRefs.current[i].classList.add('active');
            itemRefs.current[i].focus();
        }
    }

    function renderCards () {
        const cards = chars.length ? chars.map((card, i) => (
            <CSSTransition key={card.id} timeout={500} classNames='char'>
                <div 
                    key={i}
                    ref={ref => itemRefs.current[i] = ref}
                    onClick={() => {
                        onChageChar(card.id);
                        focusOnItem(i);
                    }}
                    className="content-hero-card">
                    <img src={card.thumbnail} alt='hero-img'/>
                    <h2>{card.name}</h2>
                </div>
            </CSSTransition>
        )) : null;
        return (
            <TransitionGroup component={null}>
                {cards}
            </TransitionGroup>
        )
    }
    const items = renderCards();
    const errorMessage = error ? <ErrorMessage /> : null;
    
    return (
        <section className="content">
            <Container>
                <div className="content_wrapper">
                        <div className="cardsBlock">
                            {errorMessage}
                            {items}
                        </div>
                    <HeroDescription id={currentId}/>
                </div>
                <button 
                    onClick={() => getNewChars(offset)}
                    className='btn btn-red'
                    disabled={loadingNew}
                    style={{'display': endChars ? 'none' : null}}>LOAD MORE</button>
            </Container>
            <img src={backgroundHero} alt='background-img' className="bgHero"/>
        </section>
    )   
}

export default Content;