import { Fragment } from 'react';
import Header from '../header/header';
import Promo from '../promo/promo';
import Content from '../content/content';

import './App.scss';


function App() {
  return (
    <Fragment>
        <Header />
        <Promo />
        <Content />
    </Fragment>
  );
}

export default App;
