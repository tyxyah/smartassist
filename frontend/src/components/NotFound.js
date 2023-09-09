// this component will appear when a page is not found (404)

import { Link } from "react-router-dom"
const NotFound = () => {
    return (  
        <div className="not-found">
            <h2>Sorry</h2>
            <p>That page cannot be found</p>
            <Link to="/">Back to homepage...</Link>
        </div>
    );
}
 
export default NotFound;