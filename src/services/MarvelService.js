

class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public';
    _apiKey = 'apikey=20c048de6ffdd8d7ac72d74b97f7d8a6';
    _apiOffset = 210;

    getResource = async (url) => {
        const res = await fetch(url);

        if(!res.ok){
            throw new Error(`Couldn't fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    }

    getAllCharacters = async (offset = this._apiOffset) => {
        const res = await this.getResource(`${this._apiBase}/characters?limit=9&offset=${offset}&${this._apiKey}`);
        
        const chars = []; 
        for (let i = 0; i < 9; i++) {
            chars.push(this._transformRes(res.data.results[i], i));
        }

        return chars;
    }
    getCharacter = async (id) => {
        const response = await this.getResource(`${this._apiBase}/characters/${id}?${this._apiKey}`)
        return this._transformRes(response.data.results[0]);
    }
    _transformRes = (path) => {
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
}

export default MarvelService;