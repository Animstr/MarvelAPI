import Promo from '../Components/promo/promo'
import Content from '../Components/content/content';
import { Helmet } from 'react-helmet';

const MainPage = () => {
    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Marvel comics main page"
                />
                <title>Marvel comics main page</title>
            </Helmet>
            <Promo/>
            <Content/>
        </>
    )
}

export default MainPage;