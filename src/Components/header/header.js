import Container from 'react-bootstrap/Container';
import { NavLink } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './header.scss';

const Header = () => {
  return (
    <header>
        <Container>
            <Row>
                <Col className='header__right'>
                    <h1><NavLink end to={'/'}><span>Marvel</span></NavLink>  information portal</h1>
                </Col>

                <Col className='header__left'>
                <NavLink end to={'/'} style={({isActive}) => ({color: isActive ? 'red' : 'black'})}><span>Characters</span></NavLink>
                    / 
                <NavLink to={'/comics'} style={({isActive}) => ({color: isActive ? 'red' : 'black'})}>Comics</NavLink>
                </Col>
            </Row>
        </Container>
    </header>
  );
}

export default Header;