import './button.scss';

function Button ({classes, text}) {
    return (
        <button className={classes}>
            {text}                            
        </button>
    )
}

export default Button;