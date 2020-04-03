import React from "react";
import { Link } from "react-router-dom";

/* NotFoundPage Component */
const NotFoundPage = () => (
    <div className="not_found_error">
      404 !!! Not Found. - <Link to="/">Go Home</Link>
    </div>
);

export default NotFoundPage;