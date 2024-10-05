import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './header.scss';

const Header = () => {
  return (
    <header>
        <Container>
            <Row>
                <Col className='header__right'>
                    <h1><span>Marvel</span> information portal</h1>
                </Col>

                <Col className='header__left'>
                    <span>Characters</span> / Comics
                </Col>
            </Row>
        </Container>
    </header>
  );
}

export default Header;