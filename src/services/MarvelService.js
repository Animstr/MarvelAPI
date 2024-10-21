import { useHttp } from "../Components/hook/http.hook";

const useMarvelService = () => {
    const _apiBase = 'https://gateway.marvel.com:443/v1/public';
    const _apiKey = 'apikey=20c048de6ffdd8d7ac72d74b97f7d8a6';
    const _apiOffset = 210;
    const {loading, error, request, skipError, setError} = useHttp();

    const getAllCharacters = async (offset = _apiOffset) => {
        const res = await request(`${_apiBase}/characters?limit=9&offset=${offset}&${_apiKey}`);
        
        const chars = []; 

        for (let i = 0; i < 9; i++) {
            chars.push(_transformCharRes(res.data.results[i], i));
        }

        return chars;
    }
    const getAllComics = async (offset = 0) => {
        const res = await request(`${_apiBase}/comics?offset=${offset}&${_apiKey}`);

        const comics = [];

        for (let i = 0; i < 8; i++) {
            comics.push(_transformComicsRes(res.data.results[i], i));
        }
        return comics;
    }

    const getComic = async (id) => {
        const res = await request(`${_apiBase}/comics/${id}?&${_apiKey}`);

        return _transformComicsRes(res.data.results[0]);
    }

    const getCharacter = async (id) => {
        const response = await request(`${_apiBase}/characters/${id}?${_apiKey}`)
        return _transformCharRes(response.data.results[0]);
    }

    const getCharacterByName = async (name) => {
        const res = await request(`${_apiBase}/characters?nameStartsWith=${name}&${_apiKey}`)
        
        /* if (res.data.results.length > 0) { */
            return _transformCharRes(res.data.results[0]);
        /* } else {
            setError(true);
            return error;
        } */
    }

    const _transformCharRes = (path) => {
        let filteredDescription = '';

        if (path.description) {
            filteredDescription = path.description;
        }else {
            filteredDescription = 'At the moment there is no information about this character'
        }

        return {
                name: path.name,
                description: filteredDescription,
                thumbnail: path.thumbnail.path + '.' + path.thumbnail.extension,
                homePage: path.urls[0].url,
                wiki: path.urls[1].url,
                id: path.id,
                comics: path.comics.items
        };
    }
    const _transformComicsRes = (path) => {
        return {
            id: path.id,
            thumbnail: path.thumbnail.path + '.' + path.thumbnail.extension,
            title: path.title,
            price: path.prices.price ? path.prices.price : 'NOT AVAILABLE',
            url: path.urls[0].url,
            pages: path.pageCount + ' ' + 'pages',
            description: path.description ? path.description : 'At the moment there is no information about this comic',
            language: path.textObjects[0] ? 'Language:' + ' ' + path.textObjects[0].language : 'not available'
        }
    }
    return {getCharacter, getAllCharacters, loading, error, skipError, getAllComics, getComic, getCharacterByName}
}

export default useMarvelService;