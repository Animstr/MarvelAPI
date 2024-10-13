import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';

import { Spinner } from '../spinner/spinner';
import Header from '../header/header';

import './App.scss';

const Page404 = lazy(() => import('../../pages/404/404.js'));
const MainPage = lazy(() => import('../../pages/main'));
const ComicPage = lazy(() => import('../../pages/comic'));
const ComicsPage = lazy(() => import('../../pages/comics'));

const App = () => {
  return (
    
        <Router>
            <Header />
            <Suspense fallback={<Spinner/>}>
                <Routes>
                    <Route path='/'element={<MainPage/>}/>
                    <Route path='/comics' element={<ComicsPage/>}/>
                    <Route path='/comics/:comicId' element={<ComicPage/>}/>
                    <Route path='*' element={<Page404/>}/>
                </Routes>
            </Suspense>
        </Router>
  );
}

export default App;
