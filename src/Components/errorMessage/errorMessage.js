import errorGif from '../../img/Error.gif';

function ErrorMessage () {
    return (
        <img src={errorGif} alt='error404' style={{margin: '0 auto', gridRow: '1 / 3', gridColumn: '1 / 3'}}/>
    )
}

export default ErrorMessage;