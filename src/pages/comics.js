import ComicsPromo from '../Components/ComicsPage/promo/promo';
import ComicsContent from '../Components/ComicsPage/content/content';
import { Helmet } from 'react-helmet';

const ComicsPage = () => {
    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Marvel comics list"
                />
                <title>Marvel comics list</title>
            </Helmet>
            <ComicsPromo/>
            <ComicsContent/>
        </>
    )
}

export default ComicsContent;