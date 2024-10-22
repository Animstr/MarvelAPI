import { Spinner } from "../../spinner/spinner";
import { useEffect, useState } from "react";

import ErrorMessage from "../../errorMessage/errorMessage";
import useMarvelService from "../../../services/MarvelService";
import { Container } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';

import './comic.scss'

export const Comic = () => {
    const {comicId} = useParams();
    const [comic, setComic] = useState(null);
    const {loading, error, getComic, getCharacterByName} = useMarvelService();

    const searchChar = () => {
        getCharacterByName(comicId)
            .then(data => setComic(data))
    }

    useEffect(() => {
        if (comicId){
            if (comicId.match(/\d/)) {
                onComicLoaded();
            } else {
                searchChar()
            }
        }
    }, [comicId])
   
    const onComicLoaded = () => {
        getComic(comicId)
        .then(comic => {
            setComic(comic);
        });   
    }

    const loadingBlock = loading ? <Spinner/> : null;
    const errorBlock = error ? <ErrorMessage /> : null;
    const comicBlock = !(loading || error || !comic) ? <ComicWrapper comic={comic}/> : null;


    return (
        <Container>
            <div className='comic_wrapper'>
                {loadingBlock}
                 {errorBlock}
                 {comicBlock}
            </div>
        </Container>
    )
}

const ComicWrapper = ({comic}) => {
    const {thumbnail, title, price, pages, description, language, name} = comic;

    const pageCount = pages ? <div className='comic_pagesCount'>{pages}</div> : null;
    const comicLanguages = language ? <div className='comic_language'>{language}</div> : null;
    const comicPrice = price ? <div className='comic_price'>{price}</div> : null;
    return (
        <>
            <img src={thumbnail} alt='comic_cover' className='comic_cover'/>
            <div className='comic_text'>
                <h2>{title ? title : name}</h2>
                <div className='comic_description'>
                {description}
                </div>
                {pageCount}
                {comicLanguages}
                {comicPrice}
            </div>
            <Link className='comic_back' to='/'>Back to all</Link>
        </>
    )
}