import { Fragment } from 'react';
import Header from '../header/header';
import Promo from '../promo/promo';
import Content from '../content/content';

import './App.scss';


const App = () => {
  return (
    <>
        <Header />
        <Promo />
        <Content />
    </>
  );
}

export default App;
