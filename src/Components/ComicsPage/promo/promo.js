import { Container } from 'react-bootstrap';

import avangers from '../../../img/Avengers.svg';
import avengersLogo from '../../../img/Avengers logo.svg'

import './promo.scss';

const ComicsPromo = () => {
    

    return (
        <section className='comics_promo'>
            <Container>
            <div className='wrapper'>
                <img src={avangers} alt='Avangers' className='avangers'/>
                <div className='text'>
                New comics every week! <br/>
                Stay tuned!
                </div>
                <img src={avengersLogo} alt='Avengers-logo' className='logo'/>
            </div>
        </Container>
        </section>
    )
}

export default ComicsPromo;