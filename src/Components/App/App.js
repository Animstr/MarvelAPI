import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from '../header/header';
import { MainPage} from '../../pages/main';
import { ComicPage } from '../../pages/comic';
import { ComicsPage } from '../../pages/comics';
import { Page404 } from '../../pages/404/404';


import './App.scss';


const App = () => {
  return (
    <Router>
        <Header />
        <Routes>
            <Route path='/'element={<MainPage/>}/>
            <Route path='/comics' element={<ComicsPage/>}/>
            <Route path='/comics/:comicId' element={<ComicPage/>}/>
            <Route path='*' element={<Page404/>}/>
        </Routes>
    </Router>
  );
}

export default App;
