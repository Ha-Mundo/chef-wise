import { Link } from "react-router-dom";
import "./Error.css";

export default function Error() {
  return (
    <div className="error-container">
      <h1 className="error-title">
        Oops! Something went wrong.
      </h1>
      <p className="error-message">
        It seems there was an unexpected error. Please try again later.
      </p>
      <Link to={"/"} className="error-link">
        Return to website
      </Link>
    </div>
  );
}
