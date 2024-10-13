import { Container } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import useMarvelService from '../../../services/MarvelService';
import spinner from '../../../img/spinner.gif'
import ErrorMessage from '../../errorMessage/errorMessage';

import { Link } from 'react-router-dom';
import './content.scss';

const ComicsContent = () => {
    const [offset, setOffset] = useState(0)
    const [comics, setComics] = useState([]);

    const{loading, error, getAllComics} = useMarvelService();
    

    useEffect(() => {
        getComics();
    }, [])

    const getComics = () => {
        getAllComics(offset)
            .then(data => {
                setComics([...comics, ...data])
                setOffset(offset => offset + 8)      
        })    
    }

    const comicsList = comics.length ? comics.map((item, i) => {
        const style = item.thumbnail == 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ? {'objectFit': 'fill'} : null;
        return (
            <div key={i} className="comics">
                <img src={item.thumbnail} style={style} alt="comics-img" />
                <div className="comics_name">
                    <Link to={`/comics/${item.id}`} target='_blanck'>{item.title}</Link>
                </div>
                <div className="cost">{item.price}</div>
            </div>
        )
    }) : null;

    const spinnerBlock = loading ? <img src={spinner} className='spinner' /> : null;
    const errorMessage = error ? <ErrorMessage /> : null;

    return (
        <section className='comics-list'>
            <Container>
                <div className="comics_wrapper">
                    {errorMessage}
                    {comicsList}
                    {spinnerBlock}
                </div>
                <button
                    onClick={getComics}
                    className='btn btn-red'>LOAD MORE 
                </button>
            </Container>
        </section>
    )   
}

export default ComicsContent;