import spinner from '../../../img/spinner.gif'
import { useEffect, useState } from "react";

import ErrorMessage from "../../errorMessage/errorMessage";
import useMarvelService from "../../../services/MarvelService";
import { Container } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';

import './comic.scss'

export const Comic = () => {
    const {comicId} = useParams();
    const [comic, setComic] = useState(null);
    const {loading, error, getComic} = useMarvelService();

    useEffect(() => {
        if (comicId){
            onComicLoaded();
        }
    }, [comicId])
   
    const onComicLoaded = () => {
        getComic(comicId)
        .then(comic => {
            setComic(comic);
        });   
    }

    const loadingBlock = loading ? <img src={spinner} className='spinner'/> : null;
    const errorBlock = error ? <ErrorMessage /> : null;
    const charBlock = !(loading || error || !comic) ? <ComicWrapper comic={comic}/> : null;


    return (
        <Container>
            <div className='comic_wrapper'>
                {loadingBlock}
                 {errorBlock}
                 {charBlock}
            </div>
        </Container>
    )
}

const ComicWrapper = ({comic}) => {
    const {thumbnail, title, price, pages, description, language} = comic;

    return (
        <>
            <img src={thumbnail} alt='comic_cover' className='comic_cover'/>
            <div className='comic_text'>
                <h2>{title}</h2>
                <div className='comic_description'>
                {description}
                </div>
                <div className='comic_pagesCount'>{pages}</div>
                <div className='comic_language'>{language}</div>
                <div className='comic_price'>{price}</div>
            </div>
            <Link className='comic_back' to='/'>Back to all</Link>
        </>
    )
}