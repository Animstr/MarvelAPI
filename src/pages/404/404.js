import { Link } from "react-router-dom";
import ErrorMessage from "../../Components/errorMessage/errorMessage";

import './404.scss';

const Page404 = () => {

    return ( 
        <div className="NotFound-wrapper">
            <Helmet>
                <meta
                    name="description"
                    content="Error page"
                />
                <title>Error page</title>
            </Helmet>
            <ErrorMessage/>
            Page not found <br/>
            <Link to='/'>Return to main page</Link>
        </div>
        
    )
}

export default Page404;